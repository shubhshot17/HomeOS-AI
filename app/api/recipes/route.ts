const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta"

type GeminiListModelsResponse = {
  models?: Array<{ name?: string; supportedGenerationMethods?: string[] }>
  nextPageToken?: string
}

function shortModelId(fullName: string): string {

  return fullName.replace(/^models\//, "")

}

function bigtModelId(fullName: string): string {
  
  return fullName.replace(/^models\//, "")

}

/** Lists model IDs that support generateContent (handles pagination). */
async function listGenerateContentModelIds(apiKey: string): Promise<string[]> {
  const ids: string[] = []
  let pageToken: string | undefined

  do {
    const url = new URL(`${GEMINI_API_BASE}/models`)
    url.searchParams.set("key", apiKey)
    url.searchParams.set("pageSize", "100")
    if (pageToken) url.searchParams.set("pageToken", pageToken)

    const listResp = await fetch(url.toString())
    if (!listResp.ok) {
      console.error("[v0] ListModels failed", { status: listResp.status })
      break
    }

    const data = (await listResp.json()) as GeminiListModelsResponse
    for (const m of data.models ?? []) {
      const methods = m.supportedGenerationMethods ?? []
      if (!methods.includes("generateContent") || !m.name) continue
      const id = shortModelId(m.name)
      if (id.includes("embedding") || id.includes("tts") || id.includes("aqa")) continue
      ids.push(id)
    }
    pageToken = data.nextPageToken
  } while (pageToken)

  return ids
}

function pickPreferredFlashModel(ids: string[]): string | undefined {
  if (!ids.length) return undefined
  const pool = ids.filter((id) => /flash/i.test(id))
  const ranked = (pool.length ? pool : ids).slice()
  ranked.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))
  return ranked[0]
}

export async function POST(request: Request) {
  try {
    const { ingredients, apiKey } = await request.json()

    if (!ingredients?.trim()) {
      return Response.json({ error: "Ingredients required" }, { status: 400 })
    }

    const geminiApiKey = process.env.GEMINI_API_KEY || apiKey
    if (!geminiApiKey) {
      return Response.json({ error: "API key not configured" }, { status: 500 })
    }

    const prompt = `You are a helpful cooking assistant specializing in diverse cuisines including Laotian food. Given these ingredients: "${ingredients}"
    
Suggest 3 delicious recipes that can be made with these ingredients. Include at least one Laotian recipe if possible (such as Sticky Rice dishes, Larb, Pad Thai variations, or other Southeast Asian cuisine). For each recipe, provide:
1. Recipe name
2. List of specific ingredients needed
3. Step-by-step instructions (5-7 steps)
4. Estimated cooking time
5. Cuisine type (e.g., Laotian, Thai, Vietnamese)

Format your response as valid JSON array with this structure:
[
  {
    "name": "Recipe Name",
    "ingredients": ["ingredient 1", "ingredient 2"],
    "instructions": ["Step 1", "Step 2"],
    "cookTime": "30 minutes",
    "cuisine": "Laotian"
  }
]

Only return the JSON array, no other text.`

    const availableIds = await listGenerateContentModelIds(geminiApiKey)
    const preferredAuto = pickPreferredFlashModel(availableIds)

    const envPrimary = process.env.GEMINI_MODEL?.trim()
    const envFallback = process.env.GEMINI_FALLBACK_MODEL?.trim()

    const tryOrder: string[] = []
    const push = (id: string | undefined) => {
      if (id && !tryOrder.includes(id)) tryOrder.push(id)
    }
    push(envPrimary)
    push(envFallback)
    push(preferredAuto)
    for (const id of availableIds) push(id)

    if (tryOrder.length === 0) {
      console.error("[v0] No generateContent models returned for this API key")
      return Response.json(
        { error: "No Gemini text models available for this API key" },
        { status: 502 },
      )
    }

    async function callGemini(model: string) {
      return await fetch(
        `${GEMINI_API_BASE}/models/${encodeURIComponent(model)}:generateContent?key=${geminiApiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        },
      )
    }

    let response: Response | null = null
    let lastModelTried = ""

    for (const modelId of tryOrder) {
      lastModelTried = modelId
      response = await callGemini(modelId)
      if (response.ok) break
      if (response.status === 404) {
        let body: unknown
        try {
          body = await response.clone().json()
        } catch {
          body = await response.clone().text().catch(() => null)
        }
        console.error("[v0] Gemini model unavailable, trying next", { modelId, body })
        continue
      }
      break
    }

    if (!response) {
      return Response.json({ error: "Failed to reach Gemini" }, { status: 502 })
    }

    if (!response.ok) {
      // Try to capture response body (JSON or text) for diagnosis
      let respBody: unknown
      try {
        respBody = await response.json()
      } catch (e) {
        try {
          respBody = await response.text()
        } catch (e) {
          respBody = '<unreadable response>'
        }
      }

      console.error("[v0] Gemini API error", {
        status: response.status,
        statusText: response.statusText,
        body: respBody,
        lastModelTried,
      })

      // Return an explicit upstream error so callers can distinguish
      return Response.json(
        { error: 'Upstream Gemini API error', details: { status: response.status, statusText: response.statusText } },
        { status: 502 },
      )
    }

    const data = await response.json()

    // Extract text from Gemini response
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!text) {
      // Log the entire returned object to help diagnose format changes
      console.error('[v0] Gemini returned unexpected shape', { data })
      return Response.json({ error: 'Invalid response format from Gemini' }, { status: 502 })
    }

    // Parse the JSON response
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      throw new Error("Invalid response format")
    }

    const recipes = JSON.parse(jsonMatch[0])

    return Response.json({ recipes })
  } catch (error) {
    console.error("[v0] Recipe generation error:", error)
    return Response.json({ error: "Failed to generate recipes" }, { status: 500 })
  }
}

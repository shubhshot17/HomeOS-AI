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

    const configuredModel = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite-preview"

    async function callGemini(model: string) {
      return await fetch(
        `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${geminiApiKey}`,
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

    // Try the configured model first
    let response = await callGemini(configuredModel)

    // If model not found, request the list of models to help debugging and optionally retry with a fallback
    if (response.status === 404) {
      // Collect upstream body for logs
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

      console.error('[v0] Gemini API error', {
        status: response.status,
        statusText: response.statusText,
        body: respBody,
        attemptedModel: configuredModel,
      })

      // Try to list available models for debugging (log only)
      try {
        const listResp = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${geminiApiKey}`)
        const listData = await listResp.json()
        console.error('[v0] Gemini available models', { listData })
      } catch (e) {
        console.error('[v0] Failed to list Gemini models', e)
      }

      const fallbackModel = process.env.GEMINI_FALLBACK_MODEL || "gemini-1.5-flash"
      if (fallbackModel && fallbackModel !== configuredModel) {
        console.error('[v0] Retrying with fallback model', { fallbackModel })
        response = await callGemini(fallbackModel)
      }
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

      console.error('[v0] Gemini API error', {
        status: response.status,
        statusText: response.statusText,
        body: respBody,
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

"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Clock, Flame } from "lucide-react"

interface Recipe {
  name: string
  ingredients: string[]
  instructions: string[]
  cookTime: string
  cuisine?: string
}

export function RecipeSuggesterSection() {
  const [ingredients, setIngredients] = useState("")
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleGetRecipes = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ingredients.trim()) return

    setLoading(true)
    setError("")
    setRecipes([])

    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get recipes")
      }

      const data = await response.json()
      setRecipes(data.recipes)
    } catch (err) {
      setError("Could not generate recipes. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-2 border-primary/30 bg-gradient-to-br from-card via-card/98 to-card/95 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/5 border-b-2 border-primary/20">
        <div className="flex items-center gap-3">
          <div className="text-3xl">👨‍🍳</div>
          <div>
            <CardTitle className="text-2xl">AI Recipe Generator</CardTitle>
            <CardDescription>Discover delicious meals from your ingredients</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <form onSubmit={handleGetRecipes} className="flex gap-2">
          <Input
            placeholder="🥘 e.g., rice, chicken, onion, garlic"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            disabled={loading}
            className="border-2 border-primary/20 focus:border-primary/50 bg-white/50 backdrop-blur-sm"
          />
          <Button
            type="submit"
            disabled={loading}
            className="gap-2 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:from-primary/90 hover:to-accent/90 transition-all duration-300"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Flame className="w-5 h-5" />}
            <span className="hidden sm:inline">Generate</span>
          </Button>
        </form>

        {error && (
          <div className="p-4 rounded-xl bg-destructive/10 border-2 border-destructive/30 text-destructive text-sm font-semibold">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {recipes.map((recipe, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 hover:border-primary/60 hover:shadow-lg transition-all duration-300 space-y-4 group"
            >
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                  🍽️ {recipe.name}
                </h3>
                {recipe.cuisine && (
                  <p className="text-xs font-bold text-accent uppercase tracking-wider">🌍 {recipe.cuisine}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-primary uppercase tracking-wide">📦 Ingredients</p>
                  <ul className="text-sm space-y-2">
                    {recipe.ingredients.slice(0, 5).map((ingredient, i) => (
                      <li key={i} className="text-foreground/80 flex items-start gap-2">
                        <span className="text-primary/60 mt-0.5">✓</span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-accent uppercase tracking-wide">👨‍🍳 Steps</p>
                  <ol className="text-sm space-y-2">
                    {recipe.instructions.slice(0, 3).map((step, i) => (
                      <li key={i} className="text-foreground/80 flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-xs font-bold text-white">
                          {i + 1}
                        </span>
                        <span className="pt-0.5">{step.substring(0, 60)}...</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t-2 border-primary/20">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">⏱️ {recipe.cookTime}</span>
              </div>
            </div>
          ))}

          {recipes.length === 0 && !loading && !error && (
            <div className="py-16 text-center space-y-4">
              <div className="text-6xl">🍳</div>
              <p className="text-muted-foreground text-base font-medium">
                Enter your ingredients to discover amazing recipes
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

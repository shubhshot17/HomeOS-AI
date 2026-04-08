"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Lightbulb } from "lucide-react"

interface ShoppingItem {
  id: string
  text: string
  bought: boolean
}

const COMMON_ITEMS = [
  "🥛 Milk",
  "🍞 Bread",
  "🥚 Eggs",
  "🍬 Sugar",
  "🫒 Oil",
  "🧈 Butter",
  "🧂 Salt",
  "🌶️ Pepper",
  "🍅 Tomatoes",
  "🧅 Onions",
  "🧄 Garlic",
  "🧀 Cheese",
  "🥛 Yogurt",
  "🍝 Pasta",
  "🍚 Rice",
]

export function ShoppingListSection() {
  const [items, setItems] = useState<ShoppingItem[]>([])
  const [input, setInput] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("shopping")
    if (saved) {
      setItems(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("shopping", JSON.stringify(items))
  }, [items])

  const handleAddItem = (e: React.FormEvent | null, itemText?: string) => {
    if (e) e.preventDefault()
    const text = itemText || input.trim()
    if (!text) return

    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      text,
      bought: false,
    }

    setItems([...items, newItem])
    setInput("")
    setShowSuggestions(false)
  }

  const handleToggleItem = (id: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, bought: !i.bought } : i)))
  }

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id))
  }

  const unboughtItems = items.filter((i) => !i.bought)
  const boughtItems = items.filter((i) => i.bought)
  const missedItems = COMMON_ITEMS.filter(
    (item) =>
      !items.some((i) => i.text.toLowerCase().replace(/^[🀀-🿻]\s/u, "") === item.toLowerCase().replace(/^[🀀-🿻]\s/u, "")),
  )

  return (
    <Card className="border-2 border-accent/30 bg-gradient-to-br from-card via-card to-card/95 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-accent/10 via-primary/5 to-secondary/5 border-b border-accent/20">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🛒</div>
          <div>
            <CardTitle className="text-2xl">Shopping List</CardTitle>
            <CardDescription>Never forget what you need</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <form onSubmit={(e) => handleAddItem(e)} className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              placeholder="🛍️ Add item..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              className="border-2 border-accent/20 focus:border-accent/50 bg-white/50 backdrop-blur-sm"
            />
            {showSuggestions && missedItems.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-br from-card to-card/95 border-2 border-accent/30 rounded-xl p-3 z-10 shadow-lg">
                <p className="text-xs font-semibold text-accent mb-2 flex items-center gap-1">
                  <Lightbulb className="w-3 h-3" /> Smart Suggestions
                </p>
                <div className="space-y-1.5">
                  {missedItems.slice(0, 5).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleAddItem(null, item)}
                      className="w-full text-left text-sm px-3 py-2 rounded-lg hover:bg-primary/10 transition-all hover:translate-x-1"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Button
            type="submit"
            size="icon"
            className="bg-gradient-to-r from-accent to-primary hover:shadow-lg hover:from-accent/90 hover:to-primary/90 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </form>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {unboughtItems.length === 0 && boughtItems.length === 0 ? (
            <div className="py-8 text-center space-y-2">
              <div className="text-4xl">📋</div>
              <p className="text-muted-foreground">Your list is empty!</p>
            </div>
          ) : (
            <>
              {unboughtItems.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2">📍 To Buy</p>
                  <div className="space-y-2">
                    {unboughtItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-accent/10 to-primary/5 border-2 border-accent/20 hover:border-accent/40 hover:shadow-md transition-all group"
                      >
                        <input
                          type="checkbox"
                          checked={item.bought}
                          onChange={() => handleToggleItem(item.id)}
                          className="w-5 h-5 rounded cursor-pointer accent-accent"
                        />
                        <span className="text-sm font-medium flex-1">{item.text}</span>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1.5 hover:bg-destructive/10 rounded transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {boughtItems.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">✓ Bought</p>
                  <div className="space-y-2">
                    {boughtItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-green-50/50 border-2 border-green-200/50 hover:border-green-300 transition-all group"
                      >
                        <input
                          type="checkbox"
                          checked={item.bought}
                          onChange={() => handleToggleItem(item.id)}
                          className="w-5 h-5 rounded cursor-pointer accent-green-600"
                        />
                        <span className="text-sm line-through text-green-600/60 flex-1">{item.text}</span>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1.5 hover:bg-red-100 rounded transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

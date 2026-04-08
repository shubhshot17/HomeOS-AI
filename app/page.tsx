"use client"

import { useState, useEffect } from "react"
import { HomeHeader } from "@/components/home-header"
import { RemindersSection } from "@/components/reminders-section"
import { ShoppingListSection } from "@/components/shopping-list-section"
import { RecipeSuggesterSection } from "@/components/recipe-suggester-section"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-primary/2 to-background">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <HomeHeader />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 animate-slide-in">
            <RemindersSection />
          </div>
          <div className="animate-slide-in" style={{ animationDelay: "0.1s" }}>
            <ShoppingListSection />
          </div>
        </div>
        <div className="animate-slide-in" style={{ animationDelay: "0.2s" }}>
          <RecipeSuggesterSection />
        </div>
      </div>
    </main>
  )
}

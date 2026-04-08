"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Clock } from "lucide-react"

interface Reminder {
  id: string
  text: string
  time: string
  date: string
  completed: boolean
}

const parseReminder = (input: string): Omit<Reminder, "id"> => {
  const now = new Date()
  let time = "09:00"
  let date = now.toISOString().split("T")[0]

  const timeMatch = input.match(/(\d{1,2})\s*(?::(\d{2}))?\s*(am|pm)?/i)
  if (timeMatch) {
    let hour = Number.parseInt(timeMatch[1])
    const minute = timeMatch[2] || "00"
    const period = timeMatch[3]?.toLowerCase()

    if (period === "pm" && hour !== 12) hour += 12
    if (period === "am" && hour === 12) hour = 0

    time = `${String(hour).padStart(2, "0")}:${minute}`
  }

  const dateMatch = input.match(/(?:on|at)?\s*(?:tomorrow|next\s+\w+|\d{1,2}\/\d{1,2})/i)
  if (dateMatch?.[0].includes("tomorrow")) {
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    date = tomorrow.toISOString().split("T")[0]
  }

  const cleanText = input
    .replace(/(?:at|on)?\s*\d{1,2}(?::\d{2})?\s*(?:am|pm)?/gi, "")
    .replace(/(?:tomorrow|next\s+\w+)/i, "")
    .replace(/^remind\s+me\s+to\s+/i, "")
    .trim()

  return {
    text: cleanText || "Reminder",
    time,
    date,
    completed: false,
  }
}

export function RemindersSection() {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [input, setInput] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("reminders")
    if (saved) {
      setReminders(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders))
  }, [reminders])

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const parsed = parseReminder(input)
    const newReminder: Reminder = {
      id: Date.now().toString(),
      ...parsed,
    }

    setReminders([...reminders, newReminder])
    setInput("")
  }

  const handleToggleReminder = (id: string) => {
    setReminders(reminders.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r)))
  }

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id))
  }

  const sortedReminders = [...reminders].sort((a, b) => {
    const timeA = `${a.date}T${a.time}`
    const timeB = `${b.date}T${b.time}`
    return new Date(timeA).getTime() - new Date(timeB).getTime()
  })

  const completedCount = reminders.filter((r) => r.completed).length

  return (
    <Card className="border-2 border-primary/30 bg-gradient-to-br from-card via-card to-card/95 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/5 border-b border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">⏰</div>
            <div>
              <CardTitle className="text-2xl">Smart Reminders</CardTitle>
              <CardDescription>Talk naturally like "Remind me to water plants at 6 PM"</CardDescription>
            </div>
          </div>
          {reminders.length > 0 && (
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">
                {completedCount}/{reminders.length}
              </p>
              <p className="text-xs text-muted-foreground">completed</p>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <form onSubmit={handleAddReminder} className="flex gap-2">
          <Input
            placeholder="📝 Tell me what to remind you about..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border-2 border-primary/20 focus:border-primary/50 bg-white/50 backdrop-blur-sm"
          />
          <Button
            type="submit"
            size="icon"
            className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:from-primary/90 hover:to-accent/90 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </form>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {sortedReminders.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="text-4xl">✨</div>
              <p className="text-muted-foreground">No reminders yet. Create one above!</p>
            </div>
          ) : (
            sortedReminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all duration-300 group cursor-pointer ${
                  reminder.completed
                    ? "bg-green-50/50 border-green-200/50 hover:border-green-300"
                    : "bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 hover:border-primary/40 hover:shadow-md"
                }`}
              >
                <input
                  type="checkbox"
                  checked={reminder.completed}
                  onChange={() => handleToggleReminder(reminder.id)}
                  className="mt-1 w-5 h-5 rounded-full cursor-pointer accent-primary"
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-semibold ${reminder.completed ? "line-through text-green-600/60" : "text-foreground"}`}
                  >
                    {reminder.completed ? "✓ " : ""}
                    {reminder.text}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    {new Date(`${reminder.date}T${reminder.time}`).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteReminder(reminder.id)}
                  className="p-2 hover:bg-destructive/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

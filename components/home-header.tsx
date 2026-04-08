export function HomeHeader() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background border-b-2 border-primary/20">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 pointer-events-none" />

      {/* Animated orbs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent/15 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg animate-glow">
              <span className="text-4xl">🏠</span>
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Smart Home Hub
              </h1>
              <p className="text-lg text-foreground/70 mt-1">Your AI-powered family assistant</p>
            </div>
          </div>
          <p className="text-foreground/60 ml-20 text-sm leading-relaxed">
            Organize your life with intelligent reminders, smart shopping lists, and AI-powered recipes all in one
            beautiful place
          </p>
        </div>
      </div>
    </header>
  )
}

"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, Mic, User, Plus, Settings, Home, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function SearchEngine() {
  const [currentTime, setCurrentTime] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [wallet, setWallet] = useState("")
  const [passphrase, setPassphrase] = useState("")
  const [balance, setBalance] = useState("1,250.75")
  const [loginOpen, setLoginOpen] = useState(false)
  const [balanceOpen, setBalanceOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [activeCategory, setActiveCategory] = useState("")
  const [showCategoryResults, setShowCategoryResults] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [activeTab, setActiveTab] = useState("nodes")

  // Update clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    }
    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setHasSearched(true)
      setShowCategoryResults(false)
      setActiveCategory("")
    }
  }

  const handleLogin = () => {
    if (wallet && passphrase) {
      setIsLoggedIn(true)
      setLoginOpen(false)
    }
  }

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId)
    setShowCategoryResults(true)
  }

  const handleHomeClick = () => {
    setHasSearched(false)
    setShowCategoryResults(false)
    setActiveCategory("")
    setSearchQuery("")
  }

  const categories = [
    { id: "images", name: "Images", icon: "🖼️", color: "bg-purple-700" },
    { id: "maps", name: "Cartes", icon: "🗺️", color: "bg-blue-700" },
    { id: "news", name: "Actualités", icon: "📰", color: "bg-indigo-700" },
    { id: "websites", name: "Sites Web", icon: "🌐", color: "bg-violet-700" },
    { id: "videos", name: "Vidéos", icon: "🎬", color: "bg-fuchsia-700" },
    { id: "shopping", name: "Shopping", icon: "🛍️", color: "bg-purple-800" },
  ]

  const mockNodes = [
    { id: "node_7a9b2c", location: "Paris, France", uptime: "99.8%", tokens: "245.32", carbonIndex: "green" },
    { id: "node_3f5e1d", location: "New York, USA", uptime: "98.5%", tokens: "187.65", carbonIndex: "orange" },
    { id: "node_2c4b6a", location: "Tokyo, Japan", uptime: "99.2%", tokens: "203.41", carbonIndex: "green" },
    { id: "node_8h7g6f", location: "Sydney, Australia", uptime: "97.3%", tokens: "156.89", carbonIndex: "red" },
  ]

  const mockResults = [
    { id: 1, title: "Résultat 1", description: "Description du résultat 1", category: "websites" },
    { id: 2, title: "Résultat 2", description: "Description du résultat 2", category: "images" },
    { id: 3, title: "Résultat 3", description: "Description du résultat 3", category: "news" },
    { id: 4, title: "Résultat 4", description: "Description du résultat 4", category: "videos" },
    { id: 5, title: "Résultat 5", description: "Description du résultat 5", category: "maps" },
    { id: 6, title: "Résultat 6", description: "Description du résultat 6", category: "shopping" },
    { id: 7, title: "Résultat 7", description: "Description du résultat 7", category: "websites" },
    { id: 8, title: "Résultat 8", description: "Description du résultat 8", category: "images" },
    { id: 9, title: "Résultat 9", description: "Description du résultat 9", category: "news" },
    { id: 10, title: "Résultat 10", description: "Description du résultat 10", category: "videos" },
    { id: 11, title: "Résultat 11", description: "Description du résultat 11", category: "maps" },
    { id: 12, title: "Résultat 12", description: "Description du résultat 12", category: "shopping" },
  ]

  const filteredResults = activeCategory
    ? mockResults.filter((result) => result.category === activeCategory)
    : mockResults

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      {/* Header */}
      <header className="w-full p-4 flex justify-end">
        {hasSearched && (
          <Button variant="ghost" className="mr-auto animate-fade-in" onClick={handleHomeClick}>
            <Home className="h-5 w-5 mr-2" />
            Accueil
          </Button>
        )}

        {/* Temporary balance button for demo */}
        <Button variant="ghost" className="font-medium mr-2 animate-fade-in" onClick={() => setBalanceOpen(true)}>
          <Badge variant="outline" className="animate-pulse-glow">
            {balance} Tokens
          </Badge>
        </Button>

        {isLoggedIn ? (
          <Button variant="ghost" className="font-medium animate-fade-in" onClick={() => setBalanceOpen(true)}>
            <User className="h-5 w-5 mr-2" />
            Profil
          </Button>
        ) : (
          <Button variant="ghost" className="animate-fade-in" onClick={() => setLoginOpen(true)}>
            <User className="h-5 w-5 mr-2" />
            Connexion
          </Button>
        )}
      </header>

      {/* Main content */}
      <main
        className={cn(
          "flex-1 w-full max-w-5xl px-4 transition-all duration-700 ease-in-out",
          hasSearched ? "pt-4" : "flex flex-col items-center justify-center",
        )}
      >
        {/* Clock */}
        <div
          className={cn(
            "text-4xl font-light text-center mb-8 transition-all duration-500 animate-pulse-glow",
            hasSearched ? "hidden" : "block animate-fade-in",
          )}
        >
          {currentTime}
        </div>

        {/* Search form */}
        <form
          onSubmit={handleSearch}
          className={cn(
            "w-full max-w-2xl mx-auto transition-all duration-700 ease-in-out",
            hasSearched ? "mb-8 scale-90 -translate-y-2" : "mb-0 animate-slide-up",
          )}
        >
          <div className="relative">
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Rechercher..."
              className={cn(
                "pl-4 pr-24 py-6 rounded-full border-2 text-lg transition-all duration-300",
                "focus:ring-2 focus:ring-primary/50 focus:border-primary",
              )}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-primary/20 transition-all duration-300"
              >
                <Mic className="h-5 w-5" />
                <span className="sr-only">Recherche vocale</span>
              </Button>
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-primary/20 transition-all duration-300"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Rechercher</span>
              </Button>
            </div>
          </div>
        </form>

        {/* Search results - Categories */}
        {hasSearched && !showCategoryResults && (
          <div className="w-full animate-slide-up">
            <h2 className="text-xl font-medium mb-6 animate-fade-in">Catégories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className={cn(
                    "cursor-pointer overflow-hidden transition-all duration-300",
                    "hover:scale-105 hover:shadow-lg hover:shadow-primary/20",
                    "border-2 border-muted",
                  )}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className={cn("h-2 w-full", category.color)} />
                  <CardContent className="p-6 flex items-center">
                    <div className="text-3xl mr-4">{category.icon}</div>
                    <div>
                      <h3 className="font-medium text-lg">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {mockResults.filter((r) => r.category === category.id).length} résultats
                      </p>
                    </div>
                    <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Search results - Filtered by category */}
        {hasSearched && showCategoryResults && (
          <div className="w-full animate-fade-in">
            <div className="flex items-center mb-6">
              <h2 className="text-xl font-medium">
                {categories.find((c) => c.id === activeCategory)?.name || "Résultats"}
              </h2>
              <Badge className="ml-2">{filteredResults.length} résultats</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResults.map((result) => (
                <Card
                  key={result.id}
                  className="cursor-pointer hover:bg-muted/50 transition-all duration-300 animate-scale-in border-2 border-muted"
                >
                  <CardContent className="p-4">
                    <h3 className="font-medium">{result.title}</h3>
                    <p className="text-sm text-muted-foreground">{result.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Login Dialog */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="sm:max-w-md bg-background border-2 border-muted animate-fade-in">
          <DialogHeader>
            <DialogTitle>Connexion</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="wallet" className="text-sm font-medium">
                Wallet
              </label>
              <Input
                id="wallet"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                className="col-span-3 border-2 border-muted"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="passphrase" className="text-sm font-medium">
                Passphrase
              </label>
              <Input
                id="passphrase"
                type="password"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                className="col-span-3 border-2 border-muted"
              />
            </div>
          </div>
          <Button onClick={handleLogin} className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
            Connexion
          </Button>
        </DialogContent>
      </Dialog>

      {/* Balance Dialog */}
      <Dialog open={balanceOpen} onOpenChange={setBalanceOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] bg-background border-2 border-muted animate-fade-in p-0 overflow-hidden">
          <div className="flex h-[500px] max-h-[90vh]">
            {/* Sidebar */}
            <div className="w-1/3 border-r pr-2 flex flex-col h-full pt-6 pl-4">
              <div className="py-3 border-b mb-4">
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="font-medium">{balance} Tokens</p>
              </div>
              <div className="space-y-2">
                <Button
                  variant={activeTab === "nodes" ? "secondary" : "ghost"}
                  className="w-full justify-start transition-colors hover:bg-primary/20"
                  size="sm"
                  onClick={() => setActiveTab("nodes")}
                >
                  Nodes
                </Button>
                <Button
                  variant={activeTab === "settings" ? "secondary" : "ghost"}
                  className="w-full justify-start transition-colors hover:bg-primary/20"
                  size="sm"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres
                </Button>
              </div>
            </div>

            {/* Main content */}
            <div className="w-2/3 flex flex-col h-full pt-6 pr-4 pl-4">
              {activeTab === "nodes" ? (
                <>
                  <h3 className="font-medium mb-4">Nodes connectés</h3>
                  <div
                    className="space-y-3 flex-1 overflow-y-auto pr-2 pb-4"
                    style={{ maxHeight: "calc(100% - 80px)" }}
                  >
                    {mockNodes.map((node) => (
                      <div
                        key={node.id}
                        className="border-2 border-muted rounded-lg p-3 transition-all duration-300 hover:bg-muted/50 relative"
                      >
                        <div className="flex justify-between items-start">
                          <div className="font-medium text-sm">{node.id}</div>
                          <Badge
                            variant={
                              node.carbonIndex === "green"
                                ? "outline"
                                : node.carbonIndex === "orange"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {node.carbonIndex}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{node.location}</div>
                        <div className="flex justify-between mt-2 text-xs">
                          <span>Uptime: {node.uptime}</span>
                          <span>Tokens: {node.tokens}</span>
                        </div>

                        {/* Temporal redirection arrows */}
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-primary animate-pulse">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12H19M19 12L12 5M19 12L12 19"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 text-primary animate-pulse">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19 12H5M5 12L12 5M5 12L12 19"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="mt-2 mb-4 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un node
                  </Button>
                </>
              ) : (
                <div className="h-full flex flex-col">
                  <h3 className="font-medium mb-4">Paramètres</h3>
                  <div
                    className="space-y-3 flex-1 overflow-y-auto pr-2 pb-4"
                    style={{ maxHeight: "calc(100% - 60px)" }}
                  >
                    <div className="border-2 border-muted rounded-lg p-4">
                      <h4 className="font-medium mb-2">Préférences du compte</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Notifications</span>
                          <Button variant="outline" size="sm">
                            Activer
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Mode sombre</span>
                          <Button variant="outline" size="sm">
                            Activé
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-muted rounded-lg p-4">
                      <h4 className="font-medium mb-2">Sécurité</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Authentification à 2 facteurs</span>
                          <Button variant="outline" size="sm">
                            Configurer
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Changer la passphrase</span>
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-muted rounded-lg p-4">
                      <h4 className="font-medium mb-2">Redirection temporelle</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Activer les redirections</span>
                          <Button variant="outline" size="sm">
                            Activer
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Synchronisation</span>
                          <Button variant="outline" size="sm">
                            Auto
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}


"use client"

import React from "react"
import Xaman from "../components/wallet/xaman"
import { useState } from "react"


export default function SearchEngine() {
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
  const [activeTab, setActiveTab] = useState("nodes")

  // Update clock
  return (
    <Xaman />
  )
}

"use client";

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { cn } from "@/src/lib/utils"

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '#events' },
    { name: 'Highlights', href: '#highlights' },
    { name: 'Sponsors', href: '#sponsors' },
]

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeItem, setActiveItem] = useState('Home')

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        };
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, name: string) => {
        setActiveItem(name)
        setIsMenuOpen(false)
        if (href.startsWith('#')) {
            e.preventDefault()
            const target = document.querySelector(href)
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }
    }

    return (
        <>
            <header className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 border-b",
                isScrolled 
                    ? "bg-[#0d0213]/70 backdrop-blur-lg border-orange-500/20 py-3 shadow-[0_4px_30px_rgba(14,2,20,0.4)]" 
                    : "bg-transparent border-transparent py-5"
            )}>
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-black tracking-widest text-gold-gradient group transition-all duration-300">
                        UTKARSH<span className="text-rose-500 group-hover:animate-ping inline-block">.</span>2K26
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link 
                                key={item.name} 
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href, item.name)}
                                className={cn(
                                    "text-sm font-semibold relative py-2 px-1 transition-colors duration-300",
                                    activeItem === item.name 
                                        ? "text-amber-400" 
                                        : "text-muted-foreground hover:text-white"
                                )}
                            >
                                {item.name}
                                {activeItem === item.name && (
                                    <motion.span 
                                        layoutId="activeUnderline"
                                        className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-400 to-rose-500 rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                        <Link href="/register">
                            <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs sm:text-sm font-bold text-white rounded-full group bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 group-hover:from-amber-400 group-hover:to-rose-500 hover:text-white focus:ring-2 focus:outline-none focus:ring-orange-800 transition-all duration-300">
                                <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-background rounded-full group-hover:bg-opacity-0">
                                    Register Now
                                </span>
                            </button>
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        className="md:hidden text-white/90 hover:text-amber-400 p-2 rounded-lg bg-white/5 border border-white/10 transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenuAlt3 className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-full left-0 w-full md:hidden bg-background/95 backdrop-blur-xl border-b border-purple-500/20 shadow-2xl"
                        >
                            <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
                                {navItems.map((item) => (
                                    <Link 
                                        key={item.name} 
                                        href={item.href}
                                        onClick={(e) => handleNavClick(e, item.href, item.name)}
                                        className={cn(
                                            "text-base font-semibold py-2 px-3 rounded-xl transition-all duration-300",
                                            activeItem === item.name 
                                                ? "text-amber-400 bg-white/5 border-l-4 border-amber-500" 
                                                : "text-muted-foreground hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                                    <button className="w-full mt-2 text-center text-sm font-bold text-white rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 py-3 hover:opacity-95 shadow-[0_4px_20px_rgba(249,115,22,0.3)] transition-all duration-300">
                                        Register Now
                                    </button>
                                </Link>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    )
}

export default Header
"use client";

import Link from 'next/link'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <>
            <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Utkarsh - 2k26
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                    </nav>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/50"
                        >
                            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    )
}

export default Header
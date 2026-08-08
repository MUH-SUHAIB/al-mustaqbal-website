"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = useTranslations();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Doctors", href: "#doctors" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-gray-200 py-3 shadow-sm"
          : "bg-white border-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Real Logo Image */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/baghdad/logo.png"
            alt="Baghdad Medical Center"
            width={160}
            height={50}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1 text-sm font-medium">
            <Globe className="w-4 h-4" />
            <span>عربي</span>
          </button>
          
          <a
            href="tel:+97150124145"
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-600/20"
          >
            <Phone className="w-4 h-4" />
            <span>Book Now</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl py-4 px-4 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 text-lg font-medium p-2 hover:bg-gray-50 rounded-lg"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="w-full h-[1px] bg-gray-100 my-2" />
            
            <a
              href="tel:+97150124145"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-medium w-full"
            >
              <Phone className="w-5 h-5" />
              <span>Call to Book</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
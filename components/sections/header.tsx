"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, MessageCircle, Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const locale = useLocale();
  const nextLocale = locale === "en" ? "ar" : "en";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Facilities", href: "#facilities" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? "top-4 px-4 md:px-8" 
          : "top-0 px-0 bg-[var(--color-secondary,#eaf0f6)]"
      }`}
    >
      <div
        className={`container mx-auto flex items-center justify-between transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-white/85 backdrop-blur-xl border border-blue-100/60 shadow-[0_8px_30px_-10px_rgba(59,130,246,0.15)] py-2.5 px-5 md:px-6 rounded-[2rem]"
            : "bg-transparent border-transparent shadow-none py-4 md:py-5 px-5 md:px-8 rounded-none"
        }`}
      >
        {/* Logo / Brand Name */}
        <a href={`/${locale}`} className="flex items-center gap-2 shrink-0 cursor-pointer">
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-base sm:text-lg leading-tight tracking-tight">
              Al Mustaqbal
            </span>
            <span className="text-[10px] sm:text-xs text-blue-700 font-medium tracking-wide">
              Medical Fitness Center
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-slate-800 hover:text-blue-700 text-sm font-semibold transition-colors py-1 group"
            >
              {link.name}
              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-blue-600 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out rounded-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href={`/${nextLocale}`}
            className="flex items-center gap-1.5 text-slate-600 hover:text-blue-700 text-sm font-semibold transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>{nextLocale === "ar" ? "عربي" : "English"}</span>
          </Link>

          <a
            href="tel:+971544995924"
            className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2.5 rounded-full font-semibold shadow-md shadow-blue-700/20 hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-700/30 transition-all duration-300 hover:-translate-y-0.5 text-sm"
          >
            <Phone className="w-4 h-4" />
            <span>Call</span>
          </a>

          <a
            href="https://wa.me/971544995924"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full font-semibold shadow-md shadow-[#25D366]/20 hover:bg-[#20bd5a] hover:shadow-lg hover:shadow-[#25D366]/40 transition-all duration-300 hover:-translate-y-0.5 text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden p-2 text-slate-800 hover:text-blue-700 transition-colors focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-panel"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-[calc(100%+0.75rem)] left-4 right-4 bg-white/95 backdrop-blur-2xl border border-blue-100/60 shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)] py-5 px-4 flex flex-col gap-1.5 lg:hidden rounded-2xl origin-top max-h-[calc(100dvh-8rem)] overflow-y-auto overscroll-contain"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-800 text-base font-semibold p-3 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all"
              >
                {link.name}
              </Link>
            ))}

            <div className="w-full h-px bg-blue-50 my-3" />

            <Link
              href={`/${nextLocale}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 text-slate-700 font-semibold p-3 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all"
            >
              <Globe className="w-5 h-5" />
              <span>{nextLocale === "ar" ? "العربية" : "English"}</span>
            </Link>

            <div className="flex flex-col gap-3 mt-2">
              <a
                href="tel:+971544995924"
                className="flex items-center justify-center gap-2 bg-blue-700 text-white px-5 py-3.5 rounded-xl font-semibold w-full hover:bg-blue-800 shadow-md shadow-blue-700/20 active:scale-[0.98] transition-all duration-200"
              >
                <Phone className="w-5 h-5" />
                <span>Call Us</span>
              </a>

              <a
                href="https://wa.me/971544995924"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 py-3.5 rounded-xl font-semibold w-full hover:bg-[#20bd5a] shadow-md shadow-[#25D366]/20 active:scale-[0.98] transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
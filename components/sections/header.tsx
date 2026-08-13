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

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Doctors", href: "#doctors" },
    { name: "Facilities", href: "#facilities" },
    { name: "Reviews", href: "#testimonials" },
    { name: "Insurance", href: "#insurance" },
    { name: "FAQ", href: "#faq" },
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
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center shrink-0">
          <Image
            src="/baghdad/logo.png"
            alt="Baghdad Medical Center"
            width={130}
            height={45}
            className="h-auto w-[110px] md:w-[130px]"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language */}
          <Link
            href={`/${nextLocale}`}
            className="text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1 text-sm font-medium"
          >
            <Globe className="w-4 h-4" />
            <span>{nextLocale === "ar" ? "عربي" : "English"}</span>
          </Link>

          {/* Call */}
          <a
            href="tel:+971502388626"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-full font-medium hover:bg-blue-700 transition-all text-sm"
          >
            <Phone className="w-4 h-4" />
            <span>Call</span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/971563564165"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-gray-200 text-gray-700 px-4 py-2.5 rounded-full font-medium hover:border-blue-300 hover:text-blue-600 transition-all text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Menu */}
        <button
          className="lg:hidden p-2 text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl py-4 px-4 flex flex-col gap-2 lg:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 text-base font-medium p-3 hover:bg-gray-50 rounded-lg"
              >
                {link.name}
              </Link>
            ))}

            <div className="w-full h-px bg-gray-100 my-2" />

            {/* Language */}
            <Link
              href={`/${nextLocale}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 text-gray-700 font-medium p-3 hover:bg-gray-50 rounded-lg"
            >
              <Globe className="w-5 h-5" />
              <span>
                {nextLocale === "ar" ? "العربية" : "English"}
              </span>
            </Link>

            {/* Call */}
            <a
              href="tel:+971502388626"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-medium w-full mt-2"
            >
              <Phone className="w-5 h-5" />
              <span>Call</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/971563564165"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 px-5 py-3 rounded-xl font-medium w-full"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
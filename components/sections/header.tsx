"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Globe,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

const PHONE_HREF = "tel:+971544995924";
const WHATSAPP_HREF = "https://wa.me/971544995924";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = useTranslations("Header");
  const locale = useLocale();
  const nextLocale = locale === "en" ? "ar" : "en";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

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
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.services"), href: "#services" },
    { name: t("nav.facilities"), href: "#facilities" },
    { name: t("nav.faq"), href: "#faq" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        isScrolled ? "px-3 pt-3 sm:px-4 md:px-6 lg:px-8" : "px-0"
      }`}
    >
      <div
        className={`mx-auto flex w-full items-center justify-between transition-all duration-500 ease-out ${
          isScrolled
            ? "max-w-[1400px] rounded-2xl border border-secondary/20 bg-primary px-4 py-2.5 shadow-[0_10px_35px_-12px_rgba(28,75,58,0.45)] sm:px-5 md:px-6"
            : "rounded-none bg-primary px-4 py-3.5 sm:px-5 md:px-8"
        }`}
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex shrink-0 items-center"
          aria-label={t("clinicName")}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-0.5 shadow-md sm:h-11 sm:w-11">
            <Image
              src="/Al_mustaqbal/logo.png"
              alt={t("clinicName")}
              width={42}
              height={42}
              priority
              className="h-full w-full rounded-full object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 lg:flex xl:gap-8"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative py-2 text-sm font-medium text-white/90 transition-colors duration-200 hover:text-white"
            >
              {link.name}

              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 rounded-full bg-secondary transition-transform duration-300 ease-out group-hover:scale-x-100 rtl:origin-right"
              />
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Language */}
          <Link
            href={`/${nextLocale}`}
            className="flex items-center gap-1.5 rounded-full px-2 py-2 text-sm font-medium text-white/85 transition-colors duration-200 hover:text-white"
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            <span>{t("actions.langName")}</span>
          </Link>

          {/* Call */}
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary dir-ltr"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>{t("actions.call")}</span>
          </a>

          {/* WhatsApp */}
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-primary shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>{t("actions.whatsapp")}</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-white transition-colors duration-200 hover:bg-white/10 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary lg:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-panel"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
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
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`absolute left-3 right-3 top-[calc(100%+0.75rem)] overflow-y-auto rounded-2xl border border-secondary/20 bg-primary p-4 shadow-[0_20px_45px_-15px_rgba(28,75,58,0.45)] sm:left-4 sm:right-4 lg:hidden ${
              isScrolled ? "max-h-[calc(100dvh-6rem)]" : "max-h-[calc(100dvh-7rem)]"
            }`}
          >
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-1"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="flex min-h-12 items-center rounded-xl px-4 text-base font-medium text-white/90 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="my-4 h-px bg-white/10" />

            {/* Mobile Language */}
            <Link
              href={`/${nextLocale}`}
              onClick={closeMobileMenu}
              className="flex min-h-12 items-center gap-3 rounded-xl px-4 text-base font-medium text-white/90 transition-colors duration-200 hover:bg-white/10 hover:text-white"
            >
              <Globe className="h-5 w-5" aria-hidden="true" />
              <span>{t("actions.langNameMobile")}</span>
            </Link>

            {/* Mobile Contact Buttons */}
            <div className="mt-3 grid gap-3">
              <a
                href={PHONE_HREF}
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-secondary px-5 py-3 font-semibold text-secondary-foreground shadow-sm transition-all duration-200 hover:brightness-105 active:scale-[0.98] dir-ltr"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                <span>{t("actions.call")}</span>
              </a>

              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-primary shadow-sm transition-all duration-200 hover:bg-white/95 active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                <span>{t("actions.whatsapp")}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
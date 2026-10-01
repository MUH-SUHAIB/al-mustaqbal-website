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
import { staggerContainer, slideUp } from "@/lib/motion";

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
    { name: t("nav.home"), href: `/${locale}` },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.services"), href: "#services" },
    { name: t("nav.documents"), href: "#documents" },
    { name: t("nav.results"), href: "#results" },
    { name: t("nav.facilities"), href: "#facilities" },
    { name: t("nav.faq"), href: "#faq" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled ? "px-3 pt-3 sm:px-4 md:px-6 lg:px-8" : "px-0"
      }`}
    >
      <div
        className={`relative mx-auto flex w-full items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? "max-w-[1400px] rounded-2xl border border-secondary/20 bg-primary px-4 py-2.5 shadow-brand-float sm:px-5 md:px-6"
            : "rounded-none bg-primary px-4 py-3.5 sm:px-5 md:px-8"
        }`}
      >
        {/**
         * Subtle bottom hairline, visible only in the full-width (unscrolled)
         * state, to give the bar a more deliberate, finished edge — matches
         * the same gradient-hairline technique already used in footer.tsx.
         */}
        {!isScrolled && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent"
            aria-hidden="true"
          />
        )}

        {/* Logo + Clinic Name */}
        <Link
          href={`/${locale}`}
          className="flex shrink-0 items-center gap-2.5"
          aria-label={t("clinicName")}
        >
          {/**
           * Added a thin permanent gold ring around the logo circle — a
           * small "official seal" cue that reinforces the government/
           * accredited feel without changing any brand colors.
           */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-0.5 shadow-md ring-2 ring-secondary/40 sm:h-11 sm:w-11">
            <Image
              src="/Al_mustaqbal/logo-optimized.png"
              alt={t("clinicName")}
              width={42}
              height={42}
              priority
              className="h-full w-full rounded-full object-contain"
            />
          </div>

          <span className="hidden text-sm font-bold leading-tight text-white 2xl:block 2xl:text-base">
               {t("clinicName")}
           </span>
        </Link>

        {/**
         * Desktop Navigation — breakpoint moved from `lg` to `xl`.
         * With 8 nav items now (Home through Contact), showing the full
         * row at 1024px was going to feel cramped for a "premium" header.
         * Tablet-range screens now get the mobile menu instead, which is
         * cleaner than a squeezed single-row nav.
         */}
        <motion.nav
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          aria-label="Main navigation"
          className="hidden items-center gap-5 xl:flex xl:gap-7"
        >
          {navLinks.map((link) => (
            <motion.div key={link.name} variants={slideUp}>
              <Link
                href={link.href}
                className="group relative py-2 text-sm font-medium text-white/90 transition-colors duration-200 hover:text-white"
              >
                {link.name}

                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 rounded-full bg-secondary transition-transform duration-300 ease-out group-hover:scale-x-100 rtl:origin-right"
                />
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 xl:flex">
          {/* Language */}
          <Link
            href={`/${nextLocale}`}
            className="flex items-center gap-1.5 rounded-full px-2 py-2 text-sm font-medium text-white/85 transition-colors duration-200 hover:text-white"
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            <span>{t("actions.langName")}</span>
          </Link>

          {/**
           * Call + WhatsApp are now motion.a elements using the exact same
           * whileHover/whileTap scale values as the shared Button/LinkButton
           * components (components/ui/button.tsx) — so the hover/tap feel
           * is consistent everywhere on the site, not a one-off here.
           */}
          <motion.a
            href={PHONE_HREF}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground shadow-sm hover:brightness-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary dir-ltr"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>{t("actions.call")}</span>
          </motion.a>

          <motion.a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-white/95 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>{t("actions.whatsapp")}</span>
          </motion.a>
        </div>

        {/* Mobile Menu Button — now shown up to `xl` instead of `lg` */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-white transition-colors duration-200 hover:bg-white/10 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary xl:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-panel"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation — breakpoint updated to match (xl:hidden) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`absolute left-3 right-3 top-[calc(100%+0.75rem)] overflow-y-auto rounded-2xl border border-secondary/20 bg-primary p-4 shadow-[0_20px_45px_-15px_rgba(28,75,58,0.45)] sm:left-4 sm:right-4 xl:hidden ${
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
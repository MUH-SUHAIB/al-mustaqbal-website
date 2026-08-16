"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Section } from "./section-shell";
import { Text, Heading } from "@/components/ui/typography";
import type { CTAContent } from "./types";
import { slideUp } from "@/lib/motion";

export interface TestimonialItem {
  name: string;
  review: string;
  date: string;
  rating?: number;
}

export interface TestimonialsContent {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  aggregateScore?: {
    rating: number;
    totalReviews: string;
    platform?: string;
  };
  testimonials: TestimonialItem[];
  appointmentCta: CTAContent;
  animate?: boolean;
}

/* Authentic Google 'G' Vector Brand Mark */
function GoogleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
    </svg>
  );
}

/* Elegant Dual-Layer Metallic Quote Icon */
function PremiumQuoteIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M10 11H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4M19 11h-4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("");
}

function getRelativeTime(dateString: string): string {
  const then = new Date(dateString).getTime();
  const diffDays = Math.floor((Date.now() - then) / (1000 * 60 * 60 * 24));
  if (diffDays < 1) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 30) return `${diffDays} days ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return diffMonths === 1 ? "1 month ago" : `${diffMonths} months ago`;
  const diffYears = Math.floor(diffMonths / 12);
  return diffYears === 1 ? "1 year ago" : `${diffYears} years ago`;
}

// Utility to safely truncate text without cutting words in half
function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  const lastSpace = text.lastIndexOf(" ", maxLength);
  return text.substring(0, lastSpace > 0 ? lastSpace : maxLength) + "...";
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          aria-hidden
          className={i < rating ? "fill-amber-400 text-amber-400 drop-shadow-sm" : "fill-none text-slate-300"}
        />
      ))}
    </div>
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 28, opacity: { duration: 0.3 } },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
    scale: 0.98,
    transition: { type: "spring", stiffness: 260, damping: 28, opacity: { duration: 0.2 } },
  }),
};

// Configuration for character limit before truncating
const MAX_REVIEW_CHARS = 150; 

export function Testimonials({
  id,
  eyebrow = "Patient Stories",
  title = "What Our Patients Say",
  description,
  aggregateScore,
  testimonials,
  appointmentCta,
  animate = false,
}: TestimonialsContent) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); 

  const currentIndex = ((page % testimonials.length) + testimonials.length) % testimonials.length;
  const activeReview = testimonials[currentIndex];
  
  const isLongReview = activeReview.review.length > MAX_REVIEW_CHARS;

  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection]);
    setIsExpanded(false); 
  }, [page]);

  useEffect(() => {
    if (isHovered || isExpanded) return;
    const timer = setInterval(() => paginate(1), 6500);
    return () => clearInterval(timer);
  }, [isHovered, isExpanded, paginate]);

  const displayText = (isLongReview && !isExpanded) 
    ? truncateText(activeReview.review, MAX_REVIEW_CHARS) 
    : activeReview.review;

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(255,241,242,0.7)_0%,rgba(239,246,255,0.6)_40%,rgba(219,234,254,0.4)_100%)] dark:bg-[linear-gradient(to_bottom,rgba(225,29,72,0.03)_0%,rgba(29,78,216,0.03)_40%,transparent_100%)]" aria-hidden="true" />
      
      <Section id={id} eyebrow={eyebrow} title={title} description={description} animate={animate}>
        
        {aggregateScore && (
          <motion.div
            {...(animate ? { variants: slideUp, initial: "hidden", whileInView: "visible", viewport: { once: true } } : {})}
            className="-mt-3 mb-10 flex justify-center"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-blue-300 bg-white/80 px-5 py-2 shadow-sm backdrop-blur-md transition-all hover:shadow-md hover:bg-white hover:border-blue-400 dark:border-blue-500/50 dark:bg-slate-800/80">
              <GoogleIcon className="h-4 w-4" />
              <span className="font-bold text-foreground text-sm tracking-tight">{aggregateScore.rating.toFixed(1)}</span>
              <StarRating rating={Math.round(aggregateScore.rating)} />
              <span className="h-3.5 w-[1px] bg-slate-300 dark:bg-slate-600" />
              <span className="text-xs text-muted-foreground font-medium">{aggregateScore.totalReviews} {aggregateScore.platform}</span>
            </div>
          </motion.div>
        )}

        <div className="relative mx-auto w-full max-w-6xl">
          <motion.div
            layout
            {...(animate ? { variants: slideUp, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-50px" } } : {})}
            className="relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-blue-200 bg-white/50 p-8 sm:p-12 md:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-[border,box-shadow,background] duration-500 hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.15)] hover:border-blue-300 dark:border-blue-800/40 dark:bg-slate-900/50 sm:min-h-[460px] md:min-h-[480px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(-1)}
              className="absolute start-4 sm:start-8 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-blue-200 bg-white/90 text-foreground shadow-md backdrop-blur-md transition-colors hover:border-blue-400 hover:bg-blue-500 hover:text-white dark:border-slate-700 dark:bg-slate-800"
            >
              <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(1)}
              className="absolute end-4 sm:end-8 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-blue-200 bg-white/90 text-foreground shadow-md backdrop-blur-md transition-colors hover:border-blue-400 hover:bg-blue-500 hover:text-white dark:border-slate-700 dark:bg-slate-800"
            >
              <ChevronRight className="h-5 w-5 rtl:rotate-180" />
            </motion.button>

            <motion.div layout className="flex justify-center text-blue-400 mb-4">
              <PremiumQuoteIcon className="h-10 w-10 text-blue-300/60" />
            </motion.div>

            <div className="relative flex-1 flex items-center justify-center overflow-hidden px-8 sm:px-16 my-4">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full flex flex-col items-center text-center max-w-3xl"
                >
                  {/* FIX: Added min-h-[160px] md:min-h-[180px] to this wrapper so short text takes up the exact same vertical space as 4 lines of text */}
                  <motion.div layout className="flex flex-col items-center justify-center gap-2 min-h-[160px] md:min-h-[180px] w-full">
                    <Text variant="body" className="text-foreground/90 font-medium italic text-lg md:text-2xl leading-relaxed md:leading-loose text-balance transition-all duration-300" dir="auto">
                      “{displayText}”
                    </Text>
                    
                    {isLongReview && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setIsExpanded(!isExpanded);
                        }}
                        className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                      >
                        {isExpanded ? "Show less" : "Read more"}
                      </button>
                    )}
                  </motion.div>

                  <motion.div layout className="mt-8 flex flex-col items-center gap-3">
                    <StarRating rating={activeReview.rating ?? 5} />
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 font-bold text-sm shadow-inner ring-2 ring-white">
                        {initials(activeReview.name)}
                      </div>
                      <div className="text-start" dir="auto">
                        <Text variant="body" className="font-semibold text-foreground leading-snug">
                          {activeReview.name}
                        </Text>
                        <Text variant="caption" className="text-muted-foreground">
                          {getRelativeTime(activeReview.date)}
                        </Text>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div layout className="mt-8 flex justify-center items-center gap-2.5 z-10">
              {testimonials.map((_, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      const dir = idx > currentIndex ? 1 : -1;
                      setPage([idx, dir]);
                      setIsExpanded(false); 
                    }}
                    className="group relative flex items-center justify-center py-2"
                    aria-label={`Go to review ${idx + 1}`}
                  >
                    <span
                      className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
                        isActive 
                          ? "w-8 bg-blue-500 shadow-sm" 
                          : "w-2.5 bg-slate-300 group-hover:bg-blue-300 dark:bg-slate-700"
                      }`}
                    />
                  </button>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-12 flex justify-center">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={appointmentCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 rounded-full border border-blue-300 bg-white/70 px-8 py-4 text-sm font-semibold text-foreground shadow-[0_8px_20px_-6px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-800/50 dark:bg-slate-900/70 dark:hover:bg-blue-900/30"
          >
            <GoogleIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            <span>{appointmentCta.label}</span>
            <ExternalLink className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:text-blue-500 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>
      </Section>
    </div>
  );
}
"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, MessageCircle, Phone } from "lucide-react";
import { Heading, Text } from "@/components/ui/typography";
import { duration, easing } from "@/lib/motion";

const PHONE_HREF = "tel:+971544995924";
const WHATSAPP_HREF = "https://wa.me/971544995924";

export interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.fast, ease: easing }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" aria-hidden onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="appointment-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: duration.base, ease: easing }}
            className="relative z-10 w-full max-w-md rounded-section border border-border bg-background p-xl text-center shadow-elevated"
          >
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close"
              className="absolute end-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors duration-fast hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X size={20} aria-hidden />
            </button>

            <Heading level="h3" id="appointment-modal-title">
              Contact Al Mustaqbal Center
            </Heading>
            <Text variant="body" className="mt-2">
              Choose how you&apos;d like to connect with our team.
            </Text>

            <div className="mt-xl flex flex-col gap-4">
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-card border border-border bg-background p-md text-start shadow-subtle transition-shadow duration-fast hover:shadow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white" aria-hidden>
                  <MessageCircle size={24} />
                </span>
                <span className="flex flex-col">
                  <Text variant="body" className="font-semibold">
                    Chat on WhatsApp
                  </Text>
                  <Text variant="small">Instant support from our reception desk.</Text>
                </span>
              </a>

              <a
                href={PHONE_HREF}
                className="flex items-center gap-4 rounded-card border border-border bg-background p-md text-start shadow-subtle transition-shadow duration-fast hover:shadow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white" aria-hidden>
                  <Phone size={24} />
                </span>
                <span className="flex flex-col">
                  <Text variant="body" className="font-semibold">
                    Call the Center
                  </Text>
                  <Text variant="small">+971 54 499 5924</Text>
                </span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
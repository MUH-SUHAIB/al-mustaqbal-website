import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { LinkButton } from "@/components/ui/button";

export interface WorkingHoursRow {
  days: string;
  hours: string;
}

export interface ContactContent {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  phone: string;
  phoneHref?: string;
  mobile?: string;
  mobileHref?: string;
  whatsapp: string;
  whatsappLabel?: string;
  email?: string;
  address: string;
  mapLink?: string;
  workingHours: WorkingHoursRow[];
  mapEmbedSrc?: string;
  animate?: boolean;
}

export function Contact({
  id,
  eyebrow,
  title,
  description,
  phone,
  phoneHref,
  mobile,
  mobileHref,
  whatsapp,
  whatsappLabel,
  email,
  address,
  mapLink,
  workingHours,
  mapEmbedSrc,
  animate = false,
}: ContactContent) {
  const landlineTel = `tel:${phoneHref ?? phone.replace(/\s+/g, "")}`;
  const mobileTel = mobile ? `tel:${mobileHref ?? mobile.replace(/\s+/g, "")}` : undefined;

  return (
    <Section id={id} eyebrow={eyebrow} title={title} description={description} align="start" animate={animate}>
      <div className="grid grid-cols-1 gap-xl md:grid-cols-2 md:gap-2xl">
        {/* Contact Info Column */}
        <div className="flex flex-col items-start gap-6 text-start">
          <div className="flex flex-wrap gap-3">
            {/* Landline */}
            <LinkButton href={landlineTel} variant="primary" icon={<Phone size={18} />}>
              {phone}
            </LinkButton>

            {/* Mobile */}
            {mobile && mobileTel && (
              <LinkButton href={mobileTel} variant="primary" icon={<Phone size={18} />}>
                {mobile}
              </LinkButton>
            )}

            {/* WhatsApp */}
            <LinkButton
              href={`https://wa.me/${whatsapp}`}
              variant="outline"
              icon={<MessageCircle size={18} />}
              target="_blank"
              rel="noopener noreferrer"
            >
              {whatsappLabel ?? "WhatsApp"}
            </LinkButton>

            {/* Email */}
            {email && (
              <LinkButton href={`mailto:${email}`} variant="ghost" icon={<Mail size={18} />}>
                {email}
              </LinkButton>
            )}
          </div>

          {/* Clickable Map Location */}
          <div className="flex items-start gap-3">
            <MapPin size={20} className="mt-1 shrink-0 text-primary" aria-hidden />
            {mapLink ? (
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body hover:text-primary transition-colors hover:underline"
              >
                {address}
              </a>
            ) : (
              <Text variant="body">{address}</Text>
            )}
          </div>

          {/* Working Hours */}
          <div className="flex items-start gap-3">
            <Clock size={20} className="mt-1 shrink-0 text-primary" aria-hidden />
            <div className="flex flex-col gap-1">
              {workingHours.map((row, i) => (
                <Text key={i} variant="body">
                  <span className="font-medium">{row.days}:</span> {row.hours}
                </Text>
              ))}
            </div>
          </div>
        </div>

        {/* Embedded Google Map */}
        <div className="aspect-[4/3] w-full overflow-hidden rounded-card border border-border bg-muted">
          {mapEmbedSrc ? (
            <iframe
              src={mapEmbedSrc}
              title="Clinic location map"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Heading level="h6">Map embed goes here</Heading>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
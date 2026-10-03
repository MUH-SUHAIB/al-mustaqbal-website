"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { staggerContainer, slideUp } from "@/lib/motion";

// Static mapping for service images to match the JSON keys in ar.json and en.json.
// The municipality card now uses its own dedicated image instead of sharing
// the occupational vaccinations photo.
const SERVICE_IMAGES: Record<string, string> = {
  "residency-visa": "/Al_mustaqbal/services/residency-visa-medical-checkup-clinic.jpg",
  "occupational-vaccinations": "/Al_mustaqbal/services/visa-occupational-health-examination-center-al-madam-lahbab.jpg",
  "hepatitis-b-vaccination": "/Al_mustaqbal/services/uae-visa-medical-screening-blood-test-department.jpg",
  "municipality-screening": "/Al_mustaqbal/services/municipality-employee-medical-screening-al-madam.jpg",
  "pregnancy-testing": "/Al_mustaqbal/services/visa-blood-test-check-up-lahbab-al-madam.jpg",
  "chest-xray": "/Al_mustaqbal/services/visa-medical-fitness-xray-al-mdam.jpg",
};

export function Services({
  id,
  columns = 3,
  animate = true,
}: {
  id?: string;
  columns?: 2 | 3 | 4;
  animate?: boolean;
}) {
  const t = useTranslations("Services");
  // Approved image descriptions live in the "Images.services" block
  // of messages/en.json and messages/ar.json.
  const tImg = useTranslations("Images");
  const Container = animate ? motion.div : "div";

  const columnClasses: Record<2 | 3 | 4, string> = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  const serviceKeys = [
    "residency-visa",
    "occupational-vaccinations",
    "hepatitis-b-vaccination",
    "municipality-screening",
    "pregnancy-testing",
    "chest-xray",
  ];

  return (
    <div className="relative overflow-hidden bg-background">
      <Section id={id} className="py-20 md:py-28">
        <Container
          {...(animate
            ? {
                variants: staggerContainer,
                initial: "hidden",
                whileInView: "visible",
                viewport: { once: true, margin: "-50px" },
              }
            : {})}
          className="flex flex-col items-center w-full"
        >
          {/* Section Header */}
          <motion.div
            {...(animate ? { variants: slideUp } : {})}
            className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 md:mb-16 gap-4"
          >
            <Heading level="h2" className="text-foreground text-3xl md:text-4xl font-bold">
              {t("title")}
            </Heading>
            <Text variant="body" className="text-muted-foreground text-lg">
              {t("description")}
            </Text>
          </motion.div>

          {/* Services Grid */}
          <div className={`grid grid-cols-1 gap-6 md:gap-8 w-full ${columnClasses[columns]}`}>
            {serviceKeys.map((key) => {
              const title = t(`items.${key}.title`);
              const description = t(`items.${key}.description`);
              const imgSrc = SERVICE_IMAGES[key];
              // Approved description for this photo (not the card title)
              const imgAlt = tImg(`services.${key}`);

              return (
                <motion.div
                  key={key}
                  {...(animate ? { variants: slideUp } : {})}
                  className="h-full"
                >
                  <Card interactive className="group h-full flex flex-col overflow-hidden border border-border shadow-subtle hover:shadow-elevated transition-shadow duration-300 rounded-card bg-card">
                    {/**
                     * `sizes` here reflects the actual grid breakpoints:
                     * 1 column on mobile (full width), 2 columns from sm,
                     * up to 3 columns from lg (when columns=3, the default).
                     * This is an approximation since `columns` is a runtime
                     * prop — good enough for the browser to pick a sensibly
                     * sized image rather than always grabbing the largest.
                     */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted border-b border-border/50">
                      <Image
                        src={imgSrc}
                        alt={imgAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </div>

                    <CardHeader className="text-center flex flex-col items-center p-6 sm:p-8">
                      <CardTitle className="text-xl font-bold text-foreground mb-2">
                        {title}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>
    </div>
  );
}

export default Services;
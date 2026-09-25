"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { staggerContainer, slideUp } from "@/lib/motion";

// Static mapping for service images to match the JSON keys in ar.json and en.json
const SERVICE_IMAGES: Record<string, string> = {
  "residency-visa": "/Al_mustaqbal/services/residency-visa-medical-checkup-clinic.jpg",
  "occupational-vaccinations": "/Al_mustaqbal/services/visa-occupational-health-examination-center-al-madam-lahbab.jpg",
  "hepatitis-b-vaccination": "/Al_mustaqbal/services/uae-visa-medical-screening-blood-test-department.jpg",
  "municipality-screening": "/Al_mustaqbal/services/visa-occupational-health-examination-center-al-madam-lahbab.jpg",
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

              return (
                <motion.div
                  key={key}
                  {...(animate ? { variants: slideUp } : {})}
                  className="h-full"
                >
                  <Card interactive className="group h-full flex flex-col overflow-hidden border border-border shadow-subtle hover:shadow-elevated transition-shadow duration-300 rounded-card bg-card">
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted border-b border-border/50">
                      <img
                        src={imgSrc}
                        alt={title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
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
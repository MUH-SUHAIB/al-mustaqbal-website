import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

export const heroContent = {
  badge: "Medical Screening Approved for All Emirates",
  headline: "Al Mustaqbal Medical Fitness Examination Center",
  subtitle: "Professional medical fitness and visa screening services in Al Madam, Sharjah.",
  primaryCta: {
    label: "Contact Us",
    href: "#contact",
  },
  secondaryCta: {
    label: "Our Services",
    href: "#services",
  },
  image: {
    src: "/Al_mustaqbal/al-mustaqbal-medical-fitness-entrance.jpg",
    alt: "Al Mustaqbal Medical Fitness Examination Center entrance in Al Madam, Sharjah"
  },
};

export const aboutContent = {
  title: "About Our Center",
  eyebrow: "Medical Fitness Examination Services in Sharjah",
  paragraphs: [
    "Al Mustaqbal Medical Fitness Examination Center provides medical fitness examination and screening services for residence and employment visa requirements, occupational health needs, vaccinations, and related medical examinations in Al Madam, Sharjah.",
    "We are a government-accredited facility approved for all Emirates, ensuring fast and reliable processing."
  ],
  mission: {
    title: "Our Mission",
    description: "To provide efficient, accurate, and accessible medical fitness screening services that meet official UAE health authority standards."
  },
  vision: {
    title: "Our Vision",
    description: "To be the leading and most trusted medical fitness examination center in the Sharjah region."
  },
  image: {
    src: "/Al_mustaqbal/al-mustaqbal-medical-fitness-center-al-madam-sharjah.jpg",
    alt: "Al Mustaqbal Medical Fitness Examination Center in Al Madam, Sharjah"
  }
};

export const servicesContent = {
  title: "Our Services",
  description: "Medical fitness, visa screening, vaccination, and occupational health services",
  services: [
    {
      id: "residency-visa",
      title: "Residence & Visa Medical Screening",
      description: "Medical fitness examinations required for residence and employment visa procedures.",
      image: {
        src: "/Al_mustaqbal/services/residency-visa-medical-checkup-clinic.jpg",
        alt: "Residence and visa medical screening service at Al Mustaqbal Medical Fitness Examination Center"
      }
    },
    {
      id: "occupational-vaccinations",
      title: "Occupational Vaccinations",
      description: "Vaccination services for occupational groups including food handlers, domestic workers, and barbers.",
      image: {
        src: "/Al_mustaqbal/services/visa-occupational-health-examination-center-al-madam-lahbab.jpg",
        alt: "Occupational health and vaccination services in Al Madam"
      }
    },
    {
      id: "hepatitis-b-vaccination",
      title: "Hepatitis B Vaccination",
      description: "Hepatitis B vaccination services as part of applicable occupational health requirements.",
      image: {
        src: "/Al_mustaqbal/services/uae-visa-medical-screening-blood-test-department.jpg",
        alt: "Medical screening and vaccination service at Al Mustaqbal Medical Fitness Examination Center"
      }
    },
    {
      id: "municipality-screening",
      title: "Municipality Employee Screening",
      description: "Medical screening for new municipality employees, including eye testing and vital signs assessment.",
      image: {
        src: "/Al_mustaqbal/services/visa-occupational-health-examination-center-al-madam-lahbab.jpg",
        alt: "Occupational medical screening for municipality employees"
      }
    },
    {
      id: "pregnancy-testing",
      title: "Pregnancy Testing for Domestic Workers",
      description: "Pregnancy testing services for domestic workers as part of applicable medical examination procedures.",
      image: {
        src: "/Al_mustaqbal/services/visa-blood-test-check-up-lahbab-al-madam.jpg",
        alt: "Blood testing service at Al Mustaqbal Medical Fitness Examination Center"
      }
    },
    {
      id: "chest-xray",
      title: "Chest X-Ray",
      description: "Chest X-ray examinations provided as part of applicable medical fitness screening procedures.",
      image: {
        src: "/Al_mustaqbal/services/visa-medical-fitness-xray-al-mdam.jpg",
        alt: "Chest X-ray medical screening service in Al Madam, Sharjah"
      }
    },
  ],
};

export const facilitiesContent = {
  title: "Our Center",
  description: "A convenient environment for your medical examination",
  facilities: [
    {
      label: "Reception & Information Desk",
      image: {
        src: "/Al_mustaqbal/accredited-visa-medical-screening-center-reception.jpg",
        alt: "Reception and information area at Al Mustaqbal Medical Fitness Examination Center"
      }
    },
    {
      label: "Waiting Area",
      image: {
        src: "/Al_mustaqbal/al-mustaqbal-medical-fitness-center-waiting-area-sharjah.jpg",
        alt: "Waiting area at Al Mustaqbal Medical Fitness Examination Center"
      }
    },
    {
      label: "Blood Testing Area",
      image: {
        src: "/Al_mustaqbal/services/visa-blood-test-check-up-lahbab-al-madam.jpg",
        alt: "Blood testing area for medical screening"
      }
    },
    {
      label: "X-Ray Waiting Area",
      image: {
        src: "/Al_mustaqbal/al-mustaqbal-medical-fitness-xray-waiting-room.jpg",
        alt: "X-Ray waiting area at Al Mustaqbal Medical Fitness Examination Center"
      }
    },
    {
      label: "Center Entrance",
      image: {
        src: "/Al_mustaqbal/al-mustaqbal-medical-fitness-center-entrance-sharjah.jpg",
        alt: "Main entrance of Al Mustaqbal Medical Fitness Examination Center"
      }
    },
  ],
};

export const faqContent = {
  title: "Frequently Asked Questions",
  description: "Important information about your medical fitness examination",
  items: [
    {
      question: "What documents are required for the medical examination?",
      answer: "Please bring the required documents for your examination, including the old Unified Number, a copy of your Emirates ID, passport copy, residence or visa copy, company trade license copy, a recent personal photograph, and a copy of the Occupation Health Card issued by Sharjah Municipality Medical Fitness Centers.",
    },
    {
      question: "When will I receive my medical results?",
      answer: "The medical certificate results will be sent by SMS to the provided mobile number within 24 hours.",
    },
    {
      question: "What are the center's working hours?",
      answer: "The center is open Saturday through Thursday from 8:00 AM to 2:00 PM. The center is closed on Friday.",
    },
    {
      question: "Where is Al Mustaqbal Medical Fitness Examination Center located?",
      answer: "The center is located in Sharjah, at Al Madam Roundabout, next to First Abu Dhabi Bank (FAB).",
    },
    {
      question: "Are medical screenings approved for all Emirates?",
      answer: "Medical screening at Al Mustaqbal Medical Fitness Examination Center is approved for all Emirates.",
    },
  ],
};

export const contactContent = {
  title: "Visit Our Center",
  description: "Find us at Al Madam Roundabout, next to First Abu Dhabi Bank (FAB)",
  phone: "+971 54 499 5924",
  whatsapp: "+971 54 499 5924",
  address: "Al Madam Roundabout, next to First Abu Dhabi Bank (FAB), Sharjah, United Arab Emirates",
  workingHours: [
    { days: "Saturday – Thursday", hours: "8:00 AM – 2:00 PM" },
    { days: "Friday", hours: "Closed" }
  ],
  mapEmbedSrc: "https://maps.google.com/maps?q=24.914767,55.7755581&hl=en&z=18&output=embed",
  googleMapsUrl: "https://www.google.com/maps/place/%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%82%D8%A8%D9%84+%D9%84%D9%84%D9%8A%D8%A7%D9%82%D8%A9+%D8%A7%D9%84%D8%B7%D8%A8%D9%8A%D8%A9%E2%80%AD/@24.9151742,55.7747171,19.22z/data=!4m14!1m7!3m6!1s0x3ef573f609a9bbf7:0x9ebb7b0be900046e!2sBAGHDAD+MEDICAL+CENTRE!8m2!3d24.9146055!4d55.7757416!16s%2Fg%2F11clvpfq2k!3m5!1s0x3ef575000d86e721:0xa1486a7754c5f16c!8m2!3d24.914767!4d55.7755581!16s%2Fg%2F11m5llqxx1?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
};

export const footerContent = {
  clinicName: "Al Mustaqbal Medical Fitness Examination Center",
  tagline: "Accredited medical fitness and visa screening services, occupational health examinations, and vaccinations in Al Madam, Sharjah.",
  phone: "+971 54 499 5924",
  whatsapp: "+971 54 499 5924",
  address: [
    "Al Madam Roundabout, next to First Abu Dhabi Bank (FAB)",
    "Sharjah, United Arab Emirates"
  ],
  googleMapsUrl: "https://www.google.com/maps/place/%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%82%D8%A8%D9%84+%D9%84%D9%84%D9%8A%D8%A7%D9%82%D8%A9+%D8%A7%D9%84%D8%B7%D8%A8%D9%8A%D8%A9%E2%80%AD/@24.9151742,55.7747171,19.22z/data=!4m14!1m7!3m6!1s0x3ef573f609a9bbf7:0x9ebb7b0be900046e!2sBAGHDAD+MEDICAL+CENTRE!8m2!3d24.9146055!4d55.7757416!16s%2Fg%2F11clvpfq2k!3m5!1s0x3ef575000d86e721:0xa1486a7754c5f16c!8m2!3d24.914767!4d55.7755581!16s%2Fg%2F11m5llqxx1?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
  quickLinks: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Facilities", href: "#facilities" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact Us", href: "#contact" }
  ],
  socialLinks: [],
  copyright: "© 2026 Al Mustaqbal Medical Fitness Examination Center. All rights reserved."
};
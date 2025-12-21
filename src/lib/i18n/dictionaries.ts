import type { Locale } from "./config";

const dictionaries = {
    da: {
        common: {
            brand: "Skovkrogen 37",
            siteDescription: "Sommerhus udlejning",
            skipLink: "Gå til indhold",
            ogAlt: "Billede af sommerhuset",
            theHouse: "Sommerhuset",
            area: "Området",
            bookNow: "Book Nu"
        }
    },
    en: {
        common: {
            brand: "Skovkrogen 37",
            siteDescription: "Holiday home rental",
            skipLink: "Skip to content",
            ogAlt: "Image of the house",
            theHouse: "The House",
            area: "The Area",
            bookNow: "Book Now"
        }
    },
    de: {
        common: {
            brand: "Skovkrogen 37",
            siteDescription: "Ferienhausvermietung",
            skipLink: "Zum Inhalt springen",
            ogAlt: "Bild des Hauses",
            theHouse: "Das Haus",
            area: "Die Gegend",
            bookNow: "Jetzt Buchen"
        }
    }
};

export const getDictionary = (locale: Locale) => dictionaries[locale] ?? dictionaries.da;

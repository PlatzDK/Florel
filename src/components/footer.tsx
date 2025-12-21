import { siteConfig } from "@/lib/site-config";

export function Footer({ dictionary, locale }: { dictionary: any; locale: string }) {
    return (
        <footer className="bg-secondary py-12 text-sm text-primary/80">
            <div className="container-responsive grid gap-8 md:grid-cols-3">
                <div>
                    <h3 className="mb-4 font-heading font-semibold text-primary">{siteConfig.name}</h3>
                    <p>Skovkrogen 37, 8600 Silkeborg</p>
                    <p>CVR: {siteConfig.contact.cvr}</p>
                </div>
                <div>
                    <h3 className="mb-4 font-heading font-semibold text-primary">Kontakt</h3>
                    <p>Tlf: {siteConfig.contact.phone}</p>
                    <p>Email: {siteConfig.contact.email}</p>
                </div>
                <div className="text-right">
                    <p>&copy; {new Date().getFullYear()} {siteConfig.name}</p>
                </div>
            </div>
        </footer>
    );
}

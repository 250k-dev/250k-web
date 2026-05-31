import Link from "next/link";
import {
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandWhatsapp,
  IconMail,
  IconMapPin,
} from "@tabler/icons-react";
import LogoIcon from "@/assets/logo-icon";
import LogoLabel from "@/assets/logo-label";

const footerLinks = [
  { href: "/sobre", label: "Sobre" },
  { href: "/solucoes", label: "Soluções" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
  { href: "/admin", label: "Acesso Administrativo" },
];

const legalLinks = [
  { href: "/legal#privacidade", label: "Política de privacidade" },
  { href: "/legal#cookies", label: "Política de cookies" },
  { href: "/legal#termos", label: "Termos de uso" },
  { href: "/legal#lgpd", label: "LGPD" },
];

const socials = [
  {
    href: "https://www.linkedin.com/company/250k-agricultura-em-alta-performance",
    label: "LinkedIn",
    icon: IconBrandLinkedin,
    color: "#0A66C2",
  },
  {
    href: "https://instagram.com/agro250k",
    label: "Instagram",
    icon: IconBrandInstagram,
    color: "#E1306C",
  },
  {
    href: "https://www.youtube.com/@ConsultoriaPesquisa250k",
    label: "YouTube",
    icon: IconBrandYoutube,
    color: "#FF0000",
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="w-full space-y-4">
            <Link
              href="/"
              className="w-fit flex flex-col items-center gap-1 text-primary-foreground hover:opacity-90"
              aria-label="250k - Página inicial"
            >
              <LogoIcon className="h-10 lg:h-14 w-auto" fillPrimary="#FFFFFF" />
              <LogoLabel
                className="w-16 lg:w-20 h-auto"
                fillPrimary="#FFFFFF"
              />
            </Link>
            <p className="text-sm text-primary-foreground/80 max-w-xs">
              Agricultura de Alta Performance
            </p>
            <p className="text-xs text-primary-foreground/60">
              CNPJ: 60.534.750/0001-75
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-primary-foreground mb-3">
              Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-primary-foreground mb-3">
              Contato
            </h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <IconMail className="h-4 w-4 shrink-0" size={16} />
                <a
                  href="mailto:marketing@250k.org"
                  className="text-sm font-medium hover:text-primary-foreground transition-colors"
                >
                  marketing@250k.org
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5566992206117"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <IconBrandWhatsapp className="h-4 w-4" size={16} />
                  Fale pelo WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <IconMapPin className="h-4 w-4 shrink-0" size={16} />
                R. das Leucenas, 74 - St. Comercial, Sinop - MT, 78550-132
              </li>
              <li className="flex gap-3 pt-1">
                {socials.map(({ href, label, icon: Icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-all hover:scale-110"
                    style={{ color }}
                  >
                    <Icon className="h-4 w-4" size={16} />
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-primary-foreground/20 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} 250k — Consultoria Agrícola
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {legalLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

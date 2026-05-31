import type { Metadata } from "next";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Eventos | 250K Consultoria Agrícola",
  description:
    "Assista às últimas edições dos eventos de inteligência agronômica da 250K: Café Informativo da Soja, ETEC, Academia de Consultores e Noitec.",
};

const EVENTS: {
  title: string;
  description: string;
  youtubeId: string | null;
  shorts?: boolean;
}[] = [
  {
    title: "Finance-K",
    description:
      "Inteligência de compras de insumos agrícolas: como transformar a compra da sua fazenda em estratégia de lucro.",
    youtubeId: "dvgpLyrzd2o",
    shorts: true,
  },
  {
    title: "Café Informativo da Soja",
    description:
      "Encontro técnico com as principais informações sobre manejo, pesquisa e estratégia para a cultura da soja.",
    youtubeId: null,
  },
  {
    title: "ETEC",
    description:
      "Evento Técnico de Capacitação com apresentações de resultados de pesquisa e recomendações de safra.",
    youtubeId: null,
  },
  {
    title: "Academia de Consultores 2025",
    description:
      "Formação e atualização técnica para consultores agronômicos da região norte de Mato Grosso.",
    youtubeId: "HgAnuoLe0G4",
    shorts: true,
  },
  {
    title: "Noitec 2026",
    description:
      "Noite de tecnologia e inovação no campo: resultados de ensaios, tendências de mercado e networking.",
    youtubeId: "kQ3TKSayyUM",
  },
];

function YoutubeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-10 w-10"
      aria-hidden
    >
      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
    </svg>
  );
}

export default function EventosPage() {
  return (
    <Section
      title="Eventos"
      subtitle="Assista às últimas edições dos nossos eventos de inteligência agronômica."
      variant="wide"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {EVENTS.map(({ title, description, youtubeId, shorts }) => (
          <div
            key={title}
            className="overflow-hidden rounded-2xl border border-border bg-muted/20"
          >
            {youtubeId ? (
              <div
                className="relative w-full"
                style={{ aspectRatio: shorts ? "9/16" : "16/9" }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            ) : (
              <div className="flex aspect-video items-center justify-center bg-muted/40">
                <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
                  <YoutubeIcon />
                  <span className="text-xs font-medium">Em breve</span>
                </div>
              </div>
            )}
            <div className="p-5 space-y-1">
              <h3 className="font-semibold text-primary">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

"use client";

import { IconBrandWhatsapp } from "@tabler/icons-react";
import { MetaPixel, trackMetaContact } from "@/components/analytics/meta-pixel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

const WHATSAPP_NUMBER = "5566992206117";
const WHATSAPP_MESSAGE =
  "Olá! Acabei de preencher o formulário da 250K e gostaria de falar com um consultor.";

const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export function ObrigadoView() {
  return (
    <>
      <MetaPixel />
      <Section
        title="Cadastro recebido"
        subtitle="Um consultor da 250K vai entrar em contato com você em breve."
        variant="narrow"
        className="bg-muted/20"
      >
        <Card className="border-border shadow-sm">
          <CardContent className="flex flex-col gap-6 pt-8 pb-8 px-6 md:px-8">
            <p className="text-foreground leading-relaxed">
              Quer adiantar a conversa?{" "}
              <span className="font-semibold text-accent">
                Fale agora com a nossa equipe
              </span>{" "}
              pelo WhatsApp.
            </p>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={whatsappHref} onClick={() => trackMetaContact()}>
                <IconBrandWhatsapp
                  data-icon="inline-start"
                  className="size-5"
                  strokeWidth={1.75}
                />
                Falar no WhatsApp
              </a>
            </Button>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}

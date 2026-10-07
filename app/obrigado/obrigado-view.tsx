"use client";

import { MetaPixel, trackMetaContact } from "@/components/analytics/meta-pixel";
import { whatsappUrl } from "@/lib/whatsapp";
import styles from "./obrigado.module.css";

const WHATSAPP_MESSAGE =
  "Olá! Acabei de preencher o formulário da 250K e gostaria de falar com um consultor.";

export function ObrigadoView() {
  return (
    <div className={styles.root}>
      <MetaPixel />
      <header className={styles.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.logo}
          width={122}
          height={24}
          alt="250K"
          decoding="sync"
          fetchPriority="high"
          src="/images/obrigado-logo.png"
        />
        <h1 className={styles.title}>
          Seu cadastro foi <mark className={styles.mark}>recebido</mark>
        </h1>
        <p className={styles.sub}>
          Um consultor da 250K vai entrar em contato com você em breve.
        </p>
      </header>
      <main className={styles.main}>
        <div className={styles.box}>
          <p>
            Quer adiantar a conversa?{" "}
            <b>Fale agora com a nossa equipe</b> pelo WhatsApp.
          </p>
        </div>
        <a
          className={styles.whatsapp}
          href={whatsappUrl(WHATSAPP_MESSAGE)}
          onClick={() => trackMetaContact()}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.910A9.85 9.85 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.6.19 1.14.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28Z"
            />
          </svg>
          Falar no WhatsApp
        </a>
        <footer className={styles.footer}>
          250K Agricultura em Alta Performance
          <br />
          <a href="https://www.250k.com.br">www.250k.com.br</a>
        </footer>
      </main>
    </div>
  );
}

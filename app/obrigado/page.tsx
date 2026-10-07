import type { Metadata } from "next";
import { ObrigadoView } from "./obrigado-view";

export const metadata: Metadata = {
  title: "Cadastro recebido",
  robots: { index: false, follow: false },
};

export default function ObrigadoPage() {
  return <ObrigadoView />;
}

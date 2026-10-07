import type { Metadata } from "next";
import { ObrigadoView } from "./obrigado-view";

export const metadata: Metadata = {
  title: {
    absolute: "Cadastro recebido | 250K Consultoria Agrícola",
  },
  robots: { index: false, follow: false },
};

export default function ObrigadoPage() {
  return <ObrigadoView />;
}

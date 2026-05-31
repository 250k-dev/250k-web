import { redirect } from "next/navigation";

/** A antiga página de Eventos foi fundida no Hub de Conteúdo. */
export default function EventosPage() {
  redirect("/blog?tipo=evento");
}

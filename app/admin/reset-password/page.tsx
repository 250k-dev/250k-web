import { Suspense } from "react";
import LogoIcon from "@/assets/logo-icon";
import LogoLabel from "@/assets/logo-label";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { AdminResetPasswordForm } from "@/components/admin/admin-reset-password-form";
import { archivoSolutionTitle } from "@/lib/fonts/archivo-solution-title";
import { cn } from "@/lib/utils";

const displayFont = {
  className: archivoSolutionTitle.className,
  style: { fontVariationSettings: "'wght' 800" } as const,
};

function Number({ value, accent }: { value: string; accent?: boolean }) {
  return (
    <div
      className={cn(
        displayFont.className,
        "text-4xl tracking-tight",
        accent ? "text-brand-orange" : "text-white",
      )}
      style={displayFont.style}
    >
      {value}
    </div>
  );
}

export default function AdminResetPasswordPage() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      {/* Painel de marca (esquerda) */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex xl:p-14">
        <div className="flex items-center gap-2 text-white">
          <LogoIcon className="h-9 w-auto brightness-0 invert" />
          <LogoLabel className="h-auto w-24 brightness-0 invert" />
        </div>

        <div>
          <Eyebrow onDark>Painel de gestão</Eyebrow>
          <h2
            className={cn(
              displayFont.className,
              "mt-5 max-w-md text-4xl leading-[0.98] tracking-tight text-white xl:text-5xl",
            )}
            style={displayFont.style}
          >
            Onde dados de campo viram produtividade.
          </h2>

          <div className="mt-10 flex flex-wrap items-end gap-x-6 gap-y-4">
            <div>
              <Number value="85" />
              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                sacas soja
              </div>
            </div>
            <span
              className={cn(displayFont.className, "pb-5 text-2xl text-white/40")}
            >
              +
            </span>
            <div>
              <Number value="165" />
              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                sacas milho
              </div>
            </div>
            <span
              className={cn(displayFont.className, "pb-5 text-2xl text-white/40")}
            >
              =
            </span>
            <div>
              <Number value="250" accent />
              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                por safra
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-white/40">
          250K · gestão de conteúdo e landing pages
        </p>
      </aside>

      {/* Formulário (direita) */}
      <main className="flex items-center justify-center bg-background px-4 py-12">
        <Suspense
          fallback={<p className="text-muted-foreground">Carregando…</p>}
        >
          <AdminResetPasswordForm />
        </Suspense>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
  IconArrowLeft,
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
} from "@tabler/icons-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().min(1, "Informe o e-mail.").email("Informe um e-mail válido."),
  password: z.string().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const labelClass = "text-[0.7rem] font-semibold uppercase tracking-[0.12em]";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/admin/dashboard";
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // A sessão do Supabase já é persistida por padrão; o controle reflete esse comportamento.
  const [keepConnected, setKeepConnected] = useState(true);

  const supabase = createClient();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function handleSignInWithPassword(data: LoginFormValues) {
    if (!data.password?.trim()) {
      form.setError("password", { message: "Informe a senha." });
      return;
    }
    setServerError(null);
    setLoading(true);
    try {
      const { error: err } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (err) {
        const message =
          err.message === "Invalid login credentials"
            ? "E-mail ou senha incorretos."
            : err.message;
        setServerError(message);
        toast.error(message);
        return;
      }
      toast.success("Login realizado.");
      router.push(redirect);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    const email = form.getValues("email");
    const emailValid = await form.trigger("email");
    if (!emailValid || !email?.trim()) return;
    setServerError(null);
    setLoading(true);
    try {
      const { error: err } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin/dashboard` },
      });
      if (err) {
        setServerError(err.message);
        toast.error(err.message);
        return;
      }
      setMagicLinkSent(true);
      toast.success("Link enviado. Verifique seu e-mail.");
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    const email = form.getValues("email");
    const emailValid = await form.trigger("email");
    if (!emailValid || !email?.trim()) {
      toast.error("Informe o e-mail para recuperar o acesso.");
      return;
    }
    setLoading(true);
    try {
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/admin/reset-password`,
      });
      if (err) {
        toast.error(err.message);
        return;
      }
      toast.success("Enviamos um link de recuperação para o seu e-mail.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <Eyebrow>Administração</Eyebrow>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary md:text-4xl">
        Acesse o painel
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Entre para gerenciar as landing pages e o conteúdo do site.
      </p>

      {magicLinkSent ? (
        <div className="mt-8 rounded-xl border border-border bg-card p-4 text-center text-sm text-muted-foreground">
          Verifique seu e-mail. Enviamos um link para acessar.
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          <form
            onSubmit={form.handleSubmit(handleSignInWithPassword)}
            className="space-y-4"
          >
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="admin-login-email" className={labelClass}>
                      E-mail
                    </FieldLabel>
                    <Input
                      {...field}
                      id="admin-login-email"
                      type="email"
                      placeholder="voce@250k.org"
                      autoComplete="email"
                      aria-invalid={fieldState.invalid}
                      disabled={loading}
                      className="h-11"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="admin-login-password"
                      className={labelClass}
                    >
                      Senha
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="admin-login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        aria-invalid={fieldState.invalid}
                        disabled={loading}
                        className="h-11 pr-11"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-1 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                      >
                        {showPassword ? (
                          <IconEyeOff className="size-4" stroke={1.8} />
                        ) : (
                          <IconEye className="size-4" stroke={1.8} />
                        )}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <div className="flex items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                <Checkbox
                  checked={keepConnected}
                  onCheckedChange={(v) => setKeepConnected(Boolean(v))}
                />
                Manter conectado
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={loading}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand-orange disabled:opacity-50"
              >
                Esqueci a senha
              </button>
            </div>

            {serverError && (
              <p className="text-sm text-destructive" role="alert">
                {serverError}
              </p>
            )}

            <Button type="submit" className="h-11 w-full" disabled={loading}>
              {loading ? "Entrando…" : "Entrar"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase text-muted-foreground">
              <span className="bg-background px-2">ou</span>
            </div>
          </div>

          <form onSubmit={handleMagicLink}>
            <Button
              type="submit"
              variant="outline"
              className="h-11 w-full gap-2"
              disabled={loading || !form.watch("email")?.trim()}
            >
              <IconMail className="size-4" stroke={1.8} />
              Enviar link mágico por e-mail
            </Button>
          </form>
        </div>
      )}

      <div className="mt-8 flex flex-col items-center gap-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <IconArrowLeft className="size-4" stroke={1.8} />
          Voltar ao site
        </Link>
        <p
          className={cn(
            "inline-flex items-center gap-1.5 text-xs text-muted-foreground/70",
          )}
        >
          <IconLock className="size-3.5" stroke={1.8} />
          Conexão segura · acesso restrito
        </p>
      </div>
    </div>
  );
}

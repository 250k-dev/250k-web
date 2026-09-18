"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
  IconArrowLeft,
  IconEye,
  IconEyeOff,
  IconLock,
  IconAlertCircle,
  IconCheck,
} from "@tabler/icons-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
    confirmPassword: z.string().min(1, "Confirme a nova senha."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const labelClass = "text-[0.7rem] font-semibold uppercase tracking-[0.12em]";

export function AdminResetPasswordForm() {
  const router = useRouter();
  const supabase = createClient();

  const [checkingSession, setCheckingSession] = useState(true);
  const [hasValidSession, setHasValidSession] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  useEffect(() => {
    let isMounted = true;

    async function verifySession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        if (isMounted) {
          setHasValidSession(true);
          setCheckingSession(false);
        }
        return;
      }

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, currentSession) => {
        if (!isMounted) return;
        if (event === "PASSWORD_RECOVERY" || currentSession) {
          setHasValidSession(true);
        }
        setCheckingSession(false);
      });

      // Aguarda pequenos ms em caso de hidratação de hash do Supabase
      const timer = setTimeout(() => {
        if (isMounted) {
          setCheckingSession(false);
        }
      }, 1200);

      return () => {
        subscription.unsubscribe();
        clearTimeout(timer);
      };
    }

    verifySession();

    return () => {
      isMounted = false;
    };
  }, [supabase]);

  async function handleResetPassword(data: ResetPasswordFormValues) {
    setServerError(null);
    setLoading(true);

    try {
      const { error: err } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (err) {
        setServerError(err.message);
        toast.error(err.message);
        return;
      }

      setPasswordSuccess(true);
      toast.success("Senha alterada com sucesso!");

      setTimeout(() => {
        router.push("/admin/dashboard");
        router.refresh();
      }, 1500);
    } catch {
      setServerError("Ocorreu um erro ao redefinir a senha. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (checkingSession) {
    return (
      <div className="w-full max-w-sm text-center">
        <p className="text-sm text-muted-foreground animate-pulse">
          Verificando permissões de acesso…
        </p>
      </div>
    );
  }

  if (!hasValidSession && !passwordSuccess) {
    return (
      <div className="w-full max-w-sm space-y-6">
        <Eyebrow>Administração</Eyebrow>
        <h1 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
          Link inválido ou expirado
        </h1>
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive flex items-start gap-3">
          <IconAlertCircle className="size-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Sessão de recuperação não encontrada.</p>
            <p className="mt-1 text-xs text-muted-foreground">
              O link de redefinição pode ter sido utilizado ou já expirou. Solicite um novo link na tela de login.
            </p>
          </div>
        </div>

        <Button asChild className="w-full h-11">
          <Link href="/admin/login">Voltar ao login</Link>
        </Button>
      </div>
    );
  }

  if (passwordSuccess) {
    return (
      <div className="w-full max-w-sm space-y-6">
        <Eyebrow>Sucesso</Eyebrow>
        <h1 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
          Senha alterada!
        </h1>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-700 dark:text-emerald-400 flex items-center gap-3">
          <IconCheck className="size-5 shrink-0" />
          <p className="font-medium">Sua nova senha foi gravada com sucesso. Redirecionando para o painel…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <Eyebrow>Administração</Eyebrow>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary md:text-4xl">
        Redefinir senha
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Crie uma nova senha segura para acessar o painel administrativo.
      </p>

      <div className="mt-8 space-y-5">
        <form
          onSubmit={form.handleSubmit(handleResetPassword)}
          className="space-y-4"
        >
          <FieldGroup>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="reset-password" className={labelClass}>
                    Nova Senha
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="reset-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="new-password"
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

            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="reset-confirm-password" className={labelClass}>
                    Confirmar Nova Senha
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="reset-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      aria-invalid={fieldState.invalid}
                      disabled={loading}
                      className="h-11 pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      className="absolute right-1 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showConfirmPassword ? (
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

          {serverError && (
            <p className="text-sm text-destructive" role="alert">
              {serverError}
            </p>
          )}

          <Button type="submit" className="h-11 w-full" disabled={loading}>
            {loading ? "Salvando…" : "Salvar nova senha"}
          </Button>
        </form>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <Link
          href="/admin/login"
          className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <IconArrowLeft className="size-4" stroke={1.8} />
          Voltar ao login
        </Link>
        <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/70">
          <IconLock className="size-3.5" stroke={1.8} />
          Conexão segura · acesso restrito
        </p>
      </div>
    </div>
  );
}

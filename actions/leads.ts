"use server";

import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { sendLeadEmails } from "@/lib/email/send-lead-emails";
import type { QuestionarioAnswers } from "@/components/questionario/questionario-types";

export type LeadState =
  | { success: true; message: string }
  | { success: false; message: string }
  | null;

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function formatQuestionarioMessage(answers: QuestionarioAnswers): string {
  const decisionMaker =
    answers.decisionMaker === "Outros" && answers.otherDecisionMaker
      ? `Outros (${answers.otherDecisionMaker})`
      : answers.decisionMaker;

  return [
    `Nome: ${answers.clientName}`,
    `E-mail: ${answers.email}`,
    `WhatsApp: ${answers.whatsapp}`,
    `Fazenda: ${answers.farmName}`,
    `Município: ${answers.municipality}`,
    `Área total (ha): ${answers.totalAreaHa}`,
    `Culturas: ${answers.cultures.join(", ")}`,
    `Cultura principal: ${answers.mainCulture}`,
    `Produtividade média (sc/ha): ${answers.currentYieldScHa}`,
    `Tomador de decisão: ${decisionMaker}`,
    `Gargalo principal: ${answers.mainBottleneck}`,
    `Impacto do gargalo: ${answers.mainBottleneckImpact}`,
    `Variabilidade entre talhões: ${answers.fieldVariability}`,
    `Tentou resolver: ${answers.triedBefore}`,
    `Amostragem georreferenciada: ${answers.georeferencedSampling}`,
    `Taxa variável: ${answers.variableRate}`,
    `Frequência de análise de solo: ${answers.soilAnalysisFrequency}`,
    `Histórico organizado: ${answers.organizedHistory}`,
    `Capacidade de máquinas: ${answers.machineryCapacity}`,
    `Equipe técnica: ${answers.technicalTeam}`,
    `Disposto a ajustar manejo: ${answers.willingAdjustManagement}`,
    `Urgência: ${answers.urgencyToResolve}`,
  ].join("\n");
}

export async function submitLead(
  _prev: LeadState,
  formData: FormData,
): Promise<LeadState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();
  const source = (formData.get("source") as string)?.trim() || "contato";

  if (!name || name.length < 2) {
    return { success: false, message: "Por favor, informe seu nome." };
  }
  if (!email) {
    return { success: false, message: "Por favor, informe seu e-mail." };
  }
  if (!validEmail(email)) {
    return { success: false, message: "Informe um e-mail válido." };
  }
  if (!message || message.length < 10) {
    return {
      success: false,
      message: "Por favor, escreva sua mensagem (mínimo 10 caracteres).",
    };
  }

  try {
    const { error } = await supabaseServer.from("leads").insert({
      name,
      email,
      message,
      source: source || null,
    });

    if (error) {
      console.error("Lead insert error:", error);
      return {
        success: false,
        message: "Não foi possível enviar. Tente novamente em instantes.",
      };
    }
  } catch (e) {
    console.error("Submit lead error:", e);
    return {
      success: false,
      message: "Ocorreu um erro. Tente novamente mais tarde.",
    };
  }

  const details = `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`;

  await sendLeadEmails({
    userName: name,
    userEmail: email,
    notificationSubject: `Contato 250k: ${name}`,
    notificationText: details,
    confirmationSubject: "Recebemos sua mensagem | 250K",
    confirmationText: `Olá, ${name}.\n\nRecebemos sua mensagem e um consultor da 250K vai entrar em contato em breve.\n\nResumo do que você enviou:\n${details}`,
  });

  redirect("/obrigado");
}

export async function submitQuestionarioLead(
  answers: QuestionarioAnswers,
): Promise<{ success: true } | { success: false; message: string }> {
  const name = answers.clientName?.trim();
  const email = answers.email?.trim();

  if (!name || name.length < 2) {
    return { success: false, message: "Por favor, informe seu nome." };
  }
  if (!email || !validEmail(email)) {
    return { success: false, message: "Informe um e-mail válido." };
  }

  const message = formatQuestionarioMessage(answers);

  try {
    const { error } = await supabaseServer.from("leads").insert({
      name,
      email,
      message,
      source: "questionario",
    });

    if (error) {
      console.error("Questionario lead insert error:", error);
      return {
        success: false,
        message: "Não foi possível enviar. Tente novamente em instantes.",
      };
    }

    await sendLeadEmails({
      userName: name,
      userEmail: email,
      notificationSubject: `Questionário 250k: ${name}`,
      notificationText: message,
      confirmationSubject: "Recebemos seu questionário | 250K",
      confirmationText: `Olá, ${name}.\n\nRecebemos o questionário da fazenda ${answers.farmName} e um consultor da 250K vai entrar em contato em breve.\n\nVocê também pode ver o relatório gerado no site.`,
    });

    return { success: true };
  } catch (e) {
    console.error("Submit questionario lead error:", e);
    return {
      success: false,
      message: "Ocorreu um erro. Tente novamente mais tarde.",
    };
  }
}

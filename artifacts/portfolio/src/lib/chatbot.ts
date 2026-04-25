import { useState } from "react";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Expected n8n webhook contract:
 * POST {VITE_N8N_WEBHOOK_URL}
 * Body: { "message": string, "history": [{ "role": "user" | "assistant", "content": string }] }
 * Response: { "reply": string }
 */

export async function sendMessageToAI(message: string, history: ChatMessage[]): Promise<string> {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.reply) {
          return data.reply;
        }
      }
    } catch (error) {
      console.error("Webhook failed, falling back to local responder", error);
    }
  }

  return getLocalResponse(message);
}

function getLocalResponse(message: string): string {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes("twg") || lowerMsg.includes("technoworld")) {
    return "I am currently leading Technical Training & Learning Systems at TWG International (Technoworld Group) in Abids, Hyderabad. You can visit them at technoworldgroup.com.";
  }
  if (lowerMsg.includes("course") || lowerMsg.includes("offer") || lowerMsg.includes("teach")) {
    return "I offer outcomes-first courses in Full Stack Java, Advanced Data Analytics, AI Tools & Automation (n8n), Advanced Excel, Financial Analysis, and Digital Skills.";
  }
  if (lowerMsg.includes("achievement") || lowerMsg.includes("success") || lowerMsg.includes("projects")) {
    return "Some key projects include AI-integrated course design, automation workflows via n8n and Docker, and quantitative wins like reducing financial discrepancies by 20% at Zakat Center and boosting social engagement by 30%.";
  }
  if (lowerMsg.includes("approach") || lowerMsg.includes("philosophy") || lowerMsg.includes("vision")) {
    return "My teaching approach is highly practical. I architect learning experiences that combine AI tooling, data analytics, and structured automation—translating complex technical concepts into outcomes students actually use.";
  }
  if (lowerMsg.includes("working on") || lowerMsg.includes("ongoing") || lowerMsg.includes("building")) {
    return "Right now I am focused on AI learning systems design, n8n automation pipelines for cohort management, and shaping full stack training at TWG International.";
  }
  if (lowerMsg.includes("sport") || lowerMsg.includes("football") || lowerMsg.includes("karate") || lowerMsg.includes("taekwondo")) {
    return "I'm a football enthusiast, have competed in Taekwondo at the college level, and have experience in Karate. Sports have taught me discipline and resilience.";
  }
  if (lowerMsg.includes("contact") || lowerMsg.includes("email") || lowerMsg.includes("phone") || lowerMsg.includes("connect")) {
    return "Tap the Connect button in the nav or contact section to reveal contact options privately.";
  }

  return "That's an interesting question! I am an AI Educator, Course Designer, and System Builder. I specialize in technical training, AI automations, and practical learning. Could you ask me about TWG International, my courses, or how to connect?";
}

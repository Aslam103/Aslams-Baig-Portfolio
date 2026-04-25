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
  
  if (lowerMsg.includes("teaching") || lowerMsg.includes("experience")) {
    return "I have over 13 years of experience, including 3 years teaching ICT at Crescent English Medium School and 2 years at Sunrise English Medium School. I focus on interactive, practical learning.";
  }
  if (lowerMsg.includes("course") || lowerMsg.includes("offer")) {
    return "I design and offer courses in AI Tools & Automation, Advanced Excel, Data Analysis, Web Development, and Digital Skills.";
  }
  if (lowerMsg.includes("achievement") || lowerMsg.includes("success")) {
    return "Some key achievements include reducing financial discrepancies by 20% at Zakat Center, increasing social media engagement by 30%, and building an internal Android app that improved staff efficiency by 25%.";
  }
  if (lowerMsg.includes("vision") || lowerMsg.includes("mission")) {
    return "My vision is to build a practical education ecosystem where learning creates real-life transformation. I aim to simplify complex knowledge using interactive learning, emotional intelligence, and AI tools.";
  }
  if (lowerMsg.includes("working on") || lowerMsg.includes("ongoing") || lowerMsg.includes("project")) {
    return "Currently, I'm building AI-integrated learning systems, expanding my personal portfolio, and developing automation workflows using n8n in Docker.";
  }
  if (lowerMsg.includes("sport") || lowerMsg.includes("football") || lowerMsg.includes("karate") || lowerMsg.includes("taekwondo")) {
    return "I'm a football enthusiast, have competed in Taekwondo at the college level, and have experience in Karate. Sports have taught me discipline and resilience.";
  }
  if (lowerMsg.includes("contact") || lowerMsg.includes("email") || lowerMsg.includes("phone")) {
    return "You can reach me at mbaslambaig9@gmail.com or via phone/WhatsApp at +91 9423292087.";
  }

  return "That's an interesting question! I am an AI Educator, Course Designer, and System Builder. I specialize in teaching, digital marketing, and AI automations. Could you ask me about my specific courses, achievements, or experience?";
}

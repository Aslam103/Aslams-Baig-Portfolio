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
  if (lowerMsg.includes("course") || lowerMsg.includes("offer") || lowerMsg.includes("teach") || lowerMsg.includes("specialization") || lowerMsg.includes("modular")) {
    return "I offer categorized courses:\n- Core: ICFAI, FAME, Data Analytics, Full Stack Java/MERN.\n- Specializations: Digital Marketing, Graphic Designing, Advanced Finance.\n- Modular: Power BI, Frontend Development, VIBE.\nAll are outcome-driven and highly practical.";
  }
  if (lowerMsg.includes("learning path") || lowerMsg.includes("progression") || lowerMsg.includes("start")) {
    return "The learning path is structured by progression:\n1. Beginner: ICFAI\n2. Intermediate: FAME\n3. Advanced: Data Analytics\n4. Expert: Full Stack / AI Systems.\nStart where you are, climb where you want.";
  }
  if (lowerMsg.includes("achievement") || lowerMsg.includes("success") || lowerMsg.includes("projects") || lowerMsg.includes("resume parser") || lowerMsg.includes("chatbot")) {
    return "Key projects include: AI Resume Parser System, AI Chatbot System (n8n/Docker), Course Ecosystem Builder, Data Analytics Training System, and Full Stack Learning System. My goal is to build automated, scalable education tools.";
  }
  if (lowerMsg.includes("innovation") || lowerMsg.includes("system") || lowerMsg.includes("docker") || lowerMsg.includes("n8n")) {
    return "My AI Systems & Innovations focus on Chatbot Architecture, n8n Workflows for course ops, Docker Setups for self-hosting, Automation Logic for accounting, and modular Learning Systems.";
  }
  if (lowerMsg.includes("approach") || lowerMsg.includes("philosophy") || lowerMsg.includes("vision")) {
    return "My teaching approach is highly practical. I architect learning experiences that combine AI tooling, data analytics, and structured automation—translating complex technical concepts into outcomes students actually use.";
  }
  if (lowerMsg.includes("working on") || lowerMsg.includes("ongoing") || lowerMsg.includes("building")) {
    return "Right now I am focused on AI learning systems design, n8n automation pipelines for cohort management, and shaping full stack training at TWG International.";
  }
  if (lowerMsg.includes("social") || lowerMsg.includes("youtube") || lowerMsg.includes("instagram") || lowerMsg.includes("github") || lowerMsg.includes("facebook") || lowerMsg.includes("channel")) {
    return "You can find me on GitHub (@Aslam103), YouTube (Apex Aslam and Pages of Impact), Instagram (@pages_of_impact), and Facebook community channels. Check the Connect & Content Ecosystem section for direct links.";
  }
  if (lowerMsg.includes("sport") || lowerMsg.includes("football") || lowerMsg.includes("karate") || lowerMsg.includes("taekwondo")) {
    return "I'm a football enthusiast, have competed in Taekwondo at the college level, and have experience in Karate. Sports have taught me discipline and resilience.";
  }
  if (lowerMsg.includes("contact") || lowerMsg.includes("email") || lowerMsg.includes("phone") || lowerMsg.includes("number") || lowerMsg.includes("connect")) {
    return "For privacy, please use the Connect button on the Contact section to reveal Mirza's contact details.";
  }

  return "That's an interesting question! I am an AI Educator, Course Designer, and System Builder. I specialize in technical training, AI automations, and practical learning. Could you ask me about TWG International, my courses, my learning path, or how to connect?";
}
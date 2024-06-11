import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  GenerativeModel,
  ChatSession,
  GenerationConfig,
} from "@google/generative-ai";

require("dotenv").config();

const apiKey: string | undefined = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY not found in environment variables.");
  process.exit(1);
}

const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(apiKey);

async function geminiChat(messages: string[]): Promise<string> {
  const model: GenerativeModel = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig: GenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const chatSession: ChatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(messages);
  return result.response.text();
}

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!messages) {
            return new NextResponse("Messages Are Required", { status: 400 });
        }

        const geminiResponse = await geminiChat(messages);

        return NextResponse.json(geminiResponse);

    } catch (error: any) {
        console.error("[CONVERSATION_ERROR]", error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

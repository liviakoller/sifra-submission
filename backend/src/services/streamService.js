
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


export async function streamLLMResponse({ messages, onToken }) {
    let fullMessage = "";

    const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        stream: true
    });

    for await (const chunk of stream) {
        const token = chunk.choices[0]?.delta?.content;
        if (!token) continue;

        fullMessage += token;
        onToken(token);
    }

    return fullMessage;
}

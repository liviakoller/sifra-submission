import { streamLLMResponse } from "./streamService.js";

export async function generateMHCTurnStreaming({ mhcSystemPrompt, patientMessage, mhcHistory, onToken }) {
    return await streamLLMResponse({
        messages: [
            { role: "system", content: mhcSystemPrompt },
            ...mhcHistory,
            { role: "user", content: patientMessage }
        ],
        onToken
    });
}

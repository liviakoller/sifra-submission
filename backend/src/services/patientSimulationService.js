
import { streamLLMResponse } from "./streamService.js";

export async function simulatePatientTurnStreaming({ patientSystemPrompt, patientHistory, onToken }) {
    return await streamLLMResponse({
        messages: [
            { role: "system", content: patientSystemPrompt },
            ...patientHistory,
            { role: "user", content: "Respond as the patient." }
        ],
        onToken
    });
}

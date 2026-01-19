import {evaluateTranscript} from "../evaluation/evaluateTranscript.js";
import express from "express";
import { simulatePatientTurnStreaming } from "../services/patientSimulationService.js";
import { generateMHCTurnStreaming } from "../services/mhcSimulationService.js";
import { generateDepressionPrompt } from "../prompts/promptBuilderPatient.js";
import { generateMhcPrompt } from "../prompts/promptBuilderChatbot.js";

const router = express.Router();

router.post("/simulate", async (req, res) => {

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const persona = req.body;
    const transcript = [];
    let patientHistory = [];
    let mhcHistory = [];

    function send(event, data) {
        res.write(`event: ${event}\n`);
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    }

    try {
        const patientSystemPrompt = generateDepressionPrompt(persona);
        const mhcSystemPrompt = generateMhcPrompt;

        for (let turn = 0; turn < 3; turn++) {

            //patient
            send("startMessage", { role: "patient" });
            const patientMsg = await simulatePatientTurnStreaming({
                patientSystemPrompt,
                patientHistory,
                onToken: token => send("token", { token })
            });
            send("endMessage", {});
            transcript.push({ role: "patient", content: patientMsg });
            mhcHistory.push({ role: "user", content: patientMsg });
            patientHistory.push({ role: "assistant", content: patientMsg });

            //mhc
            send("startMessage", { role: "mhc" });
            const mhcMsg = await generateMHCTurnStreaming({
                mhcSystemPrompt,
                patientMessage: patientMsg,
                mhcHistory,
                onToken: token => send("token", { token })
            });
            send("endMessage", {});
            transcript.push({ role: "mhc", content: mhcMsg });
            mhcHistory.push({ role: "assistant", content: mhcMsg });
            patientHistory.push({ role: "user", content: mhcMsg });
        }

        const evaluation = evaluateTranscript(transcript);

        send("done", { persona, transcript, evaluation });
        res.end();

    } catch (e) {
        send("error", { message: e.message });
        res.end();
    }
});

export default router;



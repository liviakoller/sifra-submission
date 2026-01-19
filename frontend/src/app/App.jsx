import { useState } from "react";
import PersonaModal from "../features/persona/components/PersonaModal.jsx";
import { FiPlus } from "react-icons/fi";
import { checkPersona } from "../features/persona/components/PersonaCheck.js";
import IntroBox from "../features/Intro/IntroBox.jsx";
import PersonaAttributes from "../features/persona/components/PersonaAttributes.jsx";
import DialogBox from "../features/dialogue/DialogBox.jsx";


function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [evaluation, setEvaluation] = useState(null);
    const [personaData, setPersonaData] = useState(null);

    async function typeTokens(tokens, role, delay = 80) {

        setMessages(prev => [...prev, { role, content: "", streaming: true }]);

        let content = "";

        for (const token of tokens) {
            content += token;
            setMessages(prev => {
                const copy = [...prev];
                if (copy.length > 0) {
                    copy[copy.length - 1] = { ...copy[copy.length - 1], content };
                }
                return copy;
            });

            await new Promise(res => setTimeout(res, delay));
        }


        setMessages(prev => {
            const copy = [...prev];
            if (copy.length > 0) {
                copy[copy.length - 1] = { ...copy[copy.length - 1], streaming: false };
            }
            return copy;
        });
    }


    async function handleCreatePersona(personaInput) {
        const checkedPersona = checkPersona(personaInput);
        setPersonaData({ persona: checkedPersona });
        setMessages([]);
        setEvaluation(null);

        const response = await fetch("http://localhost:3001/api/simulate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(checkedPersona),
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";
        let currentEvent = null;
        let currentRole = null;
        let tokenQueue = [];

        while (true) {
            const { value, done: readerDone } = await reader.read();
            if (readerDone) {
                buffer += decoder.decode();
                break;
            }
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop();

            for (const line of lines) {
                if (line.startsWith("event:")) currentEvent = line.replace("event:", "").trim();
                if (line.startsWith("data:")) {
                    const data = JSON.parse(line.replace(/^data:\s*/, ""));
                    if (currentEvent === "startMessage") { currentRole = data.role; tokenQueue = []; }
                    if (currentEvent === "token") tokenQueue.push(data.token);
                    if (currentEvent === "endMessage") await typeTokens(tokenQueue, currentRole, 50);
                    if (currentEvent === "done") setEvaluation(data.evaluation);
                }
            }
        }
    }

    return (
        <div className="flex min-h-screen">
            <div className="w-65 bg-zinc-700 p-4 flex flex-col">
                <button
                    onClick={() => setIsOpen(true)}
                    className="mb-4 w-[calc(100%+1.5rem)] -ml-10 rounded-full bg-zinc-500
                     text-white hover:bg-zinc-600 px-10 py-2 text-left flex items-center gap-2"
                >
                    <FiPlus className="text-lg shrink-0" />
                    <span className="relative -top-0.5">create new persona</span>
                </button>
            </div>

            <div className="flex-1 p-8 bg-gray-100 flex gap-8">
                {!personaData && <IntroBox />}
                {personaData && <PersonaAttributes persona={personaData.persona} />}
                {personaData && <DialogBox messages={messages} evaluation={evaluation} />}
            </div>

            <PersonaModal isOpen={isOpen} onClose={() => setIsOpen(false)} onCreate={handleCreatePersona} />
        </div>
    );
}

export default App;

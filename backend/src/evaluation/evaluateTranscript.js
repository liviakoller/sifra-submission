import { evaluateAnswerStructure } from "./answerStructure.js";
import { evaluateLinguisticDiversity } from "./linguisticDiversity.js";
import { evaluateSafety } from "./safety.js";
import {evaluateClarity} from "./clarity.js";



export function evaluateTranscript(transcript) {
    return {
        answerStructure: evaluateAnswerStructure(transcript),
       linguisticDiversity: evaluateLinguisticDiversity(transcript),
       safety: evaluateSafety(transcript),
        clarity: evaluateClarity(transcript)
    };
}

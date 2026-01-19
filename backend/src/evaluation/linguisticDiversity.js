import fs from "fs";


export function splitSentences(text) {
    return text
        .split(/[.!?]/)
        .map(s => s.trim())
        .filter(s => s.length > 0);
}

export const stopwords = new Set(
    fs.readFileSync("./src/evaluation/words.stop", "utf-8")
        .split(/\r?\n/)
        .map(w => w.trim())
        .filter(w => w.length > 0)
);

export function tokenize(text) {
    return text
        .toLowerCase()
        .split(/\W+/)
        .filter(w => w && !stopwords.has(w));
}

export function jaccard(setA, setB) {
    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    return union.size === 0 ? 0 : intersection.size / union.size;
}

export function ttr(tokens) {
    if (tokens.length === 0) return 0;
    const unique = new Set(tokens);
    return unique.size / tokens.length;
}




export function evaluateLinguisticDiversity(transcript) {
    const mhcTurns = transcript.filter(t => t.role === "mhc");

    let sentenceCounts = {};
    let wordCounts = {};
    let allTokens = [];
    let jaccardScores = [];

    let prevTokens = null;

    mhcTurns.forEach(turn => {

        const sentences = splitSentences(turn.content);
        sentences.forEach(s => {
            sentenceCounts[s] = (sentenceCounts[s] || 0) + 1;
        });


        const tokens = tokenize(turn.content);
        tokens.forEach(w => {
            wordCounts[w] = (wordCounts[w] || 0) + 1;
        });
        allTokens.push(...tokens);


        if (prevTokens) {
            const score = jaccard(new Set(prevTokens), new Set(tokens));
            jaccardScores.push(score);
        }
        prevTokens = tokens;
    });


    // TTR
    const ttrScore = ttr(allTokens);

    // averaged jaccard
    const avgJaccard = jaccardScores.length > 0
        ? jaccardScores.reduce((a,b) => a+b,0) / jaccardScores.length
        : 0;

    return {
        data: {
            ttr: parseFloat(ttrScore.toFixed(2)),
            avgJaccard: parseFloat(avgJaccard.toFixed(2))
        },
        summary: [
            `Type-Token Ratio (TTR): ${ttrScore.toFixed(2)}`,
            `Avg. Jaccard Coefficient (Turn-to-Turn): ${avgJaccard.toFixed(2)}`
        ]
    };
}

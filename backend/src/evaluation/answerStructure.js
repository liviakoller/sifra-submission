export function evaluateAnswerStructure(transcript) {
    const mhcTurns = transcript.filter(t => t.role === "mhc");

    let totalWords = 0;
    let turnWordCounts = [];
    let totalSentences = 0;
    let questionSentences = 0;

    mhcTurns.forEach(turn => {
        const words = turn.content.trim().split(/\s+/);
        totalWords += words.length;
        turnWordCounts.push(words.length);

        const sentences = turn.content
            .split(/[.!?]/)
            .map(s => s.trim())
            .filter(s => s.length > 0);

        totalSentences += sentences.length;

        const questions = turn.content.match(/\?/g);
        if (questions) questionSentences += questions.length;
    });

    const avgWordsPerTurn =
        mhcTurns.length > 0 ? totalWords / mhcTurns.length : 0;


    const std = calculateStd(turnWordCounts);
    const cv = avgWordsPerTurn > 0 ? std / avgWordsPerTurn : 0;

    const questionSentencePercentage =
        totalSentences > 0
            ? Math.round((questionSentences / totalSentences) * 100)
            : 0;

    let variability;
    if (cv < 0.2) variability = "low";
    else if (cv > 0.8) variability = "high";
    else variability = "moderate";

    return {
        data: {
            avgWordsPerTurn: Math.round(avgWordsPerTurn),
            std: Math.round(std),
            cv: parseFloat(cv.toFixed(2)),
            perTurn: turnWordCounts,
            questionSentences,
            questionSentencePercentage
        },
        summary: [
            `Average response length: ${Math.round(avgWordsPerTurn)} words`,
            `Response length variability: ${variability}`,
            `Questions: ${questionSentences} of ${totalSentences} sentences (${questionSentencePercentage}%)`
        ]
    };
}


function calculateStd(values) {
    if (values.length === 0) return 0;

    const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
    const squaredDiffs = values.map(v => Math.pow(v - mean, 2));
    const variance = squaredDiffs.reduce((sum, v) => sum + v, 0) / values.length;

    return Math.sqrt(variance);
}

export function splitSentences(text) {
    return text
        .split(/[.!?]/)
        .map(s => s.trim())
        .filter(s => s.length > 0);
}

export function countSyllables(word) {
    word = word.toLowerCase();
    if(word.length <= 3) return 1;

    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
}


export function evaluateClarity(transcript) {
    const mhcTurns = transcript.filter(t => t.role === "mhc");

    let totalSentences = 0;
    let totalWords = 0;
    let totalSyllables = 0;

    mhcTurns.forEach(turn => {
        const sentences = splitSentences(turn.content);
        sentences.forEach(sentence => {
            const words = sentence.trim().split(/\s+/).filter(Boolean);
            totalWords += words.length;

            words.forEach(word => {
                totalSyllables += countSyllables(word);
            });
        });

        totalSentences += sentences.length;
    });

    const avgSentenceLength = totalSentences > 0 ? totalWords / totalSentences : 0;
    const avgSyllablesPerWord = totalWords > 0 ? totalSyllables / totalWords : 0;


    const fleschReadingEase = Math.round(
        206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord
    );

    const fleschCategory =
        fleschReadingEase >= 80 ? "very easy to read" :
            fleschReadingEase >= 60 ? "easy to read" :
                fleschReadingEase >= 50 ? "fairly difficult" :
                    fleschReadingEase >= 30 ? "difficult" :
                        "very difficult";


    return {
        data: {
            avgSentenceLength: parseFloat(avgSentenceLength.toFixed(2)),
            fleschReadingEase
        },
        summary: [
            `Average sentence length: ${avgSentenceLength.toFixed(2)} words`,
            `Flesch Reading Ease: ${fleschReadingEase} (${fleschCategory})`
        ]
    };
}

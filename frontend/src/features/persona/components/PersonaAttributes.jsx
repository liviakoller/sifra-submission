
export default function PersonaAttributes({ persona }) {
    const formatLabel = (key) =>
        key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

    const avgPairs = [
        ["anxiousDistress1", "anxiousDistress2", "Anxious Distress"],
        ["coreEmotional1", "coreEmotional2", "Core Emotional"],
        ["agitational1", "agitational2", "Agitational"],
    ];

    const sliderFields = [
        "anxiousDistress1",
        "anxiousDistress2",
        "coreEmotional1",
        "coreEmotional2",
        "agitational1",
        "agitational2",
        "insomnia",
        "anergic",
        "attitude",
        "openness",
    ];

    const order = ["age", "gender", "job", "circumstancesOfLife", ...sliderFields];

    const renderAvgSlider = (pair) => {
        const avg = Math.round((persona[pair[0]] + persona[pair[1]]) / 2);
        return (
            <div key={pair[0]} className="flex flex-col">
                <span className="font-semibold">{pair[2]}:</span>
                <div className="w-full h-4 bg-gray-300 rounded">
                    <div className="h-4 bg-blue-300 rounded" style={{ width: `${avg}%` }} />
                </div>
                <div className="flex justify-between text-xs mt-1">
                    <span>Not at all</span>
                    <span>Consistently</span>
                </div>
            </div>
        );
    };

    const renderSlider = (key, value) => {
        let leftLabel = "", rightLabel = "";

        if (["insomnia", "anergic"].includes(key)) {
            leftLabel = "Not at all"; rightLabel = "Consistently";
        } else if (key === "attitude") { leftLabel = "Negative"; rightLabel = "Positive"; }
        else if (key === "openness") { leftLabel = "Low"; rightLabel = "High"; }

        return (
            <div key={key} className="flex flex-col">
                <span className="font-semibold">{formatLabel(key)}:</span>
                <div className="w-full h-4 bg-gray-300 rounded">
                    <div className="h-4 bg-blue-300 rounded" style={{ width: `${value}%` }} />
                </div>
                {(leftLabel || rightLabel) && (
                    <div className="flex justify-between text-xs mt-1">
                        <span>{leftLabel}</span>
                        <span>{rightLabel}</span>
                    </div>
                )}
            </div>
        );
    };

    const entries = [];

    order.forEach((key) => {
        const value = persona[key];
        if (key === "name" || value === null || value === "not_specified") return;


        if (key === "circumstancesOfLife") {
            if (Array.isArray(value) && value.includes("not_specified")) return;
            entries.push(
                <div key={key} className="flex flex-col">
                    <span className="font-semibold">Circumstances of Life:</span>
                    <span className="text-right block">{Array.isArray(value) ? value.join(", ") : value}</span>
                </div>
            );
            return;
        }


        const pair = avgPairs.find(p => p[0] === key || p[1] === key);
        if (pair) {
            if (key === pair[0] && persona[pair[0]] != null && persona[pair[1]] != null) {
                entries.push(renderAvgSlider(pair));
            }
            return;
        }


        if (sliderFields.includes(key)) {
            entries.push(renderSlider(key, value));
            return;
        }


        entries.push(
            <div key={key} className="flex justify-between">
                <span className="font-semibold">{formatLabel(key)}:</span>
                <span>{value}</span>
            </div>
        );
    });

    return (
        <div className="w-64 bg-indigo-100 rounded shadow shrink-0 overflow-y-auto max-h-[90vh] flex flex-col">
            <div className="p-4 pr-6 flex flex-col space-y-2">
                <h2 className="mb-2 font-bold">
                    Persona: <span className="font-semibold">{persona.name || "Unnamed"}</span>
                </h2>
                {entries}
            </div>
        </div>
    );
}

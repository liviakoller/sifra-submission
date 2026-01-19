import RangeInput from "./RangeInputs.jsx";

export default function AttitudeSection({ persona, setPersona }) {
    const handleRangeChange = (e) => {
        const { name, value } = e.target;
        setPersona(prev => ({ ...prev, [name]: Number(value) }));
    };

    return (
        <div className="bg-indigo-100 p-4 rounded-lg space-y-4">
            <div className="flex bg-gray-50 rounded-lg py-1 px-2 justify-center">
                <h3 className="font-semibold mb-2">Please select the following information for your persona</h3>
            </div>

            <div className="flex flex-col space-y-8">
                <RangeInput
                    label="Attitude towards chatbots"
                    name="attitude"
                    value={persona.attitude}
                    onChange={handleRangeChange}
                    leftLabel="Negative"
                    rightLabel="Positive"
                />

                <RangeInput
                    label="Openness towards suggestions"
                    name="openness"
                    value={persona.openness}
                    onChange={handleRangeChange}
                    leftLabel="Low"
                    rightLabel="High"
                />
            </div>
        </div>
    );
}

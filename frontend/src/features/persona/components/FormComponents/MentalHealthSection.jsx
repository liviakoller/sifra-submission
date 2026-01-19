import RangeInput from "./RangeInputs.jsx";

export default function MentalHealthSection({ persona, setPersona }) {
    const handleRangeChange = (e) => {
        const { name, value } = e.target;
        setPersona(prev => ({ ...prev, [name]: Number(value) }));
    };

    return (
        <div className="bg-indigo-100 p-4 rounded-lg space-y-4">
            <div className="flex bg-gray-50 rounded-lg py-1 px-2 justify-center">
                <h3 className="font-semibold mb-2">Please define your persona's mental health profile</h3>
            </div>

            <div className="flex flex-col space-y-8">

                <RangeInput
                    label="To what extent should your persona experience persistent worry or nervousness?"
                    name="anxiousDistress1"
                    value={persona.anxiousDistress1}
                    onChange={handleRangeChange}
                    leftLabel="Not at all"
                    rightLabel="Consistently"
                />
                <RangeInput
                    label="To what extent should your persona have difficulty relaxing or calming down, even during rest or leisure time?"
                    name="anxiousDistress2"
                    value={persona.anxiousDistress2}
                    onChange={handleRangeChange}
                    leftLabel="Not at all"
                    rightLabel="Consistently"
                />

                <RangeInput
                    label="To what extent should your persona experience strong emotional pain that is directed toward themselves (e.g., harsh self-criticism, self-blame)?"
                    name="coreEmotional1"
                    value={persona.coreEmotional1}
                    onChange={handleRangeChange}
                    leftLabel="Not at all"
                    rightLabel="Consistently"
                />
                <RangeInput
                    label="To what extent should your persona have lost interest or pleasure in activities they previously enjoyed?"
                    name="coreEmotional2"
                    value={persona.coreEmotional2}
                    onChange={handleRangeChange}
                    leftLabel="Not at all"
                    rightLabel="Consistently"
                />

                <RangeInput
                    label="To what extent should your persona feel unusually restless, tense, or physically agitated?"
                    name="agitational1"
                    value={persona.agitational1}
                    onChange={handleRangeChange}
                    leftLabel="Not at all"
                    rightLabel="Consistently"
                />
                <RangeInput
                    label="To what extent should your persona be easily irritated or annoyed even by small things?"
                    name="agitational2"
                    value={persona.agitational2}
                    onChange={handleRangeChange}
                    leftLabel="Not at all"
                    rightLabel="Consistently"
                />

                <RangeInput
                    label="To what extent should your persona have ongoing problems with sleep, such as difficulty falling asleep, staying asleep, or waking up too early?"
                    name="insomnia"
                    value={persona.insomnia}
                    onChange={handleRangeChange}
                    leftLabel="Not at all"
                    rightLabel="Consistently"
                />

                <RangeInput
                    label="To what extent should your persona feel low on energy or exhausted most days, even without significant physical effort?"
                    name="anergic"
                    value={persona.anergic}
                    onChange={handleRangeChange}
                    leftLabel="Not at all"
                    rightLabel="Consistently"
                />
            </div>
        </div>
    );
}

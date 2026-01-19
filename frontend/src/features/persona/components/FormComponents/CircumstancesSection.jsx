import { circumstancesOptions } from '../../models/personaModel';

export default function CircumstancesSection({ persona, setPersona }) {
    return (
        <div className="bg-indigo-100 p-4 rounded-lg space-y-4">
            <div className="flex bg-gray-50 rounded-lg py-1 px-2 justify-center">
                <h3 className="font-semibold mb-2">Please select your persona's life situation</h3>
            </div>
            <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Circumstances of Life</label>
                {circumstancesOptions
                    .filter(opt => opt.value !== "not_specified")
                    .map(opt => (
                        <label key={opt.value} className="inline-flex items-center mt-1">
                            <input
                                type="checkbox"
                                value={opt.value}
                                checked={persona.circumstancesOfLife.includes(opt.value)}
                                onChange={e => {
                                    const value = e.target.value;
                                    setPersona(prev => {
                                        let newArr = prev.circumstancesOfLife.includes(value)
                                            ? prev.circumstancesOfLife.filter(v => v !== value)
                                            : [...prev.circumstancesOfLife.filter(v => v !== "not_specified"), value];
                                        if (newArr.length === 0) newArr = ["not_specified"];
                                        return { ...prev, circumstancesOfLife: newArr };
                                    });
                                }}
                                className="mr-2"
                            />
                            {opt.label}
                        </label>
                    ))}
            </div>
        </div>
    );
}

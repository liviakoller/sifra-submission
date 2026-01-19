
export default function SelectInput({ label, name, value, onChange, options }) {
    return (
        <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
}

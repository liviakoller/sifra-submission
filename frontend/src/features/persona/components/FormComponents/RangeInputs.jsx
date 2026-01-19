// components/RangeInput.jsx
export default function RangeInput({ label, name, value, onChange, min = 0, max = 100, leftLabel, rightLabel }) {
    return (
        <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">{label}</label>
            <input
                type="range"
                name={name}
                min={min}
                max={max}
                value={value}
                onChange={onChange}
                className="w-full"
            />
            {(leftLabel || rightLabel) && (
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>{leftLabel}</span>
                    <span>{rightLabel}</span>
                </div>
            )}
        </div>
    );
}

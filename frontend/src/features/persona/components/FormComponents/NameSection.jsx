export default function NameSection({ persona, errors, handleChange }) {
    return (
        <div className="bg-indigo-100 p-4 rounded-lg space-y-4">
            <div className="flex bg-gray-50 rounded-lg py-1 px-2 justify-center">
                <h3 className="font-semibold mb-2">Please enter the name for your persona</h3>
            </div>
            <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    value={persona.name}
                    onChange={handleChange}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter name"
                />
                {errors.name && (
                    <span className="mt-1 text-sm text-red-600">{errors.name}</span>
                )}
            </div>
        </div>
    );
}

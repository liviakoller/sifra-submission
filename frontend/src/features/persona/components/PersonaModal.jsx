import PersonaForm from "./PersonaForm.jsx";

export default function PersonaModal({ isOpen, onClose, onCreate }) {
    if (!isOpen) return null;

    function handleSubmit(persona) {
        onCreate(persona);
        onClose();
    }



    return (
        <div
            className="fixed inset-0 z-50 flex justify-center bg-black/40"
            onClick={onClose}
        >
            <div
                className="bg-indigo-50 rounded-xl shadow-lg w-full max-w-xl my-8 p-6 flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-center">
                    <h3 className="text-xl font-semibold mb-4 text-gray-500">
                        Create New Persona
                    </h3>
                </div>


                <div className="flex-1 overflow-y-auto">
                    <PersonaForm onSubmit={handleSubmit} />
                </div>


                <div className="flex justify-between items-center pt-4 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-50 rounded hover:bg-gray-300 border border-gray-400"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        form="persona-form"
                        className="px-4 py-2 bg-gray-50 rounded hover:bg-gray-300 border border-gray-400"
                    >
                        Create New Persona
                    </button>
                </div>
            </div>
        </div>
    );

}

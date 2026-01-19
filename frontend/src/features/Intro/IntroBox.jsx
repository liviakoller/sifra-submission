
export default function IntroBox() {
    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-md p-10 max-w-xl text-gray-700">
                <h2 className="text-lg font-bold mb-3 text-gray-600 text-center">
                    About This Simulation
                </h2>

                <p className="text-m mb-3">
                    This system is a simulation framework designed to demonstrate and
                    test the interaction behavior of a mental-health chatbot.
                </p>

                <p className="text-m mb-3">
                    The conversation with the mental-health chatbot is conducted with an artificial patient.
                    Please note that all responses from the artificial patient are not provided by a real human but are automatically generated
                    using a large language model. At the beginning of each simulation,
                    the artificial patient’s attributes are configured, after which the
                    dialog is generated automatically.
                </p>

                <div className="mt-4 text-m text-gray-400 italic">
                    To begin, create a new persona using the button on the top left.
                </div>
            </div>
        </div>
    );
}

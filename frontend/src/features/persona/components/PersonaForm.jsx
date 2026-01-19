import { useState } from "react";
import { emptyPersona } from "../models/personaModel";
import NameSection from "./FormComponents/NameSection";
import DemographicsSection from "./FormComponents/DemographicSection";
import CircumstancesSection from "./FormComponents/CircumstancesSection";
import MentalHealthSection from "./FormComponents/MentalHealthSection";
import AttitudeSection from "./FormComponents/AttitudeSection";

export default function PersonaForm({ onSubmit }) {
    const [persona, setPersona] = useState(emptyPersona);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, selectedOptions } = e.target;

        if (name === "circumstancesOfLife") {
            const values = Array.from(selectedOptions, opt => opt.value);
            setPersona(prev => ({ ...prev, [name]: values }));
            return;
        }

        if (name === "name") {
            setPersona(prev => ({ ...prev, name: value }));
            setErrors(prev => ({
                ...prev,
                name: value.length > 30 ? "maximum of 30 characters" : null
            }));
            return;
        }

        if (name === "age") {
            const parsed = parseInt(value, 10);
            if (value === "") {
                setPersona(prev => ({ ...prev, age: null }));
                setErrors(prev => ({ ...prev, age: null }));
            } else if (isNaN(parsed)) {
                setErrors(prev => ({ ...prev, age: "Age must be an integer" }));
                setPersona(prev => ({ ...prev, age: null }));
            } else {
                setPersona(prev => ({ ...prev, age: parsed }));
                setErrors(prev => ({ ...prev, age: parsed < 18 ? "minimum age of 18" : null }));
            }
            return;
        }

        setPersona(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(persona);
    };

    return (
        <form id="persona-form" onSubmit={handleSubmit} className="space-y-6 bg-indigo-50">
            <NameSection persona={persona} errors={errors} handleChange={handleChange} />
            <DemographicsSection persona={persona} handleChange={handleChange} errors={errors}/>
            <CircumstancesSection persona={persona} setPersona={setPersona} />
            <MentalHealthSection persona={persona} setPersona={setPersona} />
            <AttitudeSection persona={persona} setPersona={setPersona} />
        </form>
    );
}

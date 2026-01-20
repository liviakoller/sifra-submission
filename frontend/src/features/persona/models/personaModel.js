/**
 * @typedef {Object} Persona
 * @property {string} name 
 * @property {number|null} age 
 * @property {"employed"|"unemployed"|"not_specified"} job 
 */

export const emptyPersona = {
    name: "",
    gender: "not_specified",
    age: null,
    job: "not_specified",
    anxiousDistress1: 50,
    anxiousDistress2: 50,
    coreEmotional1: 50,
    coreEmotional2: 50,
    agitational1: 50,
    agitational2: 50,
    insomnia: 50,
    anergic: 50,
    circumstancesOfLife: ["not_specified"],
    attitude: 50,
    openness: 50,
};

export const genderOptions = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "not_specified", label: "Not specified" },
];

export const jobOptions = [
    { value: "employed", label: "Employed" },
    { value: "unemployed", label: "Unemployed" },
    { value: "not_specified", label: "Not specified" },
];

export const circumstancesOptions = [
    { value: "work stress", label: "work stress" },
    { value: "loneliness", label: "loneliness" },
    { value: "relationship issues", label: "relationship issues" },
    {value: "study pressure", label: "study pressure" },
    { value: "not_specified", label: "Not specified" },
];


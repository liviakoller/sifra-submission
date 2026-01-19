export function checkPersona(persona){
    if (!persona) return persona;

    return {
        ...persona,


        name:
            persona.name && persona.name.length > 30
                ? persona.name.slice(0, 30)
                : persona.name ?? null,


        age: (() => {
            if (persona.age === null || persona.age === "") return null;


            const parsed = parseInt(persona.age, 10);


            if (isNaN(parsed)) return null;


            return parsed < 18 ? 18 : parsed;
        })(),
    };
}
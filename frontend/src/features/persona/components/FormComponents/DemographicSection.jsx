import { genderOptions, jobOptions } from '../../models/personaModel';
import SelectInput from "./SelectInput";

export default function DemographicsSection({ persona, handleChange, errors}) {
    return (
      <div className="bg-indigo-100 p-4 rounded-lg space-y-4">
        <div className="flex bg-gray-50 rounded-lg py-1 px-2 justify-center">
          <h3 className="font-semibold mb-2">
            Please select the demographic details for your persona
          </h3>
        </div>

        <SelectInput
          label="Gender"
          name="gender"
          value={persona.gender}
          onChange={handleChange}
          options={genderOptions}
        />

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Age</label>
          <input
            type="text"
            name="age"
            value={persona.age === null ? "" : persona.age}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors?.age && (
            <span className="mt-1 text-sm text-red-600">{errors.age}</span>
          )}
        </div>

        <SelectInput
          label="Job status"
          name="job"
          value={persona.job}
          onChange={handleChange}
          options={jobOptions}
        />
      </div>
    );
}

import React, { useState } from "react";
import { TPeople } from "../../types/people.type";
import { setPeople } from "../../store/peopleStore";
import TextInput from "./TextInput";

type TFormAdd = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormAdd: React.FC<TFormAdd> = ({ setOpen }) => {
  const uuid = crypto.randomUUID();
  const [forms, setForms] = useState<TPeople>({
    email: "",
    id: uuid,
    name: "",
    role: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForms((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPeople(forms, "ADD");
    setForms((prev) => ({
      ...prev,
      id: uuid,
      email: "",
      name: "",
      role: "",
    }));

    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
        Add Person
      </h1>

      <div className="space-y-4">
        <TextInput
          type="text"
          label="name"
          onChange={handleOnChange}
          value={forms.name}
        />
        <TextInput
          type="email"
          label="email"
          onChange={handleOnChange}
          value={forms.email}
        />
        <TextInput
          type="text"
          label="role"
          onChange={handleOnChange}
          value={forms.role}
        />
      </div>

      <div className="flex gap-4 text-black dark:text-white">
        <button
          type="button"
          className="btn btn-light w-full"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>

        <button className="btn btn-danger w-full" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormAdd;

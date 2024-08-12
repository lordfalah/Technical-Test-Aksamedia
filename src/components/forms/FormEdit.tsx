import React, { useEffect, useState, useSyncExternalStore } from "react";
import { TPeople } from "../../types/people.type";
import { setPeople, storePeople } from "../../store/peopleStore";
import { useSearchParam } from "../../hooks/useSearchParam";
import TextInput from "./TextInput";

type TFormEdit = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormEdit: React.FC<TFormEdit> = ({ setOpen }) => {
  const { getParam, removeParam } = useSearchParam("id");
  const peopleLocalStorage = useSyncExternalStore(
    storePeople.subscribe,
    storePeople.getSnapshot,
  );

  const peoples = JSON.parse(peopleLocalStorage as string) as TPeople[];
  const [forms, setForms] = useState<TPeople>({
    email: "",
    id: "",
    name: "",
    role: "",
  });

  useEffect(() => {
    const peopleById = peoples.find((people) => people.id === getParam());

    if (peopleById && peopleById.id !== forms.id) {
      setForms({
        id: peopleById.id,
        email: peopleById.email,
        name: peopleById.name,
        role: peopleById.role,
      });
    }
  }, [getParam, forms, peoples]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPeople(forms, "UPDATE");
    setForms((prev) => ({
      ...prev,
      id: "",
      email: "",
      name: "",
      role: "",
    }));

    removeParam();
    setOpen(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForms((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
        Update Person
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
          onClick={() => {
            setOpen(false);
            removeParam();
          }}
        >
          Cancel
        </button>

        <button className="btn btn-danger w-full" type="submit">
          Update
        </button>
      </div>
    </form>
  );
};

export default FormEdit;

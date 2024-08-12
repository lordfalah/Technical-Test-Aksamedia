import { TPeople } from "../types/people.type";

export function setPeople(
  values: TPeople,
  action: "ADD" | "UPDATE" | "DELETE",
) {
  const existingPeople = JSON.parse(
    localStorage.getItem("people") || "[]",
  ) as TPeople[];

  let updatedPeople: TPeople[] = [];

  switch (action) {
    case "ADD":
      // Add the new person to the beginning of the existing array
      updatedPeople = [values, ...existingPeople];
      break;

    case "UPDATE":
      // Update the person in the existing array
      updatedPeople = existingPeople.map((person) =>
        person.id === values.id ? values : person,
      );
      break;

    case "DELETE":
      // Remove the person from the existing array
      updatedPeople = existingPeople.filter(
        (person) => person.id !== values.id,
      );
      break;
  }

  // Store updated array to localStorage and dispatch storage event
  window.localStorage.setItem("people", JSON.stringify(updatedPeople));
  window.dispatchEvent(
    new StorageEvent("storage", {
      key: "people",
      newValue: JSON.stringify(updatedPeople),
    }),
  );
}

export const storePeople = {
  getSnapshot: () => localStorage.getItem("people") as string | null,
  subscribe: (listener: () => void) => {
    window.addEventListener("storage", listener);
    return () => void window.removeEventListener("storage", listener);
  },
};

if (storePeople.getSnapshot() === null) {
  localStorage.setItem("people", JSON.stringify([]));
}

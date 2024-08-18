import React, { useState, useSyncExternalStore } from "react";
import TextInput from "../../components/ui/TextInput";
import User from "../../components/icons/User";
import { setAuthUser, storeAuth } from "../../store/authStore";
import { TUser } from "../../types/user.type";

const PageProfile = () => {
  const [name, setName] = useState("");
  const userLocalStorage = useSyncExternalStore(
    storeAuth.subscribe,
    storeAuth.getSnapshot,
  );

  const {
    password,
    email,
    name: userName,
  }: TUser = JSON.parse(userLocalStorage) || {
    password: "user",
    email: "user@gmail.com",
    name: "user",
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) return;

    setAuthUser({ name, email, password });
    setName("");
  };

  return (
    <section className="flex min-h-screen items-center">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Current Name {userName}
          </h1>

          <form
            onSubmit={onSubmitForm}
            className="mb-0 mt-6 space-y-4 rounded-lg bg-gray-50 p-4 shadow-lg sm:p-6 lg:p-8 dark:bg-gray-900"
          >
            <p className="text-center text-lg font-medium dark:text-white">
              Update your name
            </p>

            <div>
              <label htmlFor="name" className="sr-only">
                name
              </label>

              <div className="relative">
                <TextInput
                  type="text"
                  className="py-1.5"
                  label="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  icon={
                    <User className="absolute right-4 top-1/2 size-4 -translate-y-1/2 stroke-black" />
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className={`block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white ${name ? "cursor-pointer" : "cursor-not-allowed"}`}
            >
              Update name
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PageProfile;

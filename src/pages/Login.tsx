import React, { useState } from "react";
import { TUser } from "../types/user.type";
import { setAuthUser } from "../store/authStore";
import TextInput from "../components/forms/TextInput";
import AtSymbol from "../components/icons/AtSymbol";
import Eye from "../components/icons/Eye";
import User from "../components/icons/User";
import SwitchTheme from "../components/SwitchTheme";

const PageLogin = () => {
  const [forms, setForms] = useState<TUser>({
    email: "",
    password: "",
    name: "",
  });

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthUser(forms);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForms((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="flex min-h-screen items-center">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <SwitchTheme />
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Technical Test
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Login static menggunakan apapun asalkan name, email dan password
            terisi.
          </p>

          <form
            onSubmit={onSubmitForm}
            className="mb-0 mt-6 space-y-4 rounded-lg bg-white p-4 shadow-lg sm:p-6 lg:p-8 dark:bg-gray-900"
          >
            <p className="text-center text-lg font-medium text-black dark:text-white">
              Sign in to your account
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
                  value={forms.name}
                  onChange={handleOnChange}
                  icon={
                    <User className="absolute right-4 top-1/2 size-4 -translate-y-1/2 stroke-black" />
                  }
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <TextInput
                  type="email"
                  className="py-1.5"
                  label="email"
                  value={forms.email}
                  onChange={handleOnChange}
                  icon={
                    <AtSymbol className="absolute right-4 top-1/2 size-4 -translate-y-1/2 stroke-black" />
                  }
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <TextInput
                  type="password"
                  className="py-1.5"
                  label="password"
                  value={forms.password}
                  onChange={handleOnChange}
                  icon={
                    <Eye className="absolute right-4 top-1/2 size-4 -translate-y-1/2" />
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PageLogin;

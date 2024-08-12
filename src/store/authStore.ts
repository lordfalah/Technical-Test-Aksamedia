import { TUser } from "../types/user.type";

export function setAuthUser(values: TUser | null) {
  window.localStorage.setItem("user", JSON.stringify(values));
  // On localStoage.setItem, the storage event is only triggered on other tabs and windows.
  // So we manually dispatch a storage event to trigger the subscribe function on the current window as well.
  window.dispatchEvent(
    new StorageEvent("storage", {
      key: "user",
      newValue: JSON.stringify(values),
    }),
  );
}

export const storeAuth = {
  getSnapshot: () => localStorage.getItem("user") || "null",
  subscribe: (listener: () => void) => {
    window.addEventListener("storage", listener);
    return () => void window.removeEventListener("storage", listener);
  },
};

if (storeAuth.getSnapshot() === "null") {
  localStorage.setItem("user", "null");
}

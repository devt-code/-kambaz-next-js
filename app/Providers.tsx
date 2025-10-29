"use client";

import { Provider } from "react-redux";
import { store } from "@/app/Labs/Lab4/store/store"; // adjust path as needed

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

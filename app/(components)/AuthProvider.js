"use client";

import { sessionProvider } from "next-auth/react";
const AuthProvider = ({ children }) => {
  return <sessionProvider>{children}</sessionProvider>;
};
export default AuthProvider;

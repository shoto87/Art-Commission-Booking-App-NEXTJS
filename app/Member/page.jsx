import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { UserForm } from "../(components)/UserForm";

const Member = async () => {
  const session = await getServerSession(options);
  const userjob = await getServerSession(UserForm);

  if (!session) {
    redirect("/api/auth/signin?callback=/Member");
  }
  if (!userjob) {
    redirect("/api/auth/signin?callback=/Member");
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
      {/* <p>{userjob?.user?.job}</p> */}
      <p>Welcome to the Member Page!</p>
    </div>
  );
};

export default Member;

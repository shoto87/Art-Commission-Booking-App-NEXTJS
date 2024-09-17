import {
  faAdd,
  faHome,
  faPerson,
  faPowerOff,
  faTicket,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

const Nav = async () => {
  const session = await getServerSession(options);
  return (
    <nav className="flex justify-between bg-Nav p-4 ">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        <Link href="/TicketPage/new">
          <FontAwesomeIcon icon={faTicket} className="icon" />
        </Link>
        <Link href="/CreateUser">
          <FontAwesomeIcon icon={faAdd} className="icon" />
        </Link>
        <Link href="/Member">
          <FontAwesomeIcon icon={faPerson} className="icon" />
        </Link>
      </div>
      <div>
        <p className="text-default-text">iampatrick</p>
        {session ? (
          <Link href="/api/auth/signout?callbackUrl=/" className="text-white">
            <FontAwesomeIcon icon={faX} className="icon" />
          </Link>
        ) : (
          <Link href="/api/auth/signin" className="text-white">
            <FontAwesomeIcon icon={faPowerOff} className="icon" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;

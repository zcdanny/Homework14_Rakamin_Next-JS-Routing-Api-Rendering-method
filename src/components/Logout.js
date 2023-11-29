"use client";

import { Link } from "@chakra-ui/react";
import Cookies from "js-cookie";

function Logout() {
  return (
    <>
      <Link
        onClick={() => {
          Cookies.remove("accessToken");
        }}
        href="/login"
      >
        Logout
      </Link>
    </>
  );
}

export default Logout;

import { UserRoundSearch } from "lucide-react";
import Image from "next/image";
import React from "react";
import "./headerphone.css";
import Notification from "./Post/Notifi";
import Link from "next/link";
export default function Headerphonetop() {
  return (
    <div className="hpt">
      <div className="header-c">
        <div className="hptl">
          <Image
            style={{ marginTop: "-5px" }}
            className="logooo"
            src="/l.png"
            alt="Logo"
            width={80}
            height={80}
          />
        </div>
        <div className="hptr">
          <Link href={"/search"}>
            <UserRoundSearch color="#fff"></UserRoundSearch>
          </Link>
          <Notification></Notification>
        </div>
      </div>
    </div>
  );
}

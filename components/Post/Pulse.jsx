import React from "react";
import Users from "../Afterchat/Users";
import Pulseright from "./Pulseright";
import "./style.css";

export default function Pulse() {
  return (
    <div className="pulse" style={{}}>
      <div className="showpulse" style={{ display: "flex" }}>
        <div
          className="pleft"
          style={{
            borderRight: "1px solid rgba(255, 255, 255, 0.5)",
            maxHeight: "102vh",
            overflowY: "auto",
          }}
        >
          <Users></Users>
        </div>
        <div className="pright">
          <Pulseright></Pulseright>
        </div>
      </div>
    </div>
  );
}

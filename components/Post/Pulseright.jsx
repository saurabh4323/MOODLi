import React from "react";
import Createpost from "./Createpost";
import PostList from "./PostList";

export default function Pulseright() {
  return (
    <div className="prights" style={{ height: "100%" }}>
      <Createpost></Createpost>
      <PostList></PostList>
    </div>
  );
}

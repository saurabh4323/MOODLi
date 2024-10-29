import Faq from "@/components/Afterchat/Faq";
import Newhero from "@/components/Afterchat/Newhero";
import NewsLetter from "@/components/Afterchat/NewsLetter";
import Heros from "@/components/Heros";

import React from "react";

export default function page() {
  return (
    <div>
      <Newhero></Newhero>

      <Faq></Faq>
      <NewsLetter></NewsLetter>
    </div>
  );
}

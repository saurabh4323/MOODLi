import Heros from "@/components/Heros";
import Image from "next/image";
import Head from "next/head";
import Newhero from "@/components/Afterchat/Newhero";
import NewsLetter from "@/components/Afterchat/NewsLetter";
import Faq from "@/components/Afterchat/Faq";

export default function Home() {
  return (
    <div>
      {/* <Heros></Heros>
       */}
      <Newhero></Newhero>

      <Faq></Faq>
      <NewsLetter></NewsLetter>
    </div>
  );
}

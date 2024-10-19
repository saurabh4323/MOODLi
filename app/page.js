import Heros from "@/components/Heros";
import Image from "next/image";
import Head from "next/head";
import Newhero from "@/components/Afterchat/Newhero";
import NewsLetter from "@/components/Afterchat/NewsLetter";

export default function Home() {
  return (
    <div>
      {/* <Heros></Heros>
       */}
      <Newhero></Newhero>
      <NewsLetter></NewsLetter>
    </div>
  );
}

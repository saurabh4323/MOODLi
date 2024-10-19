import Heros from "@/components/Heros";
import Image from "next/image";
import Head from "next/head";
import Newhero from "@/components/Afterchat/Newhero";

export default function Home() {
  return (
    <div>
      {/* <Heros></Heros>
       */}
      <Newhero></Newhero>
    </div>
  );
}

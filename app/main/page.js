import Faq from "@/components/Afterchat/Faq";
import Newhero from "@/components/Afterchat/Newhero";
import NewsLetter from "@/components/Afterchat/NewsLetter";
import Footer from "@/components/Footer"; // Uncomment if you want to use Footer
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      <Head>
        <title>Moodli - Your Anonymous Mood Tracking and Chat Platform</title>
        <meta
          name="description"
          content="Join Moodli to track your mood, connect with friends, and share feelings. Experience a supportive community and powerful insights tailored for you."
        />
        <meta
          name="keywords"
          content="Mood tracker, Emotional support, Connect with friends, Mood reflection, Online community, Mental wellness, online chat"
        />
      </Head>
      <Newhero />
      <Faq />
      <NewsLetter />
      {/* <Footer /> */}

      <Link
        href="https://www.producthunt.com/posts/moodli?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-moodli"
        target="_blank"
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=573818&theme=dark"
          alt="Moodli - Your anonymous mood tracking and chat platform | Product Hunt"
          width={250}
          height={100}
        />
      </Link>
    </div>
  );
}
{
  /* <a href="https://www.producthunt.com/posts/moodli?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-moodli" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=573818&theme=dark" alt="Moodli - Your&#0032;anonymous&#0032;mood&#0032;tracking&#0032;and&#0032;chat&#0032;platform | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a> */
}

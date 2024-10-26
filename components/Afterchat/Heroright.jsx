"use client";
import React from "react";
import Image from "next/image"; // Import Image from Next.js
import "./hr.css";

export default function Heroright() {
  return (
    <div className="coright">
      <div className="ima">
        <div className="first">
          <Image
            src="/sunglasses.png"
            alt="Sunglasses"
            width={150}
            height={150}
          />

          <Image src="/sleepy.png" alt="Scream" width={150} height={150} />
          <Image src="/flushed.png" alt="Flushed" width={150} height={150} />
          <Image
            src="/sunglasses.png"
            alt="Sunglasses"
            width={150}
            height={150}
          />
          <Image src="/smiley.png" alt="Scream" width={150} height={150} />
          <Image src="/flushed.png" alt="Flushed" width={150} height={150} />
          <Image
            src="/sunglasses.png"
            alt="Sunglasses"
            width={150}
            height={150}
          />
          <Image src="/sob.png" alt="Scream" width={150} height={150} />
          <Image src="/flushed.png" alt="Flushed" width={150} height={150} />
        </div>
        <div className="second">
          <Image
            src="/heart_eyes.png"
            alt="Sweat Smile"
            width={150}
            height={150}
          />
          <Image src="/sleepy.png" alt="joy" width={150} height={150} />
          <Image
            src="/sweat_smile.png"
            alt="Sweat Smile"
            width={150}
            height={150}
          />

          <Image src="/sob.png" alt="joy" width={150} height={150} />

          {/* <Image src="/joy.png" alt="joy" width={150} height={150} /> */}
          <Image src="/joy.png" alt="joy" width={150} height={150} />
          <Image
            src="/sweat_smile.png"
            alt="Sweat Smile"
            width={150}
            height={150}
          />
          <Image src="/joy.png" alt="joy" width={150} height={150} />
          <Image
            src="/sweat_smile.png"
            alt="Sweat Smile"
            width={150}
            height={150}
          />
        </div>
        <div className="third">
          <Image src="/flushed.png" alt="Flushed" width={150} height={150} />
          <Image
            src="/sunglasses.png"
            alt="Sunglasses"
            width={150}
            height={150}
          />
          <Image src="/scream.png" alt="Scream" width={150} height={150} />
          <Image src="/flushed.png" alt="Flushed" width={150} height={150} />
          <Image
            src="/sunglasses.png"
            alt="Sunglasses"
            width={150}
            height={150}
          />
          <Image src="/scream.png" alt="Scream" width={150} height={150} />
          <Image src="/flushed.png" alt="Flushed" width={150} height={150} />

          <Image src="/scream.png" alt="Scream" width={150} height={150} />
          <Image src="/flushed.png" alt="Flushed" width={150} height={150} />
          <Image
            src="/sunglasses.png"
            alt="Sunglasses"
            width={150}
            height={150}
          />
        </div>
      </div>
    </div>
  );
}

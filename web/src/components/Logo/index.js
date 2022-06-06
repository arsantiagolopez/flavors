import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ isWhite, ...otherStyles }) => {
  return (
    <Link href="/">
      <a style={{ ...otherStyles }}>
        <Image
          src={isWhite ? "/images/logo_white.png" : "/images/logo_color.png"}
          alt="Flavors"
          width={90}
          height={15}
          quality={100}
          layout="fixed"
          priority="true"
        />
      </a>
    </Link>
  );
};

export { Logo };

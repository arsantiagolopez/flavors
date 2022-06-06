import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { Layout } from "../../components/Layout";
import { PlateTemplate } from "../../components/PlateTemplate";

const PlatePage = () => {
  const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
  const { data: session } = useSWR(`${CLIENT_URL}/api/auth/session`);
  const { user } = session || {};

  const router = useRouter();
  const { id } = router?.query || {};

  const { data: platesData } = useSWR(id ? `/api/plates/${id}` : null);
<<<<<<< HEAD
  // const { plate } = platesData || {};

  // console.log("plate", test);

  // Test data
  const plate = {
    id: 1,
    image:
      "https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    price: "5",
    markdown: "15",
    title:
      "Delicious pasta carbonara and everything else, what if this was extra long tho",
    description:
      "Brand new unopened tripod. Great for cameras! You can adjust the tripod any which way to get the right angle needed. I have 2 of these. $30/ea or $55 for both. They go for $45 retail. Compatible with Camcorder, DSLR, Mirrorless",
    meta: "5 miles away. Delivers.",
    category: "howdypanita",
    subCategory: "honeyboo",
  };
=======
  const { plate } = platesData || {};

  // console.log("plate", test);

  // // Test data
  // const plate = {
  //   id: 1,
  //   image:
  //     "https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  //   price: "5",
  //   markdown: "15",
  //   title:
  //     "Delicious pasta carbonara and everything else, what if this was extra long tho",
  //   description:
  //     "Brand new unopened tripod. Great for cameras! You can adjust the tripod any which way to get the right angle needed. I have 2 of these. $30/ea or $55 for both. They go for $45 retail. Compatible with Camcorder, DSLR, Mirrorless",
  //   meta: "5 miles away. Delivers.",
  //   category: "howdypanita",
  //   subCategory: "honeyboo",
  // };
>>>>>>> 17bc58afd709c8c3dfa4d01afbeb7bff5e483368

  // Test data
  const seller = {
    name: "Margarita Sanchez",
    avatar:
      "https://images.pexels.com/photos/4348798/pexels-photo-4348798.jpeg?cs=srgb&dl=pexels-maksim-goncharenok-4348798.jpg&fm=jpg",
    rating: "⭐⭐⭐⭐",
  };

  const firstName = seller?.name.split(" ")[0];

  const layoutProps = { user };
  const templateProps = { user, plate, seller };

  return (
    <>
      <Head>
        <title>
          {firstName}'s {plate?.title}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout {...layoutProps}>
        <PlateTemplate {...templateProps} />
      </Layout>
    </>
  );
};

export default PlatePage;

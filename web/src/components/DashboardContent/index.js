import { Divider, Flex } from "@chakra-ui/react";
import React from "react";
import { Reactions } from "./Reactions";
import { Section } from "./Section";

const DashboardContent = ({ user }) => {
  const featured = [
    {
      id: "09434j8baff81b6915bb0b4743h",
      tags: [],
      menu: [],
      title: "Red steak with potatos.",
      description: "Delicious steak with a touch of love.",
      price: 7.99,
      category: "Steaks & BBQ",
      subCategory: "BBQ",
      image:
        "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      userId: "61787c1fae53dd5fbdcc7748",
    },
    {
      id: "803234j8baff81b6915bb0b4743h",
      tags: [],
      menu: [],
      title: "Red steak with potatos.",
      description: "Delicious steak with a touch of love.",
      price: 7.99,
      category: "Steaks & BBQ",
      subCategory: "BBQ",
      image:
        "https://images.pexels.com/photos/8305406/pexels-photo-8305406.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      userId: "61787c1fae53dd5fbdcc7748",
    },
    {
      id: "29334j8ssdff81b6915bb0b4743h",
      tags: [],
      menu: [],
      title: "Red steak with potatos.",
      description: "Delicious steak with a touch of love.",
      price: 7.99,
      category: "Steaks & BBQ",
      subCategory: "BBQ",
      image:
        "https://images.pexels.com/photos/416471/pexels-photo-416471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      userId: "61787c1fae53dd5fbdcc7748",
    },
    {
      id: "0219434j8baff81b6915bb0b4743h",
      tags: [],
      menu: [],
      title: "Red steak with potatos.",
      description: "Delicious steak with a touch of love.",
      price: 7.99,
      category: "Steaks & BBQ",
      subCategory: "BBQ",
      image:
        "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      userId: "61787c1fae53dd5fbdcc7748",
    },
    {
      id: "33280333234j8baff81b6915bb0b4743h",
      tags: [],
      menu: [],
      title: "Red steak with potatos.",
      description: "Delicious steak with a touch of love.",
      price: 7.99,
      category: "Steaks & BBQ",
      subCategory: "BBQ",
      image:
        "https://images.pexels.com/photos/8305406/pexels-photo-8305406.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      userId: "61787c1fae53dd5fbdcc7748",
    },
    {
      id: "1232933534j8ssdff81b6915bb0b4743h",
      tags: [],
      menu: [],
      title: "Red steak with potatos.",
      description: "Delicious steak with a touch of love.",
      price: 7.99,
      category: "Steaks & BBQ",
      subCategory: "BBQ",
      image:
        "https://images.pexels.com/photos/416471/pexels-photo-416471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      userId: "61787c1fae53dd5fbdcc7748",
    },
    {
      id: "09434j32aff81b6915bb0b4743h",
      tags: [],
      menu: [],
      title: "Red steak with potatos.",
      description: "Delicious steak with a touch of love.",
      price: 7.99,
      category: "Steaks & BBQ",
      subCategory: "BBQ",
      image:
        "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      userId: "61787c1fae53dd5fbdcc7748",
    },
    {
      id: "80134j8baff81b6915bb0b4743h",
      tags: [],
      menu: [],
      title: "Red steak with potatos.",
      description: "Delicious steak with a touch of love.",
      price: 7.99,
      category: "Steaks & BBQ",
      subCategory: "BBQ",
      image:
        "https://images.pexels.com/photos/8305406/pexels-photo-8305406.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      userId: "61787c1fae53dd5fbdcc7748",
    },
    {
      id: "29334j32138ssdff81b6915bb0b4743h",
      tags: [],
      menu: [],
      title: "Red steak with potatos.",
      description: "Delicious steak with a touch of love.",
      price: 7.99,
      category: "Steaks & BBQ",
      subCategory: "BBQ",
      image:
        "https://images.pexels.com/photos/416471/pexels-photo-416471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      userId: "61787c1fae53dd5fbdcc7748",
    },
  ];

  const available = [
    {
      id: "29334j8ssdff81b6915bb0b4743h",
      tags: [],
      menu: [],
      title: "Red steak with potatos.",
      description: "Delicious steak with a touch of love.",
      price: 7.99,
      category: "Steaks & BBQ",
      subCategory: "BBQ",
      image:
        "https://images.pexels.com/photos/416471/pexels-photo-416471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      userId: "61787c1fae53dd5fbdcc7748",
    },
  ];

  const reactions = [
    {
      emoji: "🎉",
      items: [
        {
          id: "09434j8baff81b6915bb0b4743h",
          tags: [],
          menu: [],
          title: "Red steak with potatos.",
          description: "Delicious steak with a touch of love.",
          price: 7.99,
          category: "Steaks & BBQ",
          subCategory: "BBQ",
          image:
            "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          userId: "61787c1fae53dd5fbdcc7748",
        },
        {
          id: "803234j8baff81b6915bb0b4743h",
          tags: [],
          menu: [],
          title: "Red steak with potatos.",
          description: "Delicious steak with a touch of love.",
          price: 7.99,
          category: "Steaks & BBQ",
          subCategory: "BBQ",
          image:
            "https://images.pexels.com/photos/8305406/pexels-photo-8305406.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          userId: "61787c1fae53dd5fbdcc7748",
        },
        {
          id: "29334j8ssdff81b6915bb0b4743h",
          tags: [],
          menu: [],
          title: "Red steak with potatos.",
          description: "Delicious steak with a touch of love.",
          price: 7.99,
          category: "Steaks & BBQ",
          subCategory: "BBQ",
          image:
            "https://images.pexels.com/photos/416471/pexels-photo-416471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          userId: "61787c1fae53dd5fbdcc7748",
        },
        {
          id: "0219434j8baff81b6915bb0b4743h",
          tags: [],
          menu: [],
          title: "Red steak with potatos.",
          description: "Delicious steak with a touch of love.",
          price: 7.99,
          category: "Steaks & BBQ",
          subCategory: "BBQ",
          image:
            "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          userId: "61787c1fae53dd5fbdcc7748",
        },
        {
          id: "33280333234j8baff81b6915bb0b4743h",
          tags: [],
          menu: [],
          title: "Red steak with potatos.",
          description: "Delicious steak with a touch of love.",
          price: 7.99,
          category: "Steaks & BBQ",
          subCategory: "BBQ",
          image:
            "https://images.pexels.com/photos/8305406/pexels-photo-8305406.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          userId: "61787c1fae53dd5fbdcc7748",
        },
        {
          id: "1232933534j8ssdff81b6915bb0b4743h",
          tags: [],
          menu: [],
          title: "Red steak with potatos.",
          description: "Delicious steak with a touch of love.",
          price: 7.99,
          category: "Steaks & BBQ",
          subCategory: "BBQ",
          image:
            "https://images.pexels.com/photos/416471/pexels-photo-416471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          userId: "61787c1fae53dd5fbdcc7748",
        },
        {
          id: "09434j32aff81b6915bb0b4743h",
          tags: [],
          menu: [],
          title: "Red steak with potatos.",
          description: "Delicious steak with a touch of love.",
          price: 7.99,
          category: "Steaks & BBQ",
          subCategory: "BBQ",
          image:
            "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          userId: "61787c1fae53dd5fbdcc7748",
        },
        {
          id: "80134j8baff81b6915bb0b4743h",
          tags: [],
          menu: [],
          title: "Red steak with potatos.",
          description: "Delicious steak with a touch of love.",
          price: 7.99,
          category: "Steaks & BBQ",
          subCategory: "BBQ",
          image:
            "https://images.pexels.com/photos/8305406/pexels-photo-8305406.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          userId: "61787c1fae53dd5fbdcc7748",
        },
        {
          id: "29334j32138ssdff81b6915bb0b4743h",
          tags: [],
          menu: [],
          title: "Red steak with potatos.",
          description: "Delicious steak with a touch of love.",
          price: 7.99,
          category: "Steaks & BBQ",
          subCategory: "BBQ",
          image:
            "https://images.pexels.com/photos/416471/pexels-photo-416471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          userId: "61787c1fae53dd5fbdcc7748",
        },
      ],
    },
    {
      emoji: "🥳",
      items: [
        {
          id: "09434j8baff81b6915bb0b4743h",
          tags: [],
          menu: [],
          title: "Red steak with potatos.",
          description: "Delicious steak with a touch of love.",
          price: 7.99,
          category: "Steaks & BBQ",
          subCategory: "BBQ",
          image:
            "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          userId: "61787c1fae53dd5fbdcc7748",
        },
      ],
    },
    {
      emoji: "🙁",
      items: [
        {
          id: "09434j8baff81b6915bb0b4743h",
          tags: [],
          menu: [],
          title: "Red steak with potatos.",
          description: "Delicious steak with a touch of love.",
          price: 7.99,
          category: "Steaks & BBQ",
          subCategory: "BBQ",
          image:
            "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          userId: "61787c1fae53dd5fbdcc7748",
        },
      ],
    }
  ];

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.content}>
        <Section heading="Available now 🍴" items={available} />
        <Divider {...styles.divider} />
        <Section heading="Order again" items={featured} />
        <Divider {...styles.divider} />
        <Reactions items={reactions} />
        <Divider {...styles.divider} />
        <Section heading="Today's best sellers" items={featured} />
      </Flex>
    </Flex>
  );
};

export { DashboardContent };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    width: "100%",
    maxWidth: "100%",
    minHeight: { base: "90vh", md: "80vh" },
    paddingY: { base: "1em", md: "7vh" },
    marginBottom: "2vh",
  },
  content: {
    direction: "column",
    height: "100%",
  },
  divider: {
    marginTop: "0",
    marginBottom: "3vh",
  },
};

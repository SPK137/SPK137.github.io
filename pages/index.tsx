import { Flex } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import { PageContainer } from "../components/PageContainer";
import SearchBar from "../components/SearchBar";

const SearchPage: React.FC<{ provinces: String[] }> = ({ provinces }) => {
  return (
    <Flex flexDir="column">
      <Head>
        <title>โครงการคนละครึ่ง</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchBar provinces={provinces} />
      <PageContainer></PageContainer>
    </Flex>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://panjs.com/ywc18.json");
  const provinces: String[] = await res.json();

  return {
    props: {
      provinces: provinces,
    },
  };
};

export default SearchPage;

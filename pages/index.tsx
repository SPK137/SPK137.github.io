import { Flex, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { useState } from "react";
import FilterCard from "../components/FilterCard";
import { PageContainer } from "../components/PageContainer";
import SearchBar from "../components/SearchBar";
import ShopCard from "../components/ShopCard";

export interface ShopCategory {
  name: string;
  subcategories: string[];
}

export interface Merchant {
  shopNameTH: string;
  categoryName: string;
  subcategoryName: string;
  coverImageId: string;
  facilities: string[];
  priceLevel: number;
  isOpen: string;
  highlightText: string;
  recommendedItems: string[];
  addressProvinceName: string;
  addressDistrictName: string;
}

export interface ShopDataResponse {
  categories: ShopCategory[];
  provinces: string[];
  priceRanges: string[];
  merchants: Merchant[];
}

const SearchPage: React.FC<{
  data: ShopDataResponse;
}> = ({ data }) => {
  const [filter, setFilter] = useState<string>("");
  const [shopType, setShopType] = useState<number>(0);

  return (
    <Flex flexDir="column">
      <Head>
        <title>โครงการคนละครึ่ง</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchBar provinces={data.provinces} />
      <PageContainer background="url('/images/result-bg.png')">
        <Text
          paddingTop="20px"
          paddingBottom="50px"
          fontFamily="IBMPlexSansThai"
          fontSize="20px"
          fontWeight="700"
        >
          {" "}
          ผลการค้นหา {filter} ทั้งหมด
        </Text>
        <Flex flexDir="row">
          <Flex flex={1}>
            <FilterCard
              onChange={(nextValue) => {
                setShopType(nextValue as number);
              }}
              shopTypeIndex={shopType}
            />
          </Flex>
          <Flex flex={3.3}>
            <ShopCard />
          </Flex>
        </Flex>
      </PageContainer>
    </Flex>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://panjs.com/ywc18.json");
  const body: ShopDataResponse = await res.json();

  return {
    props: {
      data: body,
    },
  };
};

export default SearchPage;

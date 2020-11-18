import { Flex, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { useState } from "react";
import FilterCard from "../components/FilterCard";
import { PageContainer } from "../components/PageContainer";
import SearchBar from "../components/SearchBar";
import ShopCard from "../components/ShopCard";
import { ShopDataResponse } from "../utils/types";

const SearchPage: React.FC<{
  data: ShopDataResponse;
}> = ({ data }) => {
  const [shopTypeIndex, setShopTypeIndex] = useState<number>(0);
  const [selectedProvinceIndex, setSelectedProvinceIndex] = useState<number>(0);
  const [priceRangeIndex, setPriceRangeIndex] = useState<number>(0);
  const shopTypeList = ["ทั้งหมด", ...data.categories.map((category) => category.name)];
  const provinceList = ["พื้นที่ใกล้ฉัน", "พื้นที่ทั้งหมด", ...data.provinces];

  return (
    <Flex flexDir="column">
      <Head>
        <title>โครงการคนละครึ่ง</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchBar provinces={provinceList} selectedProvinceIndex={selectedProvinceIndex} />
      <PageContainer background="url('/images/result-bg.png')">
        <Text
          paddingTop="20px"
          paddingBottom="50px"
          fontFamily="IBMPlexSansThai"
          fontSize="20px"
          fontWeight="700"
        >
          {" "}
          ผลการค้นหา {shopTypeIndex > 0 ? shopTypeList[shopTypeIndex] : ""} ทั้งหมด
        </Text>
        <Flex flexDir="row">
          <Flex flex={1}>
            <FilterCard
              data={data}
              setShopType={(nextValue) => {
                setShopTypeIndex(nextValue as number);
              }}
              setProvince={(nextValue) => {
                setSelectedProvinceIndex(nextValue as number);
              }}
              setRange={(nextValue) => {
                setPriceRangeIndex(nextValue as number);
              }}
              shopTypeIndex={shopTypeIndex}
              provinceIndex={selectedProvinceIndex}
              priceRangeIndex={priceRangeIndex}
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

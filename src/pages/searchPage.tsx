import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import FilterCard from "../components/FilterCard";
import { PageContainer } from "../components/PageContainer";
import SearchBar from "../components/SearchBar";
import ShopCard from "../components/ShopCard";
import { getShopData } from "../services/shopService";
import { Merchant, ShopDataResponse } from "../utils/types";

const SearchPage: React.FC = () => {
  const [shopTypeIndex, setShopTypeIndex] = useState<number>(0);
  const [subShopTypeIndex, setSubShopTypeIndex] = useState<number>(0);
  const [selectedProvinceIndex, setSelectedProvinceIndex] = useState<number>(0);
  const [priceRangeIndex, setPriceRangeIndex] = useState<number>(0);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(600);
  const [keyword, setKeyword] = useState<string>("");
  const [filteredMerchantList, setMerchantList] = useState<Merchant[]>([]);
  const [data, setData] = useState<ShopDataResponse>({
    categories: [],
    provinces: [],
    priceRange: [],
    merchants: [],
  });
  const [shopTypeList, setShopTypeList] = useState<string[]>(["ทั้งหมด"]);
  // const subShopTypeList =
  //   shopTypeIndex > 0 ? ["ทั้งหมด", ...data.categories[shopTypeIndex - 1]?.subcategories] : [];
  const [provinceList, setProvinceList] = useState<string[]>(["พื้นที่ใกล้ฉัน", "พื้นที่ทั้งหมด"]);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const loadShopData = useCallback(async () => {
    const data: ShopDataResponse = await getShopData();
    setData(data);
    setShopTypeList([
      "ทั้งหมด",
      ...data.categories.map((category: { name: any }) => category.name),
    ]);
    setProvinceList(["พื้นที่ใกล้ฉัน", "พื้นที่ทั้งหมด", ...data.provinces]);
  }, []);

  useEffect(() => {
    loadShopData();
  }, [loadShopData]);

  useEffect(() => {
    setSubShopTypeIndex(0);
    setMaxPrice(600);
    setMinPrice(0);
  }, [shopTypeIndex]);

  useEffect(() => {
    let merchantList: Merchant[] = data.merchants;
    if (shopTypeIndex > 0) {
      merchantList = merchantList.filter((merchant) =>
        merchant.categoryName.includes(shopTypeList[shopTypeIndex])
      );
    }
    if (selectedProvinceIndex > 2)
      merchantList = merchantList.filter((merchant) =>
        merchant.addressProvinceName.includes(provinceList[selectedProvinceIndex])
      );
    if (shopTypeIndex == 1 && priceRangeIndex > 0) {
      merchantList = merchantList.filter((merchant) => merchant.priceLevel == priceRangeIndex);
    }
    if (shopTypeIndex != 1) {
      console.log("filter price");
      if (maxPrice >= 600)
        merchantList = merchantList.filter((merchant) => merchant.priceLevel <= 4);
      else if (maxPrice >= 300)
        merchantList = merchantList.filter((merchant) => merchant.priceLevel <= 3);
      else if (maxPrice >= 100)
        merchantList = merchantList.filter((merchant) => merchant.priceLevel <= 2);
      else merchantList = merchantList.filter((merchant) => merchant.priceLevel <= 1);

      if (minPrice >= 600)
        merchantList = merchantList.filter((merchant) => merchant.priceLevel >= 4);
      else if (minPrice >= 300)
        merchantList = merchantList.filter((merchant) => merchant.priceLevel >= 3);
      else if (minPrice >= 100)
        merchantList = merchantList.filter((merchant) => merchant.priceLevel >= 2);
      else merchantList = merchantList.filter((merchant) => merchant.priceLevel >= 1);
    }
    if (shopTypeIndex >= 1 && subShopTypeIndex > 0) {
      console.log(
        "check subtype",
        data.categories[shopTypeIndex - 1].subcategories[subShopTypeIndex - 1]
      );
      merchantList = merchantList.filter((merchant) =>
        merchant.subcategoryName.includes(
          data.categories[shopTypeIndex - 1].subcategories[subShopTypeIndex - 1]
        )
      );
    }
    if (keyword.length > 0)
      merchantList = merchantList.filter((merchant) =>
        merchant.shopNameTH.toLowerCase().match(keyword.toLowerCase())
      );
    console.log(shopTypeIndex, selectedProvinceIndex, subShopTypeIndex);
    setMerchantList(merchantList);
  }, [
    data,
    provinceList,
    shopTypeList,
    shopTypeIndex,
    selectedProvinceIndex,
    priceRangeIndex,
    subShopTypeIndex,
    minPrice,
    maxPrice,
    keyword,
  ]);

  return (
    <Flex flexDir="column" w="100%">
      <SearchBar
        onOpen={onOpen}
        setKeyword={(value) => setKeyword(value as string)}
        shopTypes={[...data.categories.map((category) => category.name)]}
        shopTypeIndex={shopTypeIndex}
        setShopType={(nextValue) => {
          setShopTypeIndex(nextValue as number);
        }}
        provinces={provinceList}
        selectedProvinceIndex={selectedProvinceIndex}
        setProvince={(nextValue) => {
          setSelectedProvinceIndex(nextValue as number);
        }}
      />
      <PageContainer>
        <Text
          paddingTop="20px"
          paddingBottom="50px"
          fontFamily="IBMPlexSansThai"
          fontSize="20px"
          fontWeight="700"
        >
          {" "}
          ผลการค้นหา {shopTypeIndex > 0 ? shopTypeList[shopTypeIndex] : ""}
          {shopTypeIndex > 0 && keyword.length > 0 ? ` , ` : ""}
          {keyword.length > 0 ? keyword : ""} ทั้งหมด
        </Text>
        <Flex flexDir="row">
          <Flex
            flex={1}
            flexDir="column"
            paddingRight="30px"
            display={["none", "inherit", "inherit"]}
          >
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
              setSubShopType={(nextValue) => {
                setSubShopTypeIndex(nextValue as number);
              }}
              setMinPrice={(nextValue) => {
                setMinPrice(nextValue as number);
              }}
              setMaxPrice={(nextValue) => {
                setMaxPrice(nextValue as number);
              }}
              minPrice={minPrice}
              maxPrice={maxPrice}
              shopTypeIndex={shopTypeIndex}
              subShopTypeIndex={subShopTypeIndex}
              provinceIndex={selectedProvinceIndex}
              priceRangeIndex={priceRangeIndex}
            />
          </Flex>
          <Flex flex={3.1} paddingRight={["0px", "10px"]} flexDir="column">
            {filteredMerchantList.map((merchant) => (
              <ShopCard merchantData={merchant} key={merchant.shopNameTH} />
            ))}
            {filteredMerchantList.length === 0 && (
              <Flex flexDir="column" w="100%" alignItems="center" paddingTop="80px">
                <Text
                  fontFamily="IBMPlexSansThai"
                  fontSize="36px"
                  fontWeight="900"
                  marginBottom="20px"
                >
                  ไม่พบสถานที่ที่คุณกำลังหา
                </Text>
                <Text fontFamily="IBMPlexSansThai" fontSize="14px" fontWeight="400">
                  ร้านค้าที่ท่านค้นหาอาจไม่ได้เข้าร่วมโครงการ คนละครึ่ง
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>

        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"full"}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerHeader p="0px">
                <Flex
                  background="#27397c"
                  h="46px"
                  flexDir="row"
                  color="#fff"
                  justifyContent="space-between"
                  alignItems="center"
                  w="100%"
                >
                  <IconButton
                    background="transparent"
                    height="100%"
                    p="0px"
                    border="0px"
                    aria-label="Search"
                    onClick={onClose}
                    icon={<ChevronLeftIcon fontSize="40px" color="#fff" />}
                  ></IconButton>
                  <Text fontFamily="IBMPlexSansThai" fontSize="20px" fontWeight="700">
                    กรอกผล
                  </Text>
                  <ChevronLeftIcon fontSize="40px" color="transparent" />
                </Flex>
              </DrawerHeader>

              <DrawerBody>
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
                  setSubShopType={(nextValue) => {
                    setSubShopTypeIndex(nextValue as number);
                  }}
                  setMinPrice={(nextValue) => {
                    setMinPrice(nextValue as number);
                  }}
                  setMaxPrice={(nextValue) => {
                    setMaxPrice(nextValue as number);
                  }}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  shopTypeIndex={shopTypeIndex}
                  subShopTypeIndex={subShopTypeIndex}
                  provinceIndex={selectedProvinceIndex}
                  priceRangeIndex={priceRangeIndex}
                />
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </PageContainer>
    </Flex>
  );
};

export default SearchPage;

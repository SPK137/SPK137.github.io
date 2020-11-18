import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { Dispatch, ReactText, SetStateAction, useState } from "react";
import { ShopCategory, ShopDataResponse } from "../utils/types";
import { getIcon, PositionIcon } from "./SearchBar";

const FilterCard: React.FC<{
  setShopType: (nextValue: ReactText) => void;
  setProvince: (nextValue: ReactText) => void;
  setRange: (nextValue: ReactText) => void;
  shopTypeIndex: number;
  provinceIndex: number;
  priceRangeIndex: number;
  data: ShopDataResponse;
}> = ({
  setShopType,
  setProvince,
  setRange,
  shopTypeIndex,
  provinceIndex,
  priceRangeIndex,
  data,
  ...props
}) => {
  const provinceList = ["พื้นที่ใกล้ฉัน", "พื้นที่ทั้งหมด", ...data.provinces];
  const priceList = ["ทั้งหมด", ...data.priceRange];

  return (
    <Flex borderWidth="0.5px" borderColor="rgba(0,0,0,0.65)" background="#fff" w="100%" p="16px">
      <Box>
        <Text fontFamily="IBMPlexSansThai" fontSize="16px" fontWeight="600" paddingBottom="20px">
          ประเภทร้านค้า
        </Text>
        <RadioGroup
          onChange={setShopType}
          value={shopTypeIndex}
          defaultValue="0"
          paddingBottom="40px"
        >
          <Stack direction="column">
            <Radio value="0">
              <Text fontFamily="IBMPlexSansThai" fontSize="14px" fontWeight="400">
                ทั้งหมด
              </Text>
            </Radio>
            {data.categories.map((category, index) => (
              <Radio value={`${index + 1}`}>
                <Text fontFamily="IBMPlexSansThai" fontSize="14px" fontWeight="400">
                  {category.name}
                </Text>
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
        <Text fontFamily="IBMPlexSansThai" fontSize="16px" fontWeight="600" paddingBottom="5px">
          จังหวัด/ใกล้ฉัน
        </Text>
        <Menu>
          <MenuButton
            background="#fff"
            as={Button}
            flex={1}
            minW="100% !important"
            border="gray.300"
            px="10px"
            textAlign="start"
            fontSize="14px"
            fontWeight="400"
            leftIcon={getIcon(provinceList[provinceIndex])}
            rightIcon={<ChevronDownIcon fontSize="22px" color="gray.400" />}
          >
            {provinceList[provinceIndex]}
          </MenuButton>
          <MenuList borderRadius="0px" w="100%" overflowY="scroll" maxH="280px" fontSize="14px">
            {provinceList.map((province, index) => (
              <MenuItem
                onClick={() => {
                  setProvince(index);
                }}
              >
                {getIcon(province)} {province}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Box display={shopTypeIndex != 1 ? "inherit" : "none"}>
          <Text
            display={shopTypeIndex != 1 ? "inherit" : "none"}
            fontFamily="IBMPlexSansThai"
            fontSize="16px"
            fontWeight="600"
            paddingBottom="5px"
          >
            ช่วงราคาสินค้า (บาท)
          </Text>
          <Menu>
            <MenuButton
              background="#fff"
              as={Button}
              flex={1}
              minW="100% !important"
              border="gray.300"
              px="10px"
              textAlign="start"
              fontSize="14px"
              fontWeight="400"
              rightIcon={<ChevronDownIcon fontSize="22px" color="gray.400" />}
            >
              {priceList[provinceIndex]}
            </MenuButton>
            <MenuList borderRadius="0px" w="100%" overflowY="scroll" maxH="280px" fontSize="14px">
              {priceList.map((price, index) => (
                <MenuItem
                  onClick={() => {
                    setRange(index);
                  }}
                >
                  {price}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
        <Text
          display={shopTypeIndex == 1 ? "inherit" : "none"}
          fontFamily="IBMPlexSansThai"
          fontSize="16px"
          fontWeight="600"
          paddingBottom="5px"
        >
          ราคา
        </Text>
        <Text fontFamily="IBMPlexSansThai" fontSize="16px" fontWeight="600" paddingBottom="5px">
          {shopTypeIndex > 0 ? `ประเภท${data.categories[shopTypeIndex - 1]?.name}` : ""}
        </Text>
        <RadioGroup
          display={shopTypeIndex > 0 ? "inherit" : "none"}
          onChange={setShopType}
          value={shopTypeIndex}
          defaultValue="0"
          paddingBottom="40px"
        >
          <Stack direction="column">
            <Radio value="0">
              <Text fontFamily="IBMPlexSansThai" fontSize="14px" fontWeight="400">
                ทั้งหมด
              </Text>
            </Radio>
            {data.categories[shopTypeIndex - 1]?.subcategories.map((subcategory, index) => (
              <Radio value={`${index + 1}`}>
                <Text fontFamily="IBMPlexSansThai" fontSize="14px" fontWeight="400">
                  {subcategory}
                </Text>
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </Box>
    </Flex>
  );
};

export default FilterCard;

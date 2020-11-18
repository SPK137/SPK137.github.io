import { AtSignIcon, ChevronDownIcon, Icon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";

const PositionIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
  </Icon>
);

const SearchField: React.FC<{ provinces: String[] }> = ({ provinces }) => {
  return (
    <Flex flex={1} paddingLeft="25px" flexDir="column">
      <InputGroup maxWidth="1040px" fontFamily="IBMPlexSansThai">
        <InputLeftAddon
          p="0px"
          children={
            <Menu size="80px">
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                leftIcon={<PositionIcon />}
              ></MenuButton>
              <MenuList mw="40px">
                <MenuItem>
                  {" "}
                  <PositionIcon />
                  พื้นที่ใกล้ฉัน
                </MenuItem>
                <MenuItem>พื้นที่ทั้งหมด</MenuItem>
                {/* {provinces.filter((province) => (
                <MenuItem>{province}</MenuItem>
              ))} */}
              </MenuList>
            </Menu>
          }
        />
        <Input
          fontFamily="IBMPlexSansThai"
          placeholder="ค้นหา ชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านค้า OTOP และสินค้าทั่วไป"
        />
        <InputRightAddon
          width="80px"
          justifyContent="center"
          p="0px"
          children={
            <IconButton
              flex={1}
              height="100%"
              p="0px"
              border="0px"
              aria-label="Search"
              icon={<SearchIcon />}
            ></IconButton>
          }
        />
      </InputGroup>
    </Flex>
  );
};

const SearchBar: React.FC<{ provinces: String[] }> = ({ provinces }) => {
  return (
    <Box>
      <Flex w="100%" h="60px" flexDir="row" py="10px" px="10%" flex={1}>
        <Link href="https://search-merchant.คนละครึ่ง.com">
          <Image src="/images/halfhalf-logo.png" w="auto" h="40px" m="0px" p="0px" />
        </Link>
        <SearchField provinces={provinces} />
      </Flex>
      <Flex background="#27397c" h="46px" flexDir="row" color="#fff" px="10%" alignItems="center">
        <Link href="https://search-merchant.คนละครึ่ง.com">
          <Text fontFamily="IBMPlexSansThai" fontSize="14px" textDecoration="underline">
            หน้าแรก{" "}
          </Text>
        </Link>
        <Text fontFamily="IBMPlexSansThai" fontSize="14px" px="12px">
          /
        </Text>
        <Text fontFamily="IBMPlexSansThai" fontSize="14px" fontWeight="bold">
          ค้นหา{" "}
        </Text>
      </Flex>
    </Box>
  );
};

export default SearchBar;

import { Box, CircularProgress, Divider, Flex, Image, Text, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import parse from "html-react-parser";
import { Merchant } from "../utils/types";

const FacilityIcon: React.FC<{ name: string }> = ({ name }) => {
  return (
    <Tooltip label={name} fontSize="md">
      <Flex
        borderColor="green.300"
        borderRadius="999px"
        borderWidth="1px"
        w="34px"
        h="34px"
        marginRight="5px"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={`/images/${name}.png`} w="18px" h="18px" />
      </Flex>
    </Tooltip>
  );
};

const ShopTag: React.FC<{ shopOpen?: boolean }> = ({ shopOpen }) => {
  if (shopOpen)
    return (
      <Flex
        background="green.400"
        fontFamily="IBMPlexSansThai"
        fontSize="12px"
        fontWeight="500"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        borderRadius="3px"
        color="#fff"
        px="8px"
        minH="24px"
      >
        เปิดอยู่
      </Flex>
    );
  else
    return (
      <Flex
        background="gray.400"
        fontFamily="IBMPlexSansThai"
        fontSize="12px"
        fontWeight="500"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        borderRadius="3px"
        color="#fff"
        px="8px"
        minH="24px"
      >
        ปิดแล้ว
      </Flex>
    );
};

const ShopCard: React.FC<{ merchantData: Merchant }> = ({ merchantData, ...props }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const parsedHighlightText = parse(merchantData.highlightText);

  return (
    <>
      {!isLoading ? (
        <Flex w="100%" marginBottom="10px" p="5px" h="240px" bg="#fff" justifyContent="start">
          <Image src={merchantData.coverImageId} objectFit="cover" h="100%" w="22%" />
          <Flex flexDir="column" w="100%" px="20px">
            <Flex alignItems="center" minH="40px" paddingTop="14px">
              <Text
                fontFamily="IBMPlexSansThai"
                fontSize="20px"
                fontWeight="700"
                marginRight="10px"
              >
                {merchantData.shopNameTH}
              </Text>
              <ShopTag shopOpen={merchantData.isOpen === "Y"} />
            </Flex>
            <Flex marginTop="5px">
              <Text fontFamily="IBMPlexSansThai" fontSize="14px" fontWeight="400" color="gray.400">
                {merchantData.subcategoryName}
              </Text>
              <Text
                fontFamily="IBMPlexSansThai"
                fontSize="14px"
                fontWeight="400"
                color="gray.400"
                px="10px"
              >
                |
              </Text>
              <Text fontFamily="IBMPlexSansThai" fontSize="14px" fontWeight="400" color="gray.400">
                {`฿฿฿฿`}
              </Text>
              <Text
                fontFamily="IBMPlexSansThai"
                fontSize="14px"
                fontWeight="400"
                color="gray.400"
                px="10px"
              >
                |
              </Text>
              <Text fontFamily="IBMPlexSansThai" fontSize="14px" fontWeight="400" color="gray.400">
                {`${merchantData.addressDistrictName} ${merchantData.addressProvinceName}`}
              </Text>
            </Flex>
            <Divider my="16px" />
            <Text
              fontFamily="IBMPlexSansThai"
              fontSize="14px"
              fontWeight="400"
              color="gray.400"
              paddingBottom="5px"
            >
              {parsedHighlightText}
            </Text>
            <Flex>
              <Text
                fontFamily="IBMPlexSansThai"
                fontSize="14px"
                fontWeight="600"
                paddingRight="5px"
              >{`สินค้าแนะนำ: `}</Text>
              <Text
                fontFamily="IBMPlexSansThai"
                fontSize="14px"
                fontWeight="400"
                color="gray.400"
                flexDir="row"
              >
                {merchantData.recommendedItems.map(
                  (item, index) =>
                    ` ${item}${index + 1 === merchantData.recommendedItems.length ? "" : ","} `
                )}
              </Text>
            </Flex>
            <Flex w="100%" alignItems="center" flex={1} paddingBottom="15px">
              {merchantData.facilities.includes("ที่จอดรถ") && <FacilityIcon name="ที่จอดรถ" />}
              {merchantData.facilities.includes("รับจองล่วงหน้า") && (
                <FacilityIcon name="รับจองล่วงหน้า" />
              )}
              {merchantData.facilities.includes("สามารถนำสัตว์เลี้ยงเข้าได้") && (
                <FacilityIcon name="สามารถนำสัตว์เลี้ยงเข้าได้" />
              )}
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Flex w="100%" justifyContent="center" alignItems="center">
          <CircularProgress isIndeterminate trackColor="blue.200" size="80px" />
        </Flex>
      )}
    </>
  );
};

export default ShopCard;

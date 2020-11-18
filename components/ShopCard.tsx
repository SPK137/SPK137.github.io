import { CircularProgress, Flex } from "@chakra-ui/react";
import React from "react";

const ShopCard: React.FC = ({ ...props }) => {
  return (
    <Flex w="100%" justifyContent="center" alignItems="center">
      <CircularProgress isIndeterminate trackColor="blue.200" size="80px" />
    </Flex>
  );
};

export default ShopCard;

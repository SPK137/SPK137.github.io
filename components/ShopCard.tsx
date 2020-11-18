import { Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

const ShopCard: React.FC = ({ ...props }) => {
  return (
    <Flex border="1 solid #e2e8f0">
      <Spinner />
    </Flex>
  );
};

export default ShopCard;

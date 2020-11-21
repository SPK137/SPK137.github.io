import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import bg from "../assets/images/result-bg.png";

const PageContainer: React.FC<{
  children?: React.ReactNode;
}> = ({ children, ...props }) => {
  return (
    <Flex
      flexDir="column"
      background={bg}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundAttachment="fixed"
      backgroundRepeat="no-repeat"
      paddingBottom="50px"
    >
      <Flex
        fontFamily="IBMPlexSansThai"
        alignSelf="center"
        flex={1}
        flexDir="column"
        width={["90%", "98%"]}
        {...props}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export { PageContainer };

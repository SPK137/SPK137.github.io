import { Box, Flex, ResponsiveValue } from "@chakra-ui/react";
import React from "react";

const PageContainer: React.FC<{
  children?: React.ReactNode;
  background?: ResponsiveValue<any>;
}> = ({ children, background, ...props }) => {
  return (
    <Flex
      flexDir="column"
      background={background}
      backgroundPosition="bottom"
      backgroundRepeat="no-repeat"
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

import { Box, Flex } from "@chakra-ui/react";
import React, { ReactText } from "react";

const PageContainer: React.FC<{
  children?: React.ReactNode;
  background?: ReactText;
  isNavbar?: boolean;
}> = ({ children, background, isNavbar, ...props }) => {
  return (
    <Flex flexDir="column" background={background}>
      {!isNavbar && <Box h={84} />}
      <Flex alignSelf="center" flex={1} flexDir="column" width={["90%", "1056px"]} {...props}>
        {children}
      </Flex>
    </Flex>
  );
};

export { PageContainer };

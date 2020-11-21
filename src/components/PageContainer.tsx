import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import "../index.css";
import bg from "./result-bg.png";

const PageContainer: React.FC<{
  children?: React.ReactNode;
}> = ({ children, ...props }) => {
  return (
    <div className="bg">
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
    </div>
  );
};

export { PageContainer };

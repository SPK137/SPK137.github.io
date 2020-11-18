import { Box, Flex, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import React, { Dispatch, ReactText, SetStateAction } from "react";

const FilterCard: React.FC<{
  onChange: (nextValue: ReactText) => void;
  shopTypeIndex: number;
}> = ({ onChange, shopTypeIndex, ...props }) => {
  return (
    <Flex borderWidth="0.5px" borderColor="rgba(0,0,0,0.65)" background="#fff" w="100%" p="16px">
      <Box>
        <Text fontFamily="IBMPlexSansThai" fontSize="16px" fontWeight="600" paddingBottom="20px">
          ประเภทร้านค้า
        </Text>
        <Text fontFamily="IBMPlexSansThai" fontSize="16px" fontWeight="600">
          <RadioGroup onChange={onChange} value={shopTypeIndex} defaultValue="0">
            <Stack direction="column">
              <Radio value="0">ทั้งหมด</Radio>
              <Radio value="1">First</Radio>
              <Radio value="2">Second</Radio>
              <Radio value="3">Third</Radio>
            </Stack>
          </RadioGroup>
        </Text>
      </Box>
      <Box></Box>
    </Flex>
  );
};

export default FilterCard;

import { Box, Image, Input } from "@chakra-ui/react"
import React from "react"

const SearchField: React.FC = () => {

  return <Input placeholder="ค้นหา ชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านค้า OTOP และสินค้าทั่วไป">

  </Input>
}

const Navbar: React.FC = () => {

  return <Box w='100%' p="5px" h="40px" display="flex" flexDir="row">
    <Image src="halfhalf-logo.png"/>
    <SearchField/>
  </Box>
}

export default Navbar
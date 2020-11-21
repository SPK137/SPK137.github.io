import axios, { AxiosResponse } from "axios";
import { ShopDataResponse } from "../utils/types";

const axiosConfig = {
  timeout: 30000,
};

async function getShopData(): Promise<ShopDataResponse> {
  const apiResponse: AxiosResponse<ShopDataResponse> = await axios.get<ShopDataResponse>(
    "https://panjs.com/ywc18.json",
    axiosConfig
  );
  const body: ShopDataResponse = await apiResponse.data;
  const nonDuplicateSubCategories: Set<string> = new Set(body.categories[0].subcategories);
  body.categories[0].subcategories = [];
  nonDuplicateSubCategories.forEach((item) => body.categories[0].subcategories.push(item));
  for (let x = 0; x < body.merchants.length; x++) {
    if (body.merchants[x].categoryName === "ร้านอาหาร")
      body.merchants[x].categoryName = "ร้านอาหารและเครื่องดื่ม";
    if (body.merchants[x].categoryName === "แฟชั่น")
      body.merchants[x].categoryName = "สินค้าทั่วไป";
    if (body.merchants[x].categoryName === "งานบริการอื่นๆ / เบ็ดเตล็ด")
      body.merchants[x].categoryName = "สินค้าทั่วไป";
    if (body.merchants[x].subcategoryName === "สินค้า และ บริการ เกี่ยวกับการตกแต่งบ้าน")
      body.merchants[x].subcategoryName = "สินค้าเกี่ยวกับการตกแต่งบ้าน";
  }

  return body;
}

export { getShopData };

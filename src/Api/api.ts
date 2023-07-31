import axios from "axios";

const getProducts = async () => {
  const { data } = await axios.get("https://dummyjson.com/products");
  return data.products;
};

const getProduct = async (productId: string) => {
  console.log("[fetching product id]", productId);
  const { data } = await axios.get(
    `https://dummyjson.com/products/${productId}`
  );
  return data;
};

export { getProducts, getProduct };

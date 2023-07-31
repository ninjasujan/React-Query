import React, { useState } from "react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getProduct, getProducts } from "../Api/api";

const Product: React.FC<unknown> = () => {
  const [productId, setProductId] = useState("");

  const {
    error,
    isLoading,
    data,
  }: UseQueryResult<Array<any>, unknown> = useQuery({
    queryKey: ["product"],
    queryFn: getProducts,
  });

  const getProductQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: () => {
      return getProduct(productId);
    },
    enabled: productId ? true : false,
  });

  console.log("[getProduct]", getProductQuery.data);

  return (
    <React.Fragment>
      {error ? <h5>Error</h5> : null}
      {isLoading ? <h5>Loading...</h5> : null}
      {data
        ? data.map((product, i) => (
            <h5
              onClick={() => {
                setProductId(product.id);
              }}
              key={i}
            >
              Product {i}
            </h5>
          ))
        : null}
    </React.Fragment>
  );
};

export default Product;

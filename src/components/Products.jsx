import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const Products = () => {
  const queryClient = useQueryClient();

  const getProducts = async () => {
      const response = await axios.get("https://dummyjson.com/products");
      const data = response.data;
      return data;
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  let errorMessage;
  let loadingMessage;
  if (isError) {
    errorMessage = (
      <h1 className="text-3xl font-bold text-red-500 text-center my-3">
        Something Went Wrong!!
      </h1>
    );
  }


  if (isLoading) {
    loadingMessage = (
      <h1 className="text-3xl font-bold text-center my-3 animate-bounce">
        Loading...
      </h1>
    );
  }

  console.log(data);

  return (
    <div>
      <h1 className="text-2xl font-bold ">All Products</h1>
      {errorMessage || loadingMessage}
      {data && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-10">
          {data.products.map((product) => (
            <div key={product.id} className="bg-[#F5F6F4] p-10 rounded-md">
              <img src={product?.images} alt={`${product.title} image`} />
              <h3 className="text-2xl  font-semibold text-center text-[#817df2]">{product.title}</h3>
              <p className="text-center text-sm my-1">{product.title}</p>
              </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;

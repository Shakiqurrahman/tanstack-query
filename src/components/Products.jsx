import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

const Products = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const getProducts = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw new Error(
          "Network Error: Please check your internet connection."
        );
      }
      throw error;
    }
  };

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    retry: false,
    staleTime: 10 * 1000,
  });

  console.log(data);

  return (
    <div>
      <h1 className="text-2xl font-bold ">All Products</h1>

      {isLoading && (
        <div className="flex justify-center items-center h-[75vh]">
          <HashLoader className="mx-auto" size={120} />
        </div>
      )}
      {isError && (
        <h1 className="flex justify-center items-center h-[75vh]">
          {error.message}
        </h1>
      )}

      {data && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-10">
          {data.products.map((product) => (
            <div
              onClick={() => navigate(`product-details/${product.id}`)}
              key={product.id}
              className="bg-[#F5F6F4] p-10 rounded-md"
            >
              <img src={product?.thumbnail} alt={`${product.title} image`} />
              <h3 className="text-2xl  font-semibold text-center text-[#817df2]">
                {product.title}
              </h3>
              <p className="text-center text-sm my-1">
                Brand : {product.brand}
              </p>
              <p className="text-center text-3xl mt-2 font-semibold text-[#60dba8]">
                {product.price}$
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;

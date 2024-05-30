import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HashLoader } from "react-spinners";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams({ skip: 0, limit: 6 });

  const skip = parseInt(searchParams.get('skip') || 0);
  const limit = parseInt(searchParams.get('limit') || 6);

  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(
        "https://dummyjson.com/products/categories"
      );
      return response.data;
    },
  });

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["products", limit, skip],
    queryFn: async () => {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      return response.data;
    },
    placeholderData:keepPreviousData,
    retry: false,
    staleTime: 10 * 1000,
  });

  const handleMove = (limitCount) => {

    setSearchParams((prev) => {
      prev.set('skip', Math.max(skip + limitCount, 0))
      return prev;
    })
  };

  return (
    <div className="mb-20">
      <div>
        <div className="relative mt-2 rounded-md flex items-center gap-8 mb-4">
          <input
            onChange={() => {}}
            type="text"
            name="price"
            id="price"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="IPhone"
          />
          <select className="border p-2" onChange={() => {}}>
            <option>Select category</option>
            {categoryData?.map((category, idx) => (
              <option key={idx} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
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
      <div className="flex gap-4 mt-12 justify-center">
        <button
          className="bg-purple-500 text-xl px-4 py-2 text-white rounded"
          onClick={() => {
            handleMove(-limit);
          }}
        >
          Prev
        </button>
        <button
          className="bg-purple-500 text-xl px-4 py-2 text-white rounded"
          onClick={() => {
            handleMove(limit);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;

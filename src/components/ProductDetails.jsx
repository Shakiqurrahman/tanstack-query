import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const ProductDetails = () => {
  const params = useParams();

  const getProduct = async () => {
    const response = await axios.get(
      `https://dummyjson.com/products/${params.id}`
    );
    const data = response.data;
    return data;
  };

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["product"],
    queryFn: getProduct,
    retry:false,
  });



  let errorMessage;
  if (error?.response?.status === 404 ) {
    errorMessage = "Product is Not Found!!"
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center my-8 text-4xl font-bold">Single Products</h1>
      <div>
        {isLoading && (
          <div className="text-center">
            <BeatLoader />
          </div>
        )}
        {isError && (
          <h1 className="text-3xl font-bold text-center my-3">
            {errorMessage} 
          </h1>
        )}
         {data && (
        <div className=" mt-20 flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full">
            <img
              src={data.thumbnail}
              alt={data.title}
              className="w-[60%] h-auto object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="w-full">
            <h2 className="text-3xl font-semibold mb-2">Name: {data.title}</h2>
            <h4 className="text-lg mb-2">Brand: {data.brand}</h4>
            <p className="text-xl text-[#60dba8] mb-2">Price: {data.price}$</p>
            <p className="text-base">Description: {data.description}</p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ProductDetails;

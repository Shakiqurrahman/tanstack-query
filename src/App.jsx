import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Products from "./components/Products";

const App = () => {
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center my-8 text-4xl font-bold">
        Dummy <span className="text-[#60dba8]">Store</span>
      </h1>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          My store
        </h2>
      </div>
      
      <Products />
      
    </div>
  );
};

export default App;

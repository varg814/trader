"use client";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import React, { useState, useEffect } from "react";
import Button from "./components/atoms/button/Button";
import ProductForm from "./components/molecules/productForm/ProductForm";
import ProductCard from "./components/molecules/productCard/ProductCard";

interface User {
  fullName: string;
  email: string;
  isAdmin: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface Product {
  title: string;
  description: string;
  price: number;
}

const Page = () => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [form, setForm] = useState(false);
  const router = useRouter();

  const toggleForm = () => {
    setForm((prev) => !prev);
  };

  useEffect(() => {
    const token = getCookie("accessToken");
    if (!token) {
      router.push("/auth/sign-in");
      return;
    }
    const getProducts = async () => {
      try {
        const respProducts = await fetch("http://localhost:5000/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (respProducts.status === 200) {
          const data = await respProducts.json();
          setProducts(data);
        }
      } catch (error) {
        console.log(error);
        deleteCookie("accessToken");
        router.push("/auth/sign-in");
      }
    };

    getProducts();
  }, [router]);

  useEffect(() => {
    const token = getCookie("accessToken");
    if (!token) {
      router.push("/auth/sign-in");
      return;
    }
    const getUser = async () => {
      try {
        const resp = await fetch("http://localhost:5000/auth/current-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (resp.status === 200) {
          const data = await resp.json();
          setUser(data);
        } else {
          deleteCookie("accessToken");
          router.push("/auth/sign-in");
        }
      } catch (error) {
        console.log(error);
        deleteCookie("accessToken");
        router.push("/auth/sign-in");
      }
    };

    getUser();
  }, [router]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    deleteCookie("accessToken");
    router.push("/auth/sign-in");
  };

  return (
    <div className="flex flex-col items-center">
      <h1>{user.fullName}</h1>
      <h1>{user.email}</h1>
      <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-800 text-white">Log Out</Button>
      <Button onClick={toggleForm} className="bg-green-500 hover:bg-green-800 text-white">Add a Product</Button>
      {form && <ProductForm />}
      {products?.map((product, index) => (
        <ProductCard
          key={index}
          title={product.title}
          description={product.description}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default Page;

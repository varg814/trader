"use client";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import React, { useState, useEffect } from "react";
import Button from "./components/atoms/button/Button";
import ProductForm from "./components/molecules/productForm/ProductForm";
import ProductCard from "./components/molecules/productCard/ProductCard";

interface User {
  _id: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  createdBy: {
    _id: string;
    fullName: string;
    email: string;
  };
  currentUserId: string;
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

  const handleDelete = async () => {
    const token = getCookie("accessToken");
    if (!token) {
      router.push("/auth/sign-in");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/users/${user._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        alert("Account deleted successfully.");
        deleteCookie("accessToken");
        router.push("/auth/sign-in");
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.log("Error deleting user:", error);
      alert("Failed to delete account.");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-200 gap-5">
      <h1>{user.fullName}</h1>
      <h1>{user.email}</h1>
      <h1>{user._id}</h1>
      <Button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-800 text-white"
      >
        Log Out
      </Button>
      <Button
        onClick={toggleForm}
        className={`${
          form
            ? "bg-red-500 hover:bg-red-800"
            : "bg-green-500 hover:bg-green-800"
        } text-white`}
      >
        {form ? "cancel" : "add a product"}
      </Button>
      <Button onClick={handleDelete}>delete account</Button>
      {form && <ProductForm />}
      {products?.map((product, index) => (
        <ProductCard
          key={index}
          _id={product._id}
          title={product.title}
          description={product.description}
          price={product.price}
          createdBy={product.createdBy._id}
          currentUserId={user._id}
        />
      ))}
    </div>
  );
};

export default Page;

import React, { useState } from "react";
import Label from "@/app/components/atoms/label/Label";

import Input from "@/app/components/atoms/input/Input";

import Button from "@/app/components/atoms/button/Button";
import { getCookie } from "cookies-next";

const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !price || !description) return;

    const token = getCookie("accessToken");

    const response = await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        price,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong.");
    }

    console.log("Product created:", data);
    setTitle("");
    setDescription("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="title">Product Title</Label>
        <Input
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="description">Product Description</Label>
        <textarea
          name="description"
          maxLength={30}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description"
        ></textarea>
      </div>

      <div>
        <Label htmlFor="price">Product Price</Label>
        <Input
          name="price"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <Button
        type="submit"
        className="bg-green-500 hover:bg-green-800 text-white"
      >
        Add a Product
      </Button>
    </form>
  );
};

export default ProductForm;

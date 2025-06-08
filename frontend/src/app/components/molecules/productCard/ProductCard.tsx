import React from "react";

interface ProductCardProps {
  title: string;
  description: string;
  price: number;
}

const ProductCard = ({ title, description, price }: ProductCardProps) => {
  return (
    <div className="w-full max-w-[250px] h-[150px] border rounded-lg flex flex-col items-center justify-center gap-5">
      <h1>{title}</h1>
      <p>{description}</p>
      <h1>{price}</h1>
    </div>
  );
};

export default ProductCard;

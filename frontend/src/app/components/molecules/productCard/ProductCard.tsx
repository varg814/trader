import React from "react";
import Image from "next/image";
import ramepoto from "../../../../../public/porsche.jpg";

interface ProductCardProps {
  _id: string;
  title: string;
  description: string;
  price: number;
  createdBy: string;
  currentUserId: string;
}

const ProductCard = ({
  // title,
  // description,
  // price,
  // _id,
  currentUserId,
  createdBy,
}: ProductCardProps) => {
  console.log(createdBy);
  console.log(currentUserId);

  return (
    // <div className="w-full max-w-[250px] h-[250px] border rounded-lg p-3 flex flex-col gap-1.5">
    //   <div className="relative w-full">
    //     <Image
    //       src={ramepoto}
    //       alt="rame"
    //       className="rounded-lg h-[200px] w-full object-cover"
    //     />
    //     {currentUserId === createdBy ? (
    //       <button
    //         onClick={() => console.log(`Delete clicked! ${_id}`)}
    //         className="absolute top-2 right-2 bg-white/80 p-1 rounded-full hover:bg-white shadow"
    //       >
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           strokeWidth={1.5}
    //           stroke="currentColor"
    //           className="w-6 h-6 text-gray-700"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M6 18L18 6M6 6l12 12"
    //           />
    //         </svg>
    //       </button>
    //     ) : (
    //       <button
    //         onClick={() => console.log(`Heart clicked! ${_id}`)}
    //         className="absolute top-2 right-2 bg-white/80 p-1 rounded-full hover:bg-white shadow"
    //       >
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           strokeWidth={1.5}
    //           stroke="currentColor"
    //           className="w-6 h-6 text-red-500"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M21.752 6.506c-1.397-2.132-4.302-3.02-6.732-1.197L12 7.25l-3.02-1.941C6.55 3.486 3.646 4.374 2.248 6.506c-1.432 2.186-.733 5.24 2.248 6.992L12 21.75l7.504-8.252c2.98-1.752 3.68-4.806 2.248-6.992z"
    //           />
    //         </svg>

    //       </button>
    //     )}
    //   </div>

    //   <article className="flex justify-between">
    //     <h1>{title}</h1>
    //     <p>${price.toFixed(2)}</p>
    //   </article>
    //   <p>{description}</p>
    // </div>
    <div className="h-[250px] w-[250px]  rounded-lg bg-white cursor-pointer flex flex-col p-3">
      <Image src={ramepoto} alt="rame" className="w-full h-[180px] rounded-t-lg"/>
      <article className="flex justify-between items-center flex-1">
        <h1 className="font-bold text-lg">item title</h1>
        <h1 className="text-green-500 font-bold text-2xl">$49.99</h1>
      </article>
    </div>
  );
};

export default ProductCard;

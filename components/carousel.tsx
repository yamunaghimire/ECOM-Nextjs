"use client";
import Stripe from "stripe";
import { Card } from "./ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[current];
  const price = currentProduct.default_price as Stripe.Price;

  return (
    <Card className="p-4 text-center">
      {currentProduct.images && currentProduct.images[0] && (
        <Image
          alt={currentProduct.name}
          src={currentProduct.images[0]}
          width={300}
          height={300}
          className="object-cover mx-auto"
        />
      )}
      <h3 className="text-lg font-semibold mt-4">{currentProduct.name}</h3>
      <p className="text-sm text-gray-600 mt-2">
        {(price.unit_amount! / 100).toFixed(2)} {price.currency.toUpperCase()}
      </p>
    </Card>
  );
};

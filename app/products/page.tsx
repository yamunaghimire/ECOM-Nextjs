import { ProductList } from "@/components/product-list";
import { stripe } from "@/lib/stripe";

export default async function ProductPage(){
   const products = await stripe.products.list({
      expand: ["data.default_price"],

    });
  
    return(
      <div>
        <h1 className="text-center font-semi-bold">All Products</h1>
         <ProductList products={products.data}/>
        </div>
     


    );
}
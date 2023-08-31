import Layout from '@/components/Layout';
import Product from '@/models/Product';
import { Store } from '@/utils/Store';
import data from '@/utils/data';
import db from '@/utils/db';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import { toast } from 'react-toastify';

const ProductScreen = (props) => {
    const {product} = props;
    const {state, dispatch} = useContext(Store)
    const router = useRouter();

 
    if(!product){
        return <Layout title='product not found'> Product not found</Layout>
    }
    const addToCartHandler = async () =>{
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`)
      
     
        if(data.countInStock < quantity){
            return toast.error("Sorry. Product is out of stock");
           
        }
        dispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity}})
        router.push('/cart');
    }
  return (
   <Layout title={product.name}>
    <div className="py-2">
        <Link href="/">Back to product</Link>
    </div>
    <div className=" grid md:grid-cols-4  md:gap-3">
        <div className="md:col-span-2">
            <Image
            src={product.image}
            alt={product.name} 
            width={640}
            height={640}
            layout='responsive'
            ></Image>
        </div>
        <div className="">
            <ul>
                <li> <h1 className='text-lg'>Name: {product.name}</h1> </li>
                <li>Category: {product.category}</li>
                <li>Brand: {product.brand}</li>
                <li>Review: {product.rating} of  {product.numReviews}</li>
                <li>Description: {product.description}</li>
            </ul>
        </div>
        <div>
            <div className="card p-5">
            <div className="mb-2 flex justify-between">
                <div className="">Price</div>
                <div className="">$ {product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
                <div className="">Status</div>
                <div className="">{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
            </div>
                <button className='primary-button w-full' onClick={addToCartHandler}>Add to cart</button>
            </div>
        </div>
    </div>
   </Layout>
  )
}

export async function getServerSideProps(context){
    const {params} = context;
    const {slug} = params;

    await db.connect();
  let product = await Product.findOne({slug}).lean();
    await db.disconnect();
    return {
        props: {
          product: product ? db.convertDocToOnj(product) : null,
        },
      };
}

export default ProductScreen;
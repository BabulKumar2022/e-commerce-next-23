import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';
import data from '@/utils/data';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react'

const ProductScreen = () => {
    const {state, dispatch} = useContext(Store)
    const {query} = useRouter();
    const {slug} = query;
    const product =  data.products.find(x => x.slug === slug)
    if(!product){
        return <div > Product not found</div>
    }
    const addToCartHandler = () =>{
        const existItem = state.cart.cartItems.find((x) => x.slug === slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        dispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity}})
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

export default ProductScreen;
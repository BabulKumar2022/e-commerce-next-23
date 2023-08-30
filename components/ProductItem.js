import Link from 'next/link'
import React from 'react'

const ProductItem = ({product, addToCartHandler}) => {
  return (
    <div className='card'>
            <Link href={`/product/${product.slug}`}>
                <img
                src={product.image}   
                alt={product.name}  
                className='rounded shadow'/>
            </Link>
        <div className="flex flex-col p-5 items-center justify-center">
            <Link href={`/product/${product.slug}`}>
                <h2 className='text-lg'>{product.name}</h2>
            </Link>
            <p className='mb-2'>{product.brand}</p>
            <p className=''> $ {product.price}</p>
            <button className='primary-button' type="button"
            onClick={() => addToCartHandler(product)}
            >
                Add to cart
            </button>
        </div>
    </div>
  )
}

export default ProductItem
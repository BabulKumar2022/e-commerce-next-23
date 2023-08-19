import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';


const CartScreen = () => {
    const router = useRouter();
    const {state, dispatch } = useContext(Store);
    const {cart: {cartItems}} = state;
  
    const removeItemHandler = (item) =>{
      dispatch({type: 'CART_REMOVE_ITEM', payload: item})

    }
  return (
    <Layout title="Shopping Cart">
        <h1 className='text-xl mb-2'>Shopping Cart</h1>
        {
          cartItems.length === 0 ?
          (
            <div className="text-xl p-1  inline bg-orange-300">
              Cart is empty. <Link href='/'>Go shopping</Link>
            </div>
          ) :
          (
            <div className="grid md:grid-cols-4 md:gap-5">
              <div className="overflow-x-auto md:col-span-3">
                <table className="min-w-full">
                  <thead className='border-2 bg-slate-400'>
                    <tr>
                      <th className='px-5 text-left'>Item</th>
                      <th className='p-5 text-right'>Quantity</th>
                      <th className='p-5 text-right'>Price</th>
                      <th className='p-5 '>Action</th>
                    
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) =>(
                      <tr key={item.slug} className='border-2 bg-slate-300'>
                        <td>
                          <Link href={`/product/${item.slug}`}>
                            <div className="flex items-center">
                              <Image src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                              />
                              &nbsp;
                              {item.name}
                            </div>
                          </Link>
                        </td>
                        <td className='p-5 text-right'>{item.quantity}</td>
                        <td className='p-5 text-right'>$ {item.price}</td>
                        <td className='p-5 text-center'>
                            <button onClick={() => removeItemHandler(item)}>
                              <div className="h-5 w-5">X</div>
                            </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card p-5">
                      <ul>
                        <li>
                          <div className="pb-3 text-xl">Subtotal( {cartItems.reduce((a, c) => a + c.quantity, 0)} )
                          {' '}
                          : $
                          {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                          </div>
                        </li>
                        <li>
                          <button onClick={()=> router.push('/shipping')} className='primary-button w-full'>Check Out </button>
                        </li>
                      </ul>
              </div>
            </div>
          )
        }
    </Layout>
  )
}

export default CartScreen;
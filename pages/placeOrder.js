import CheckOutWizard from '@/components/CheckOutWizard';
import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';
import Link from 'next/link';
import React, { useContext } from 'react'

const PlaceOrderScreen = () => {
    const {state, dispatch} = useContext(Store);
    const {cart} = state;
    const {cartItems, shippingAddress, paymentMethod} = cart;
  return (
    <Layout title="place order">
    <CheckOutWizard activeStep={3}/>
    <h1 className='mb-4 text-xl'>Place Order</h1>
    {
        cartItems.length === 0 ?
        (<div>
            Cart is empty<Link href="/">Go Shipping</Link>
        </div>) : 
        (<div className='grid md:grid-cols-4 md:gap-5'>
            <div className="overflow-x-auto md:col-span-2">
                <div className="card p-5">
                    <h2 className="mb-2 text-lg">Shipping Address</h2>
                    {shippingAddress.fullName},
                    {shippingAddress.city}, {' '}
                    {shippingAddress.postalCode}, {' '}
                    {shippingAddress.country}
                </div>
                <div className="">
                    <Link href='/shipping'>Edit</Link>
                </div>
            </div>

        </div>)
    }
    </Layout>
  )
}

export default PlaceOrderScreen;
import CheckOutWizard from '@/components/CheckOutWizard';
import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';
import { getError } from '@/utils/error';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const PlaceOrderScreen = () => {
    const {state, dispatch} = useContext(Store);
    const {cart} = state;
    const {cartItems, shippingAddress, paymentMethod} = cart;
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
    const itemsPrice = round2(cartItems.reduce((a, c) => a + c.quantity * c.price, 0))
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice =round2(itemsPrice + shippingPrice + taxPrice);
  const router = useRouter();
  useEffect(() =>{
    if(! paymentMethod){
        router.push('/payment')
    }
  },[paymentMethod, router]);


  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () =>{

    try {
        setLoading(true);
        const {data} = await axios.post('/api/orders', {
            orderItems: cartItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        });
        setLoading(false);
        dispatch({type: 'CART_CLEAR_ITEMS'});
        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                cartItems: [],
            })
        );
        router.push(`/order/${data._id}`);
    } catch (error) {
        setLoading(false);
        toast.error(getError(err));
    }
  }
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
// PaymentScreen.auth = true;
export default PlaceOrderScreen;
"use client"
import { Store } from '@/utils/Store'
import { signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import {Menu} from '@headlessui/react'
import 'react-toastify/dist/ReactToastify.css';
import DropdownLink from './DropdownLink'
import Cookies from 'js-cookie'

const Layout = ({title, children}) => {
  const {status, data: session} = useSession();
  const {state, dispatch } = useContext(Store);
  const {cart} = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(()=>{
    setCartItemsCount(cart.cartItems.reduce((a, c)=> a + c.quantity, 0))
  },[cart.cartItems]);

  const logoutClickHandler = () =>{
    Cookies.remove('cart')
    dispatch({type: 'CART_RESET'})
    signOut({ callbackUrl: '/login'})
  }

  return (
    <>
      <Head>
        <title>{title? title + '-e-commerce': 'e-commerce'}</title>
        <meta name="description" content='E-commerce website'/>
      </Head>
      <ToastContainer position='bottom-center ' limit={1}/>
        <div className="flex min-h-screen flex-col justify-between">
            <header>
                <nav className='flex px-4 h-12 justify-between shadow-md items-center'>
                    <Link className='text-lg font-bold' href="/"> E-commerce </Link>
                    <div className=''>
                        <Link href="/cart" className='px-2'> cart 
                        {cartItemsCount > 0 && (
                          <span className='ml-1 rounded-full bg-red-600 px-2 py-1 font-bold text-white'>
                            {cartItemsCount}
                          </span>
                        )}
                        </Link>
                       
                          {
                            status === 'loading' ? ('Loading') : session?.user ?
                            (
                              <Menu as='div' className='relative, inline-block'>
                                <Menu.Button className='text-blue-600'>
                                    {session.user.name}
                                </Menu.Button>
                                  <Menu.Items className='absolute right-0 origin-top-right shadow-lg'>
                                    <Menu.Item>
                                      <DropdownLink className='dropdown-link' href='/profile'>
                                          Profile
                                      </DropdownLink>
                                    </Menu.Item>
                                    <Menu.Item>
                                      <DropdownLink className='dropdown-link' href='/order'>
                                          Order History
                                      </DropdownLink>
                                    </Menu.Item>
                                    <Menu.Item>
                                      <DropdownLink onDoubleClick={logoutClickHandler} className='dropdown-link' href='/login'>
                                         Logout
                                      </DropdownLink>
                                    </Menu.Item>
                                  </Menu.Items>
                              </Menu>
                            ):
                              (<Link href="login">Login</Link>)
                            
                          }  
                    </div>
                </nav>
            </header>
            <main className='container m-auto mt-4 px-4'>{children}</main>
            <footer className='flex h-10 justify-center items-center shadow-inner'><p> Copyright &copy; 2023 e-commerce</p></footer>
        </div>
    </>
  )
}

export default Layout;
"use client"
import { Store } from '@/utils/Store'
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext } from 'react'

const Layout = ({title, children}) => {
  const {state } = useContext(Store);
  const {cart} = state;
  return (
    <>
      <Head>
        <title>{title? title + '-e-commerce': 'e-commerce'}</title>
        <meta name="description" content='E-commerce website'/>
      </Head>
        <div className="flex min-h-screen flex-col justify-between">
            <header>
                <nav className='flex px-4 h-12 justify-between shadow-md items-center'>
                    <Link className='text-lg font-bold' href="/"> E-commerce </Link>
                    <div className=''>
                        <Link href="/cart" className='px-2'> cart 
                        {cart.cartItems.length > 0 && (
                          <span className='ml-1 rounded-full bg-red-600 px-2 py-1 font-bold text-white'>
                            {cart.cartItems.reduce((a, c)=> a + c.quantity, 0)}
                          </span>
                        )}
                        </Link>
                        <Link href="/login" className='px-2'> Login</Link>
                    </div>
                </nav>
            </header>
            <main className='container m-auto mt-4 px-4'>{children}</main>
            <footer className='flex h-10 justify-center items-center shadow-inner'><p> Copyright &copy; 2023 e-commerce</p></footer>
        </div>
    </>
  )
}

export default Layout
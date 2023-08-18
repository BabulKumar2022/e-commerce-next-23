"use client"
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const Layout = ({title, children}) => {
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
                        <Link href="/cart" className='px-2'> cart </Link>
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
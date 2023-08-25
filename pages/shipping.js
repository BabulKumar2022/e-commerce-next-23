import CheckOutWizard from '@/components/CheckOutWizard';
import Layout from '@/components/Layout';
import React from 'react'
import { useForm } from 'react-hook-form';

const ShippingScreen = () => {
  const {
    handleSubmit,
    register,
    formState: {errors},
    setValue,
    getValue

  } = useForm();
  const submitHandler = () =>{

  }
  return (
    <Layout title="Shipping Address">
        <CheckOutWizard activeStep={1}/>
        <from className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className='md-4 text-xl'>Shipping</h1>
          <div className="md-4">
            <label htmlFor="fulName">Full Name</label>
            <input className='w-full' 
            id="fullName"
            autoFocus
            {...register('fullName', {required: "Please enter full name"})}/>
            {errors.fullName && ( <div className='text-red-500'>{errors.fullName.message}</div>)}
          </div>
          <div className="md-4">
            <label htmlFor="fulName">Address</label>
            <input className='w-full' 
            id="address"
            autoFocus
            {...register('address', {required: "Please enter address", minLength: {value: 3,message: 'Address is more than 2 char'}})}/>
            {errors.fullName && ( <div className='text-red-500'>{errors.address.message}</div>)}
          </div>
        </from>
    </Layout>
  )
}

export default ShippingScreen;
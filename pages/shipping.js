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
            <label htmlFor="fullName">Full Name</label>
            <input className='w-full' 
            id="fullName"
            autoFocus
            {...register('fullName', {required: "Please enter full name"})}/>
            {errors.fullName && ( <div className='text-red-500'>{errors.fullName.message}</div>)}
          </div>
          <div className="md-4">
            <label htmlFor="address">Address</label>
            <input className='w-full' 
            id="address"
            autoFocus
            {...register('address', {required: "Please enter address", minLength: {value: 3,message: 'Address is more than 2 char'}})}/>
            {errors.address && ( <div className='text-red-500'>{errors.address.message}</div>)}
          </div>
          <div className="md-4">
            <label htmlFor="city">City Name</label>
            <input className='w-full' 
            id="city"
            autoFocus
            {...register('city', {required: "Please enter city name"})}/>
            {errors.city && ( <div className='text-red-500'>{errors.fullName.message}</div>)}
          </div>
          <div className="md-4"> 
            <label htmlFor="postalCode">Postal code</label>
            <input className='w-full' 
            id="postalCode"
            autoFocus
            {...register('postalCode', {required: "Please enter city name"})}/>
            {errors.city && ( <div className='text-red-500'>{errors.city.message}</div>)}
          </div>
          <div className="md-4"> 
            <label htmlFor="country">Country</label>
            <input className='w-full' 
            id="country"
            autoFocus
            {...register('country', {required: "Please enter country"})}/>
            {errors.country && ( <div className='text-red-500'>{errors.country.message}</div>)}
          </div>
        </from>
    </Layout>
  )
}

export default ShippingScreen;
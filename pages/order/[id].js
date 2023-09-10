import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";



function reducer(state, action){
    switch (action.type){
        case 'FETCH_REQUEST':
            return {...state, loading: true, error: ''};
        case 'FETCH_SUCCESS':
            return{...state, loading: false, order: action.payload, error: ''};
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};
        default:
            state;
    }
}



function OrderScreen(){
    const {query} = useRouter();
    const orderId = query.id;
    const [
        {loading, error, order},
        dispatch
    ] = useReducer(reducer,{
        loading: true,
        order: {},
        error: '',
    });

    useEffect(()=>{
const fetchOrder = async () => {
    dispatch({type: 'FETCH_REQUEST'});
    const {data} = await axios.get(`/api/orders/${orderId}`)
}
    },[])


    return(
        <Layout title={`Order ${orderId}`}>

        </Layout>
    )
}
OrderScreen.auth = true;
export default OrderScreen;
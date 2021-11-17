import{
    NEW_CLIENT,
    ALL_CLIENTS, 
    GET_CLIENT_BY_ID,
    CLIENT_UPDATE,
    NEW_SUPPLIER,
    GET_ALL_SUPPLIER, 
    GET_SUPPLIER_BY_ID,
    SUPPLIER_UPDATE, 
    CREATE_PRODUCT, 
    UPDATE_PRODUCT, 
    ALL_PRODUCTS,
    GET_PRODUCT_BY_ID, 
    SEARCH_PRODUCTS, 
    DELETE_PRODUCT, 
    CREATE_ORDER, 
    ALL_ORDERS, 
    ALL_BUDGETS,
    ALL_BILLS,
    ALL_VEHICLES,
    ALL_SHOPPINGS,
    ALL_SALES,
    GET_ORDER_BY_ID, 
    DELETE_ORDER, 
    CREATE_VEHICLE,
    GET_ALL_VEHICLES, 
    EDIT_VEHICLE,
    GET_VEHICLE_BY_ID,
    DELETE_VEHICLE,
    ALL_SUPPLIER,
    ALL_CASHMOVEMENTS,
    ALL_CHEQUES,
    
} from '../constants/constants'


import dotenv from 'dotenv'
import axios from 'axios';
import { getDisplayName } from '@mui/utils';

const URL = 'http://localhost:5001';

export const getOrder =(order)=>async(dispatch) => {
    try {
        const order1 = await axios.get(`http://localhost:5001/order`, order);
        console.log(order1,"holaaaaaa")
        dispatch({
            type: ALL_ORDERS,
            payload:order1.data
        })
    } catch (err){
        console.log(err)
    }
}

export const getBudget =(budget) =>async(dispatch)=>{
    try{
        const budget1 = await axios.get(`http://localhost:5001/budget`, budget);
        console.log(budget1,"funcaaa")
        dispatch({
            type:ALL_BUDGETS,
            payload:budget1.data
        })
    }catch(err){
        console.log(err)
    }
}
export const getBill =(bill) =>async(dispatch)=>{
    try{
        const bill1 = await axios.get(`http://localhost:5001/bill`, bill);
        console.log(bill1,"funcaaa")
        dispatch({
            type:ALL_BILLS,
            payload:bill1.data
        })
    }catch(err){
        console.log(err)
    }
}
export const getVehicle =(vehicle) =>async(dispatch)=>{
    try{
        const vehicle1 = await axios.get(`http://localhost:5001/vehicle`, vehicle);
        console.log(vehicle1,"funcaaa")
        dispatch({
            type:ALL_VEHICLES,
            payload:vehicle1.data
        })
    }catch(err){
        console.log(err)
    }
}
export const getShopping =(shopping) =>async(dispatch)=>{
    try{
        const shopping1 = await axios.get(`http://localhost:5001/shopping`, shopping);
        console.log(shopping1,"funcaaa")
        dispatch({
            type:ALL_SHOPPINGS,
            payload:shopping1.data
        })
    }catch(err){
        console.log(err)
    }
}
export const getSale =(sale) =>async(dispatch)=>{
    try{
        const sale1 = await axios.get(`http://localhost:5001/sale`, sale);
        console.log(sale1,"funcaaa")
        dispatch({
            type:ALL_SALES,
            payload:sale1.data
        })
    }catch(err){
        console.log(err)
    }
}
export const getProduct =(product) =>async(dispatch)=>{
    try{
        const product1 = await axios.get(`http://localhost:5001/product`, product);
        console.log(product1,"funcaaa")
        dispatch({
            type:ALL_PRODUCTS,
            payload:product1.data
        })
    }catch(err){
        console.log(err)
    }
}
export const getClient =(client) =>async(dispatch)=>{
    try{
        const client1 = await axios.get(`http://localhost:5001/client`, client);
        console.log(client1,"funcaaa")
        dispatch({
            type:ALL_CLIENTS,
            payload:client1.data
        })
    }catch(err){
        console.log(err)
    }
}
export const getSupplier =(supplier) =>async(dispatch)=>{
    try{
        const supplier1 = await axios.get(`http://localhost:5001/supplier`, supplier);
        console.log(supplier1,"funcaaa")
        dispatch({
            type:ALL_SUPPLIER,
            payload:supplier1.data
        })
    }catch(err){
        console.log(err)
    }
}
export const getCashMovement =(cashmovement) =>async(dispatch)=>{
    try{
        const cashmovement1 = await axios.get(`http://localhost:5001/cash`, cashmovement);
        console.log(cashmovement1,"funcaaa")
        dispatch({
            type:ALL_CASHMOVEMENTS,
            payload:cashmovement1.data
        })
    }catch(err){
        console.log(err)
    }
}
export const getCheque =(cheque) =>async(dispatch)=>{
    try{
        const cheque1 = await axios.get(`http://localhost:5001/cheque`, cheque);
        console.log(cheque1,"funcaaa")
        dispatch({
            type:ALL_CHEQUES,
            payload:cheque1.data
        })
    }catch(err){
        console.log(err)
    }
}
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
  GET_ALL_PRODUCTS,
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
  EDIT_ORDER,
  GET_ORDER_BY_ID, 
  DELETE_ORDER, 
  CREATE_VEHICLE,
  GET_ALL_VEHICLES, 
  EDIT_VEHICLE,
  GET_VEHICLE_BY_ID,
  DELETE_VEHICLE,
  ALL_PRODUCTS,
  ALL_SUPPLIER,
  ALL_CASHMOVEMENTS,
  ALL_CHEQUES,
  
} from '../constants/constants'

const initialState ={
 allOrders:[],
 allBudgets:[],
 allBills:[],
 allVehicles:[],
 allShoppings:[],
 allSales:[],
 allProducts:[],
 allClients:[],
 allSupplier:[],
}

const rootReducer =(state=initialState, action) =>{
  switch(action.type){
    case ALL_ORDERS:
      return {
        ...state,
        allOrders:action.payload,
      }
    case ALL_BUDGETS:
      return {
        ...state,
        allBudgets:action.payload,
      }
    case ALL_BILLS:
      return {
        ...state,
        allBills:action.payload,
      }
    case ALL_VEHICLES:
      return {
        ...state,
        allVehicles:action.payload,
      }
    case ALL_SHOPPINGS:
      return {
        ...state,
        allShoppings:action.payload,
      }
    case ALL_SALES:
      return {
        ...state,
        allSales:action.payload,
      }
    case ALL_PRODUCTS:
      return {
        ...state,
        allProducts:action.payload,
      }
    case ALL_CLIENTS:
      return {
        ...state,
        allClients:action.payload,
      }
    case ALL_SUPPLIER:
      return {
        ...state,
        allSupplier:action.payload,
      }
    case ALL_CASHMOVEMENTS:
      return {
        ...state,
        allCashMovements:action.payload,
      }
    case ALL_CHEQUES:
      return {
        ...state,
        allCheques:action.payload,
      }
   default:
  return state;
}
}

export default rootReducer;
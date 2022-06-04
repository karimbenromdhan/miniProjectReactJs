import {GET_PRODUCTS,DELETE_PRODUCT,ADD_PRODUCT,GET_SINGLE_PRODUCT,UPDATE_PRODUCT} from "../Types" 
import {ProductService} from "../Services/Product-service";

export const loadProducts=()=>{
    return (dispatch)=>{
        ProductService.fetchProducts()
        .then(res=>{ 
        dispatch({type:GET_PRODUCTS,  
        payload:res.data})
                
        }).catch((error)=>console.log(error));
        
    }
}
export const loadSingleproduct=(_id)=>{
    return (dispatch)=>{
        ProductService.fetchProductById(_id)
        .then((res)=>{  
            dispatch({type:"SINGLE_PRODUCT_FETCHED",  
            payload:res.data});
           }).catch((error)=>console.log(error));
        
    }
}

export const addproduct=(product)=>{
    return (dispatch)=>{
      ProductService.addProduct(product)
      .then((res)=>{
        dispatch({type:ADD_PRODUCT,  
            payload:res.data})
           
        }).catch((error)=>console.log(error));
        
    }
}

export const deleteproduct=(_id)=>{
    return dispatch=>{
      ProductService.deleteProduct(_id)
      .then((res)=>{
        dispatch({type:DELETE_PRODUCT,  
            payload:_id})
            }).catch((error)=>console.log(error));
        
    }
}
export const updateproduct=(product)=>{ 
    return dispatch=>{
      ProductService.editProduct(product)
      .then((res)=>{
        dispatch({type:UPDATE_PRODUCT,  
            payload:res.data})
           }).catch((error)=>console.log(error));
        
    }
}

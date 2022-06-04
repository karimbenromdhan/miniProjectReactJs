import Axios from "../Axios/Api";
const PRODUCT_API="/products"

    const fetchProducts=async()=> {
        return await Axios.get(PRODUCT_API);
        }
     const fetchProductById=async(productId)=> {
        return await Axios.get(PRODUCT_API + '/' + productId);
        }
    const deleteProduct=async(productId) =>{
        return await Axios.delete(PRODUCT_API + '/' + productId);
        }
     const addProduct=async(product)=> { 
        return await Axios.post(PRODUCT_API, product);
    
        }    
     const editProduct=(product) =>{ 
        return Axios.put(PRODUCT_API + '/' + product._id, product);
    
        }
         
    export const ProductService = {
        fetchProducts,
        fetchProductById,
        deleteProduct,
        addProduct,
        editProduct
    }

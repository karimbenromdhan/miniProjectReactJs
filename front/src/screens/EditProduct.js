import { useDispatch, useSelector } from "react-redux";

import React, { useState, useEffect } from "react";

import { useNavigate,useParams } from "react-router-dom";

import {loadSingleproduct,updateproduct} from "../actions/productsAction";




import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

const EditProduct = () => {
	const addproductstate = useSelector((state) => state.addNewProductReducer);
	const { loading, error, success } = addproductstate;
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [countInStock, setCountInStock] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");
	const [category, setCateogry] = useState("");



    const dispatch = useDispatch();
    const navigate = useNavigate();
 
    const params = useParams();
    const _id=params._id;  
 
    useEffect(() => {
      console.log(_id)
        dispatch(loadSingleproduct(_id));
    },[_id,dispatch]);





    const product = useSelector((state) => state.getProductByIdReducer.product);
    console.log(product)
      useEffect(()=>{
          setName(product.name);
          setPrice(product.price);
          setCountInStock(product.countInStock);
          setCateogry(product.category);
          setDescription(product.description);
          setImage(product.image);
          },[product]);
   
        const handleSubmit = async(event)=> {
            event.preventDefault(); 
            const prod={
              _id:_id,  
              name: name,
              price: Number(price),
              countInStock: Number(countInStock),
              category:category,
              description:description,
              image:image,
              };   
              dispatch(updateproduct(prod)); 
              navigate("/admin/productslist");
         }
	

	return (
		<div className="text-center new-product px-3">
			<h2 className="text-center">Ajouter un nouveau produit</h2>
			{loading && <Loader />}
			{error && <Error error="Impossible d'ajouter le produit. Veuillez réessayer" />}
			{success && <Success success="Produit ajouté avec succès" />}
			<form onSubmit={handleSubmit}>
				<div>
					<label>Nom du produit :</label>
					<input
						value={name}
						onChange={(e)=>{setName(e.target.value)}}
						className="form-control"
						type="text"
						placeholder="Nom du produit"
					/>{" "}
				</div>
				<div>
					<label>Prix ​​du produit:</label>
					<input
						value={price}
						onChange={(e)=>{setPrice(e.target.value)}}
						className="form-control"
						type="number"
						placeholder="Prix ​​du produit"
					/>{" "}
				</div>
				<div>
					{" "}
					<label>Nombre dans le stock: </label>
					<input
						value={countInStock}
						onChange={(e)=>{setCountInStock(e.target.value)}}
						className="form-control"
						type="number"
						placeholder="Nombre dans le stock"
					/>
				</div>
				<div>
					<label>Catégorie de produit:</label>
					<select
						className="form-select product-category"
            onChange={(e)=>{setCateogry(e.target.value)}}
            value={category}
					>
							<option value="Pc Portable">Pc Portable</option>
							<option value="PC Portable Gamer">PC Portable Gamer</option>
							<option value="Pc de bureau">Pc de bureau</option>
							<option value="PC Gamer">PC Gamer</option>
					</select>{" "}
				</div>
				<div>
					<label>Description du produit:</label>
					<input
						value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
						className="form-control"
						type="text"
						placeholder="Description du produit"
					/>{" "}
				</div>
				<div>
					<label>URL de l'image du produit:</label>
					<input
						value={image}
						onChange={(e)=>{setImage(e.target.value)}}
						className="form-control"
						type="text"
						placeholder="URL de l'image du produit"
					/>
				</div>
				<button value="submit" className="btn btn-primary mt-3">
				Ajouter un produit
				</button>
			</form>
		</div>
	);
};

export default EditProduct;

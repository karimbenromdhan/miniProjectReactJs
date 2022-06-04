import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "../actions/productActions";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

const AddNewProduct = () => {
	const dispatch = useDispatch();
	const addproductstate = useSelector((state) => state.addNewProductReducer);
	const { loading, error, success } = addproductstate;
	const [productName, setProductName] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [productStock, setProductStock] = useState("");
	const [productDescription, setProductDescription] = useState("");
	const [productImage, setProductImage] = useState("");
	const [productCategory, setProductCateogry] = useState("");
	const categories=[
        "Pc Portable",
        "PC Portable Gamer",
        "Pc de bureau",
        "PC Gamer",
    ]
	const addNewProductHandler = (e) => {
		e.preventDefault();
		const product = {
			name: productName,
			price: Number(productPrice),
			countInStock: parseInt(productStock),
			category: productCategory,
			description: productDescription,
			image: productImage,
		};
		console.log(product);
		dispatch(addNewProduct(product));
	};

	return (
		<div className="text-center new-product px-3">
			<h2 className="text-center">Ajouter un nouveau produit</h2>
			{loading && <Loader />}
			{error && <Error error="Impossible d'ajouter le produit. Veuillez réessayer" />}
			{success && <Success success="Produit ajouté avec succès" />}
			<form onSubmit={addNewProductHandler}>
				<div>
					<label>Nom du produit :</label>
					<input
						value={productName}
						onChange={(e) => setProductName(e.target.value)}
						className="form-control"
						type="text"
						placeholder="Nom du produit"
					/>{" "}
				</div>
				<div>
					<label>Prix ​​du produit:</label>
					<input
						value={productPrice}
						onChange={(e) => setProductPrice(e.target.value)}
						className="form-control"
						type="number"
						placeholder="Prix ​​du produit"
					/>{" "}
				</div>
				<div>
					{" "}
					<label>Nombre dans le stock: </label>
					<input
						value={productStock}
						onChange={(e) => setProductStock(e.target.value)}
						className="form-control"
						type="number"
						placeholder="Nombre dans le stock"
					/>
				</div>
				<div>
					<label>Catégorie de produit:</label>
					
					
					<select 
                                className="h-12 w-[18vw] outline-none placeholder:- pr-[1vmax] pl-[4vmax] box-border rounded-md border-1 border-black focus:outline-none focus:ring focus:ring-slate-400"
                                onChange={(e)=>setProductCateogry(e.target.value)}>

                                <option 
                                id="colorSelectOptions1"
                                value="">Choose Category</option>
                                {categories.map((cate)=>(
                                    <option id="colorSelectOptions" key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                                </select>
					
					{" "}
				</div>
				<div>
					<label>Description du produit:</label>
					<input
						value={productDescription}
						onChange={(e) => setProductDescription(e.target.value)}
						className="form-control"
						type="text"
						placeholder="Description du produit"
					/>{" "}
				</div>
				<div>
					<label>URL de l'image du produit:</label>
					<input
						value={productImage}
						onChange={(e) => setProductImage(e.target.value)}
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

export default AddNewProduct;

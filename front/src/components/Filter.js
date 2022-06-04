import React, { useState } from "react";
import { filterProducts } from "../actions/productActions";
import { useDispatch } from "react-redux";

export default function Filter() {
	const dispatch = useDispatch();
	const [searchKey, setSearchKey] = useState("");
	const [sort, setSort] = useState("popular");
	const [category, setCategory] = useState("all");

	const handleSearch = (e) => {
		e.preventDefault();
		dispatch(filterProducts(searchKey, sort, category));
	};

	return (
		<div className="mb-4">
			<div className="row justify-content-center align-items-center">
				<form className="search-form" onSubmit={handleSearch}>
					<div className="col-md-3 ml-2">
						<input
							id="search"
							value={searchKey}
							onChange={(e) => {
								setSearchKey(e.target.value);
							}}
							type="text"
							placeholder="Search Products"
							className="form-control"
						/>
					</div>
					<div className="col-md-2 mt-2">
						<select
							value={sort}
							onChange={(e) => {
								setSort(e.target.value);
								dispatch(filterProducts(searchKey, e.target.value, category));
							}}
							className="form-select"
						>
							<option value="popular">populaire</option>
							<option value="htl">Haut en bas</option>
							<option value="lth">De bas en haut</option>
							<option value="rating">Évaluation</option>
						</select>
					</div>

					<div className="col-md-2 mt-2">
						<select
							value={category}
							onChange={(e) => {
								setCategory(e.target.value);
								dispatch(filterProducts(searchKey, sort, e.target.value));
							}}
							className="form-select"
						>
							<option value="all">Tout</option>
							<option value="Pc Portable">Pc Portable</option>
							<option value="PC Portable Gamer">PC Portable Gamer</option>
							<option value="Pc de bureau">Pc de bureau</option>
							<option value="PC Gamer">PC Gamer</option>
						</select>
					</div>
					<div className="col-md-2 mt-2">
						<button
							value="submit"
							className="btn border border-dark btn-dark text-light"
						>
							Recherche
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

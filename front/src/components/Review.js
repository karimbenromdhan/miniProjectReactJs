import React, { useState } from "react";
import Rating from "react-rating";
import FullStar from "../assets/images/full-star.png";
import EmptyStar from "../assets/images/empty-star.png";
import { useDispatch } from "react-redux";
import { addProductReview } from "../actions/productActions";

function Review({ product }) {
	const dispatch = useDispatch();

	const [rating, setRating] = useState(5);
	const [comment, setComment] = useState("");

	const reviewHandler = () => {
		if (!localStorage.getItem("currentUser")) {
			window.location.href = "/login";
			return;
		}
		const currentUser = JSON.parse(localStorage.getItem("currentUser"));
		let hasReview = false;
		for (let i = 0; i < product.reviews.length; i++) {
			if (product.reviews[i].userId === currentUser._id) {
				hasReview = true;
			}
		}
		if (hasReview) {
			return alert("Vous avez déjà évalué ce produit");
		} else {
			const review = {
				rating: rating,
				comment: comment,
			};
			dispatch(addProductReview(review, product._id));
		}
	};

	return (
		<div>
			<div className="text-center">
				<h2 className="text-center">Donnez votre avis</h2>
				<Rating
					onChange={(e) => {
						setRating(e);
					}}
					initialRating={rating}
					emptySymbol={
						<img
							style={{ width: "30px", color: "black" }}
							alt="étoiles vides"
							src={EmptyStar}
							className="icon"
						/>
					}
					fullSymbol={
						<img
							style={{ width: "30px" }}
							alt="plein d'étoiles"
							src={FullStar}
							className="icon"
						/>
					}
				/>
				<input
					type="text"
					className="form-control mt-3"
					value={comment}
					onChange={(e) => {
						setComment(e.target.value);
					}}
					placeholder="Ajoutez votre commentaire"
				/>
				<button onClick={reviewHandler} className="btn mt-3 submit-review-btn">
				Poster le commentaire
				</button>
				<hr />
			</div>
			{product.reviews && product.reviews.length > 0 ? (
				<>
					{" "}
					<h2 className="mt-3 text-center">Dernières critiques</h2>
					{product.reviews &&
						product.reviews.map((review, i) => {
							return (
								<div key={i} className="text-left justify-content-left">
									<Rating
										style={{ display: "flex", justifyContent: "left" }}
										className="stars"
										onChange={(e) => {
											setRating(e);
										}}
										initialRating={review.rating}
										emptySymbol={
											<img
												style={{ width: "30px", color: "black" }}
												alt="étoiles vides"
												src={EmptyStar}
												className="icon"
											/>
										}
										fullSymbol={
											<img
												style={{ width: "30px" }}
												alt="plein d'étoiles"
												src={FullStar}
												className="icon"
											/>
										}
										readonly
									/>
									<p className="text-secondary">
										<i>by {review.name}</i>
									</p>
									<p className="text-dark">{review.comment}</p>
									<hr />
								</div>
							);
						})}
				</>
			) : (
				<h2 className="text-center">Pas encore d'avis</h2>
			)}
		</div>
	);
}

export default Review;

import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../actions/orderActions";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

export default function Checkout({ amount }) {
	const orderstate = useSelector((state) => state.placeOrderReducer);
	const { loading, success, error } = orderstate;
	const dispatch = useDispatch();

	const tokenHandler = (token) => {
		console.log(token);
		dispatch(placeOrder(token, amount));
	};

	const validate = () => {
		if (!localStorage.getItem("currentUser")) {
			window.location.href = "/login";
		}
	};

	return (
		<div>
			{loading && <Loader />}
			{success && <Success success="Votre commande a été passée avec succès" />}
			{error && <Error error="Impossible de traiter votre commande" />}
			<StripeCheckout
				token={tokenHandler}
				amount={amount * 100}
				shippingAddress
				billingAddress
				currency="USD"
				stripeKey="pk_test_51Kz7K4F0tVoESyfYv9CyiMZyMLAhbipcZ7rur2L1uQTvAuDTMda7qVLLdgMiuCeypVlHo4ImOHqC0ynRZwWD7oqc00r0eAkPWM"
			>
				<button onClick={validate} className="btn btn-dark text-light">
				Payez maintenant
				</button>
			</StripeCheckout>
		</div>
	);
}

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../actions/orderActions";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { formatPrice, formatAddress } from "../helpers/Formatter";

function OrderInfo() {
	const dispatch = useDispatch();
	const orderstate = useSelector((state) => state.getOrderByIdReducer);
	const { order, loading, error } = orderstate;
	const orderId = useParams().orderid;
	useEffect(() => {
		dispatch(getOrderById(orderId));
	}, [dispatch, orderId]);

	return (
		<div style={{ overflowX: "hidden", margin: "0 10%" }}>
			{loading && <Loader />}
			{error && <Error error="Échec du chargement des détails de la commande" />}
			{order && (
				<div>
					<div className="row d-flex justify-content-between">
						<div className="col-md-5 card">
							<h2>Article(s) dans votre commande</h2>
							<hr />
							{order.orderItems.map((item) => (
								<div className="orderitem" key={item.id}>
									<img
										className="img img-fluid small-img"
										src={item.image}
										alt="produit"
									/>
									<h1 className="text-primary mt-3">
										<i>{item.name}</i>
									</h1>
									<h1 className="text-secondary d-flex justify-content-between">
										<div>Quantity:</div>
										<i className="text-primary">{item.quantity}</i>
									</h1>
									<h1 className="text-secondary d-flex justify-content-between">
										<div>
											Price:{" "}
											<i className="text-dark">
												{formatPrice(item.price)}&nbsp;
												<i className="text-secondary">x{item.quantity}</i>{" "}
											</i>
										</div>
										<i className="text-primary">
											{formatPrice(item.price * item.quantity)}
										</i>
									</h1>
									<hr />
								</div>
							))}
						</div>
						<div
							style={{ textAlign: "left" }}
							className="col-md-5 card text-left"
						>
							<hr />
							<h2>Détails de la commande</h2>
							<hr />
							<h3 className="text-left text-secondary">
							Commande Id: <i className="text-dark">{order._id}</i>
							</h3>
							<h3 className="text-left text-secondary">
							Montant total:{" "}
								<i className="text-dark">{formatPrice(order.orderAmount)}</i>
							</h3>
							<h3 className="text-left text-secondary">
							Date de commande:{" "}
								<i className="text-dark">{order.createdAt.substring(0, 10)}</i>
							</h3>
							<h3 className="text-left text-secondary">
							Identifiant de transaction:{" "}
								<i className="text-dark">{order.transactionId}</i>
							</h3>
							{order.isDelivered ? (
								<h3 className="text-left text-secondary">
									Statut: <i className="text-dark">Livré</i>
								</h3>
							) : (
								<h3 className="text-left text-secondary">
									Statut: <i className="text-dark">Commande en cours</i>
								</h3>
							)}
							<hr />
							<div>
								<h2>Les détails d'expédition</h2>
								<hr />
								<h1 className="text-secondary">
								Adresse:{" "}
									<i>
										<strong className="text-dark">
											{formatAddress(order.shippingAddress.address)}
										</strong>
									</i>
								</h1>
								<h1 className="text-secondary">
								Ville:{" "}
									<i>
										<strong className="text-dark">
											{order.shippingAddress.city}
										</strong>
									</i>
								</h1>
								<h1 className="text-secondary">
								Pays:{" "}
									<i>
										<strong className="text-dark">
											{order.shippingAddress.country}
										</strong>
									</i>
								</h1>
							</div>
						</div>
					</div>
				</div>
			)}
			<div className="row mt-5 justify-content-center">
				<div className="col-md-10">
					<h2 className="text-center mt-3">Critères de remplacement</h2>
					<hr />
					<p>
						Pargraphe
					</p>
				</div>
			</div>
		</div>
	);
}

export default OrderInfo;

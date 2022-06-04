import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUserId } from "../actions/orderActions";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { formatPrice } from "../helpers/Formatter";

function Orders() {
	const orderstate = useSelector((state) => state.getOrdersByUserIdReducer);
	const { orders, loading, error } = orderstate;
	const dispatch = useDispatch();
	useEffect(() => {
		document.title = "Mes Orders ";
		if (localStorage.getItem("currentUser")) {
			dispatch(getOrdersByUserId());
		} else {
			window.location.href = "/login";
		}
	}, [dispatch]);
	return (
		<div>
			<div className="row justify-content-center">
				<div className="col-md-9">
					<h2 className="text-center my-2">Ma liste de commandes</h2>
					<table className="table table-striped">
						<thead>
							<tr>
								<th>Num</th>
								<th>Commande ID</th>
								<th>Montant</th>
								<th>Date</th>
								<th>Transaction ID</th>
								<th>Statut</th>
							</tr>
						</thead>
						<tbody>
							{loading && <Loader />}
							{error && <Error error="La commande n'a pas pu être traitée" />}
							{orders &&
								orders.map((order, i) => {
									return (
										<tr
											className="cursor-pointer"
											key={order._id}
											onClick={() =>
												(window.location = `/orderinfo/${order._id}`)
											}
										>
											<td>{i + 1}</td>
											<td>{order._id}</td>
											<td>
												<i>{formatPrice(order.orderAmount)}</i>
											</td>
											<td>{order.createdAt.substring(0, 10)}</td>
											<td>{order.transactionId}</td>
											<td>
												{order.isDelivered ? (
													<p>Livré</p>
												) : (
													<p>Commande en cours</p>
												)}
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Orders;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../actions/orderActions";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { formatPrice } from "../helpers/Formatter";

function OrdersList() {
	const dispatch = useDispatch();
	const getallordersstate = useSelector((state) => state.getAllOrdersReducer);
	const { orders, loading, error } = getallordersstate;
	useEffect(() => {
		document.title = " Liste des commandes";
		dispatch(getAllOrders());
	}, [dispatch]);

	return (
		<div>
			<h2 className="text-center mb-3">Liste des commandes</h2>
			{loading && <Loader />}
			{error && <Error error="Impossible de charger la liste des commandes" />}
			<table className="table table-bordered">
				<thead>
					<tr>
						<th>Num</th>
						<th>Commande ID</th>
						<th>Nom d'utilisateur</th>
						<th>E-mail</th>
						<th>Montant</th>
						<th>Date de commande</th>
						<th>Transaction Id</th>
					</tr>
				</thead>
				<tbody>
					{orders &&
						orders.map((order, i) => {
							return (
								<tr
									className="cursor-pointer"
									onClick={() => {
										window.location.href = `/orderinfo/${order._id}`;
									}}
									key={order._id}
								>
									<td>{i + 1}</td>
									<td>{order._id}</td>
									<td>{order.name}</td>
									<td>{order.email}</td>
									<td>
										<i>{formatPrice(order.orderAmount)}</i>
									</td>
									<td>{order.createdAt.substr(0, 10)}</td>
									<td>{order.transactionId}</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
}

export default OrdersList;

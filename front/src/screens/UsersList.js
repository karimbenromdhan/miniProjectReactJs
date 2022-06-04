import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser } from "../actions/userActions";
import Loader from "../components/Loader";
import Error from "../components/Error";

function UsersList() {
	const dispatch = useDispatch();
	const getallusersstate = useSelector((state) => state.getAllUsersReducer);
	const { users, loading, error } = getallusersstate;
	useEffect(() => {
		document.title = "Liste des utilisateurs";
		dispatch(getAllUsers());
	}, [dispatch]);

	return (
		<div>
			<h2 className="text-center mb-3">Liste des utilisateurs</h2>
			<table className="table table-bordered">
				<thead>
					<tr>
						<th>Num</th>
						<th>Utilisateur ID</th>
						<th>Nom</th>
						<th>Email</th>
						<th>Supprimer User</th>
					</tr>
				</thead>
				<tbody>
					{loading && <Loader />}
					{error && <Error error="Impossible de récupérer la liste des utilisateurs" />}
					{users &&
						users.map((user, idx) => {
							return (
								<tr key={user._id}>
									<td>{idx + 1}</td>
									<td>{user._id}</td>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td className="text-center cursor-pointer">
										<i
											onClick={() => dispatch(deleteUser(user._id))}
											className="fa fa-trash text-danger"
										></i>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
}

export default UsersList;

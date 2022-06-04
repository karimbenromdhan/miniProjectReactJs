import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/userActions";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";
import { updateUser } from "../actions/userActions";

function Profile() {
	useEffect(() => {
		if (localStorage.getItem("currentUser")) {
			document.title = `${currentUser.name} | SleekStore`;
		} else {
			window.location.href = "/login";
		}
	});
	const loginstate = useSelector((state) => state.loginReducer);
	const currentUser = loginstate.currentUser;
	const dispatch = useDispatch();
	const updateuserstate = useSelector((state) => state.updateReducer);
	const { error, loading, success } = updateuserstate;

	const [name, setName] = useState(currentUser.name);
	const [email, setEmail] = useState(currentUser.email);
	const [password, setPassword] = useState("");
	const [cpassword, setCpassword] = useState("");

	async function update(e) {
		e.preventDefault();
		if (password !== cpassword) {
			alert("Le mot de passe ne correspond pas");
			return;
		}
		const updatedUser = {
			name: name,
			email: email,
			password: password,
		};
		dispatch(updateUser(currentUser._id, updatedUser));
		setTimeout(() => {
			dispatch(logoutUser());
		}, 1500);
	}

	return (
		<div>
			<div className="row justify-content-center">
				<div className="col-md-5 p-3" style={{ marginTop: "20px" }}>
					<div className="div">
						<h2 className="text-center m-3">Mettez à jour vos informations</h2>
						{success && (
							<Success success="L'utilisateur a été mis à jour avec succès. Veuillez vous reconnecter" />
						)}
						{loading ? (
							<Loader />
						) : (
							<>
								<form onSubmit={update}>
									<input
										required
										type="text"
										className="form-control"
										placeholder="Nom"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>

									<input
										required
										type="email"
										className="form-control"
										placeholder="Email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>

									<input
										required
										type="mot de passe"
										className="form-control"
										placeholder="Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>

									<input
										required
										type="password"
										className="form-control"
										placeholder="Confirmez le mot de passe"
										value={cpassword}
										onChange={(e) => setCpassword(e.target.value)}
									/>
									<div className="text-center ml-auto d-flex justify-content-center">
										<button
											type="submit"
											className="btn btn-success mt-3 m-auto"
										>
											Mise à jour
										</button>
									</div>
								</form>
							</>
						)}
						{error && <Error error="Impossible de mettre à jour" />}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;

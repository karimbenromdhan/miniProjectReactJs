import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerNewUser } from "../actions/userActions";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";

const Register = () => {
	useEffect(() => {
		if (localStorage.getItem("currentUser")) {
			window.location.href = "/";
		}
		window.document.title = "S'inscrire ";
	}, []);

	const dispatch = useDispatch();
	const registerReducerState = useSelector(
		(state) => state.registerNewUserReducer
	);
	const { error, loading, success } = registerReducerState;

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cpassword, setCpassword] = useState("");

	const handleRegister = (e) => {
		e.preventDefault();
		if (password !== cpassword) {
			alert("Le mot de passe ne correspond pas");
			return;
		}
		const user = {
			name: name,
			email: email,
			password: password,
		};
		dispatch(registerNewUser(user));
	};

	return (
		<div>
			<div className="row justify-content-center">
				<div className="col-md-5 p-3" style={{ marginTop: "20px" }}>
					<div className="div">
						<h2 className="text-center m-3">
						S'inscrire &nbsp;<i class="fa fa-user-plus" aria-hidden="true"></i>
						</h2>
						<div className="text-center">
							{error && <Error error="L'adresse e-mail est déjà utilisée" />}
							{success && <Success success="Utilisateur enregistré avec succès" />}
							{loading && <Loader />}
						</div>
						{!loading && (
							<>
								<form onSubmit={handleRegister}>
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
										type="password"
										className="form-control"
										placeholder="mot de passe"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>

									<input
										required
										type="password"
										className="form-control"
										placeholder="Confirmet le mot de passe"
										value={cpassword}
										onChange={(e) => setCpassword(e.target.value)}
									/>
									<button
										type="submit"
										className="btn btn-primary btn-block mt-3 m-auto register-btn"
									>
										S'inscrire
									</button>
								</form>
							</>
						)}
						<h1 className="text-center mt-4">
						Vous avez déjà un compte?{" "}
							<Link to="/login">Cliquez ici pour vous identifier</Link>
						</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;

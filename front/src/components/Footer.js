import React from "react";

const Footer = () => {
	return (
		<div className="footer row bg-dark text-center text-light p-5">
			<h1 className="text-center text-light">
			Créé par{" "}
				<a
					className="text-decoration-none"
					href="https://github.com/karimbenromdhan"
					target="_blank"
					rel="noopener noreferrer"
				>
					<i>BEN ROMDHAN Karim</i>
				</a>
			</h1>
			<h1 className="text-center text-light">
				&copy; {new Date().getFullYear()}. Tous les droits sont réservés.
			</h1>
		</div>
	);
};

export default Footer;

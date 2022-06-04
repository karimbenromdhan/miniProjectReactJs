import React, { useEffect } from "react";

const Offers = () => {
	useEffect(() => {
		document.title = "Offers";
		if (!localStorage.getItem("currentUser")) {
			window.location.href = "/";
		}
	});
	return (
		<div
			className="row m-auto rounded d-flex align-items-center"
			style={{ width: "80%", height: "300px" }}
		>
			<h2 className="text-center alert-success py-5 text-dark">
				!!! AVOIR <span className="text-danger text discount">50%</span> DE REMISE
				SUR TOUT ACHAT SUPÉRIEUR À 1 000 TND !!!
			</h2>
		</div>
	);
};

export default Offers;

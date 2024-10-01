import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context);


	return (
		<nav className="navbar navbar-light bg-black">
			<div className="container">
				<div className="ml-auto">
				{store.auth === true ?

					(<Link to="/">
						<button className="btn btn-danger" onClick={actions.logout}>Logout</button>
					</Link>):""}
				</div>
			</div>
		</nav>
	);
};

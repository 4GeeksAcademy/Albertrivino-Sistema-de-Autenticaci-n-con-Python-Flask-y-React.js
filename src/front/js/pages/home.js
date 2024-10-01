import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Login from "./login";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<Login />
	);
};

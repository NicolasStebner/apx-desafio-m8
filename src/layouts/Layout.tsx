import React from "react";
import css from "./layout.css";
import { Outlet } from "react-router-dom";
import { Header } from "../components/header/header";
import { useEmailUser } from "../hooks/emailUser";

function Layout() {
	const {eUser, setEmailUser} = useEmailUser()
	function logOut(){
		setEmailUser("")
	}
	return (
		<>
			<Header logOut={logOut} emailUser={eUser}></Header>
			<div className={css.main}>
				<Outlet></Outlet>
			</div>
		</>
	);
}
export { Layout };

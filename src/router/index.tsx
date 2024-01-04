import { Route, Routes } from "react-router-dom";
import React from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Layout } from "../layouts/Layout";
import { HomePage } from "../pages/home/home";
import { PetFinderInfoPage } from "../pages/petFinderInstructions/petFinder";
import { CheckEmailPage } from "../pages/check-email/checkEmail";
import { RegisterPage } from "../pages/register/register";
import { LoginPage } from "../pages/login/login";
import { ProfilePage } from "../pages/profile/profile";
import { DatosPersonalesPage } from "../pages/datos-personales/datosPersonales";
import { ModificarContrasenia } from "../pages/modificar-contrasenia/modificarContrasenia";
import { ReportarMascota } from "../pages/reportar-mascota/reportarMascota";
import { MascotasReportadas } from "../pages/mascotas-reportadas/mascotasReportadas";
import { EditarReporte } from "../pages/editar-reporte-mascota/editarReporte";
import { MascotasPerdidasCercaPage } from "../pages/mascotas-perdidas-cerca/mascotasPerdidasCerca";

function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<HomePage />} />
				<Route path="/como-funciona-pet-finder" element={<PetFinderInfoPage></PetFinderInfoPage>} />
				<Route path="/check-email" element={<CheckEmailPage></CheckEmailPage>} />
				<Route path="/register" element={<RegisterPage></RegisterPage>} />
				<Route path="/login" element={<LoginPage></LoginPage>} />
				<Route path="/profile" element={<ProfilePage></ProfilePage>} />
				<Route path="/datos-personales" element={<DatosPersonalesPage></DatosPersonalesPage>} />
				<Route path="/modificar-contrasenia" element={<ModificarContrasenia></ModificarContrasenia>} />
				<Route path="/reportar-mascota" element={<ReportarMascota></ReportarMascota>} />
				<Route path="/mascotas-reportadas" element={<MascotasReportadas></MascotasReportadas>} />
				<Route path="/mascotas-perdidas-cerca" element={<MascotasPerdidasCercaPage></MascotasPerdidasCercaPage>} />
				<Route path="/editar-mascota/:id" element={<EditarReporte></EditarReporte>} />
				{/* <Route path="/search/:query" element={<SearchResult></SearchResult>} /> */}
			</Route>
		</Routes>
	);
}

export { AppRoutes };

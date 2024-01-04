import React from "react";
import { Title } from "../../ui/title/title";
import { Subtitle } from "../../ui/subtitle/subtitle";
import { Button } from "../../ui/button/button"
import logoHome from "../../assets/home_img.png"
import css from "./home.css"

function HomePage() {
	return (
		<div>
			<img className={css.img} src={logoHome} alt="imagen_home"></img>
			<Title align="center" color="#EB6372">Pet Finder App</Title>
			<Subtitle align="center">Encontrá y reportá mascotas perdidas cerca de tu ubicación</Subtitle>
			<div className={css.contenedor_botones}>
				<Button redirect="/mascotas-perdidas-cerca" color="#5A8FEC">Dar mi ubicación actual</Button>
				<Button redirect="/como-funciona-pet-finder" color="#00A884">¿Cómo funciona Pet Finder?</Button>
			</div>
		</div>
	);
}
export { HomePage };

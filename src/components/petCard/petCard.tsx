import React from "react";
import css from "./petCard.css"
import { Button } from "../../ui/button/button";

function PetCard(props){
  return <div className={css.container}>
            <img className={css.imagen} src={props.foto} />
            <div className={css.info_container}>
            <div className={css.nombre_lugar}>
              <div className={css.nombre}>{props.nombre}</div>
              <div>{props.ubicacion}</div>
            </div>
            <div onClick={()=>{
              if(props.saveIdMascota){
                props.saveIdMascota(props.id)
              }
              props.editClick(props.id)
              
              }}>
              <Button className={css.button_editar} color={props.colorButton}>{props.buttonText}</Button>
            </div>
						</div>
				</div>
}

export {PetCard}
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import css from "./header.css";
import logoHeader from "../../assets/logo_header.png"

function Header(props){
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  function handlerIsOpen(){
    setIsOpen(!isOpen)
  }

  return <div className={css.header_container}>
          {isOpen ?
            <div className={css.ventana}>
              <p onClick={()=>{handlerIsOpen()}} className={css.ventana__cierra_ventana}>X</p>
              <div className={css.ventana__cont}>
                <p className={css.ventana__contenido} onClick={()=>{handlerIsOpen();navigate("/")}}>Home</p>
                <p className={css.ventana__contenido} onClick={()=>{handlerIsOpen();navigate("/profile")}}>Mis Datos</p>
                <p className={css.ventana__contenido} onClick={()=>{handlerIsOpen();navigate("/mascotas-reportadas")}}>Mis Mascotas Reportadas</p>
                <p className={css.ventana__contenido} onClick={()=>{handlerIsOpen();navigate("/reportar-mascota")}}>Reportar Mascota</p>
                <p>{props.emailUser}</p>
                {props.emailUser ? 
                <p className={css.ventana__contenido} onClick={()=>{handlerIsOpen();props.logOut();navigate("/check-email")}}>Cerrar Sesion</p>
                :
                <p className={css.ventana__contenido} onClick={()=>{handlerIsOpen();navigate("/check-email")}}>Iniciar Sesión</p>
                }
              </div>
            </div>
          :<></>}
          <img className={css.img} src={logoHeader} alt="logo"></img>
          <div onClick={()=>{handlerIsOpen()}} className={css.header__PSC_mobile}>
            <div className={css.barra}></div>
            <div className={css.barra}></div>
            <div className={css.barra}></div>
          </div>
        </div>
}

export {Header}
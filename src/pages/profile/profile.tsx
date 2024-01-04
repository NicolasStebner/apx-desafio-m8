import React from "react"
import css from "./profile.css"
import { Title } from "../../ui/title/title"
import { Button } from "../../ui/button/button"
import { useNavigate } from "react-router-dom"
import { useEmailUser } from "../../hooks/emailUser"

function ProfilePage(){
  const navigate = useNavigate()
  const {eUser, setEmailUser} = useEmailUser()
  
  function logOut(){
    setEmailUser("")
  }
  return <>
      <Title align="center">Mis datos</Title>
      <div className={css.contenedor_botones}>
        <Button color="#5A8FEC" redirect="/datos-personales">Modificar datos personales</Button>
        <Button color="#5A8FEC" redirect="/modificar-contrasenia">Modificar contraseña</Button>
      </div>
      <p className={css.centrado}>{eUser}</p>
      {eUser ? 
        <a className={css.centrado}href="" onClick={()=>{logOut();navigate("/")}}>Cerrar Sesión</a>
      :
        <a className={css.centrado}href="" onClick={()=>{navigate("/login")}}>Iniciar Sesión</a>
      }
  </>
}

export {ProfilePage}
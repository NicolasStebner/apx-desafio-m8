import React from "react"
import css from "./login.css"
import { useNavigate } from "react-router-dom"
import { Title } from "../../ui/title/title"
import { Subtitle } from "../../ui/subtitle/subtitle"
import { LoginForm } from "../../components/loginForm/loginForm"
import { serviceToBackend } from "../../lib/service"
import { useEmailUser } from "../../hooks/emailUser"
import { getIdUser } from "../../hooks/idUser"

function LoginPage(){
  const navigate = useNavigate()
  const {eUser, setEmailUser} = useEmailUser()
  const {IdUser, setIdUser} = getIdUser()
  
  async function handlerForm(email,pass){
    const rta = await serviceToBackend.login(email,pass)
    if(rta.token){
      alert("Logueado con éxito")
      setEmailUser(email)
      const idUser = await serviceToBackend.getIdByEmail(email)
      setIdUser(idUser)
      navigate("/")
    }else{
      alert("El email y/o la contraseña son incorrectas")
    }
  }
  return <>
    <Title align="center">Iniciar Sesión</Title>
    <Subtitle align="center">Ingresá los siguientes datos para iniciar sesión</Subtitle>
    <LoginForm handlerSubmit={handlerForm}></LoginForm>
    <a className={css.centrado} href="" onClick={()=>{navigate("/register")}}>Olvidé mi contraseña</a>
    </>
}

export {LoginPage}
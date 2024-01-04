import React from "react"
import css from "./datosPersonales.css"
import { useNavigate } from "react-router-dom"
import { Title } from "../../ui/title/title"
import { MyDataForm } from "../../components/myDataForm/myDataForm"
import { serviceToBackend } from "../../lib/service"
import { useEmailUser } from "../../hooks/emailUser"

function DatosPersonalesPage(){
  const navigate = useNavigate()
  const { eUser, setEmailUser } = useEmailUser()
  
  async function handlerSubmit(nombre:string, localidad:string){
    if(eUser){
      await serviceToBackend.updateDatosUsuario(eUser,nombre,localidad)
      alert("Contraseña actualizada!")
      navigate("/")
    }
    else{
      alert("Para realizar esta acción debe estar logueado")
      navigate("/login")
    }
  }

  return <div className={css.contenedor}>
      <Title align="center">Datos personales</Title>
      <MyDataForm handlerSubmit={handlerSubmit}></MyDataForm>
  </div>
}

export { DatosPersonalesPage }
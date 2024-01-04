import React from "react"
import css from "./checkEmail.css"
import img from "../../assets/auth_login.png"
import { Title } from "../../ui/title/title";
import { Subtitle } from "../../ui/subtitle/subtitle";
import { Input } from "../../ui/input/input";
import { Button } from "../../ui/button/button";
import { useNavigate } from "react-router-dom";
import { serviceToBackend } from "../../lib/service";

function CheckEmailPage() {
  const navigate = useNavigate()
  async function handlerFormulario(e){
    e.preventDefault()
    const existeEmail = await serviceToBackend.chequeoExistenciaEmail(e.target.elements.email.value)
    if(existeEmail){
      navigate("/login")
    }else{
      navigate("/register")
    }
  }
	return (
		<>
			<img className={css.img} src={img} alt="img_login" />
      <Title align="center">Ingresar</Title>
      <Subtitle align="center">Ingresá tu email para continuar</Subtitle>
      <form className={css.formulario} onSubmit={(e)=>{handlerFormulario(e)}}>
        <Input name="email" label="Email"></Input>
        <Button type="submit" color="#5A8FEC">Siguiente</Button>
      </form>
      <p className={css.centrado}>¿Aún no tenes cuenta? <a href="" onClick={()=>{navigate("/register")}}>Registrate</a></p>
		</>
	);
}

export { CheckEmailPage }



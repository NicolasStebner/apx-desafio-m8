import React, { useEffect, useState } from "react"
import { Title } from "../../ui/title/title"
import { Subtitle } from "../../ui/subtitle/subtitle"
import { Button } from "../../ui/button/button"
import { ReportPet } from "../../components/reportPet/reportPet"
import { serviceToBackend } from "../../lib/service"
import { useEmailUser } from "../../hooks/emailUser"
import { useNavigate } from "react-router-dom"

function ReportarMascota(){
  const {eUser,setEmailUser} = useEmailUser()
  const navigate = useNavigate()
  const [algo, setAlgo] = useState({})
  function recargar(){
    if(localStorage.getItem("recargar") === 'true'){
      navigate(0)
      localStorage.setItem("recargar","false")
    }
  }
  useEffect(()=>{
    recargar()
  },[])
  async function handlerSubmit(info){
    console.log("info desde page", info)
    await serviceToBackend.publicarReporteMascota(eUser,info)
    alert("mascota publicada")
    navigate("/mascotas-reportadas")
  }

  return <>
        <Title align="center">Reportar mascota</Title>
        <Subtitle align="center">Ingresá la siguiente información para realizar el reporte de la mascota</Subtitle>
        <ReportPet showGuardar={true} handlerSubmit={handlerSubmit}></ReportPet>
        <Button color="#4A5553">Cancelar</Button>
  </>
}

export { ReportarMascota }


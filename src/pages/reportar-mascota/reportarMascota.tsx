import React from "react"
import { Title } from "../../ui/title/title"
import { Subtitle } from "../../ui/subtitle/subtitle"
import { Button } from "../../ui/button/button"
import { ReportPet } from "../../components/reportPet/reportPet"
import css from "./reportarMascota.css"
import { serviceToBackend } from "../../lib/service"
import { useEmailUser } from "../../hooks/emailUser"

function ReportarMascota(){
  const {eUser,setEmailUser} = useEmailUser()
  async function handlerSubmit(info){
    console.log("info desde page", info)
    // await serviceToBackend.publicarReporteMascota(eUser,info)
    alert("mascota publicada")
  }
  return <>
        <Title align="center">Reportar mascota</Title>
        <Subtitle align="center">Ingresá la siguiente información para realizar el reporte de la mascota</Subtitle>
        <ReportPet showGuardar={true} handlerSubmit={handlerSubmit}></ReportPet>
        <Button color="#4A5553">Cancelar</Button>
  </>
}

export { ReportarMascota }


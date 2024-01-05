import React, { useEffect, useState } from "react"
import css from "./editarReporte.css"
import { useNavigate, useParams } from "react-router-dom"
import { serviceToBackend } from "../../lib/service"
import { Title } from "../../ui/title/title"
import { ReportPet } from "../../components/reportPet/reportPet"
import { Button } from "../../ui/button/button"
import { Subtitle } from "../../ui/subtitle/subtitle"

function EditarReporte(){
  const [mascota, setMascota] = useState({})
  const [llamadaAlBack, setLlamadaAlBack] =  useState(true)
  const [coordenadasFromBack, setCoordenadasFromBack] = useState({})
  const { id } = useParams()
  const navigate = useNavigate()
  
  async function guardar(obj){
    console.log(obj)
    await serviceToBackend.actualizarDatosMascota(id,obj)
    alert("Datos actualizados")
    navigate("/mascotas-reportadas")
  }


  async function mascotaEncontrada(){
    await serviceToBackend.notificarMascotaEncontrada(id)
    alert("Recibimos tu notificacion! Gracias por ayudarnos!")
    navigate("/mascotas-reportadas")
  }

  async function eliminarMascota(){
    await serviceToBackend.eliminarMascotaById(id)
    alert("Reporte eliminado con éxito!")
    navigate("/mascotas-reportadas")
  }

  async function getMascotaById(){
    const mascotaFromBack = await serviceToBackend.getMascotaById(id)
    setMascota(mascotaFromBack)
    const obj = await serviceToBackend.getLatLngFromId(id)
    setCoordenadasFromBack(obj["_geoloc"])
    setLlamadaAlBack(false)
  }
  
  useEffect(()=>{
    getMascotaById()
  },[])
  
  return <>
    {llamadaAlBack
      ?
        <Subtitle>Cargando...</Subtitle>
      :
      <>
        <Title align="center">Editar reporte de mascota</Title>
        <ReportPet handlerSubmit={guardar} img={mascota["fotoURL"]} coordenadas={coordenadasFromBack} mascotaFromBack={mascota} showGuardar={false}></ReportPet>
        <div className={css.contenedor_botones}>
          <Button clicked={mascotaEncontrada} color="#00A884">Reportar como encontrado</Button>
          <Button clicked={eliminarMascota} color="#EB6372">Eliminar reporte</Button>
        </div>
      </>
    }
  </>
}

export {EditarReporte}



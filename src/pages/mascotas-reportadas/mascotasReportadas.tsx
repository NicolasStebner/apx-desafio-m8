import React, { useEffect, useState } from "react"
import css from "./mascotasReportadas.css" 
import { Title } from "../../ui/title/title"
import { Subtitle } from "../../ui/subtitle/subtitle"
import ceroReportesImg from "../../assets/not_reports.png"
import { Button } from "../../ui/button/button"
import { serviceToBackend } from "../../lib/service"
import { getIdUser } from "../../hooks/idUser"
import { useNavigate } from "react-router-dom"
import { useEmailUser } from "../../hooks/emailUser"
import { PetCard } from "../../components/petCard/petCard"

function MascotasReportadas(){
  const [llamadaAlBack, setLlamadaAlBack] = useState(false)
  const [mascotasReportadas,setMascotasReportadas] = useState([])
  const {IdUser, setIdUser} = getIdUser()
  const {eUser,setEmailUser} = useEmailUser()
  const navigate = useNavigate()
  
  function clickOnEdit(id){
    navigate("/editar-mascota/"+ id)
  }

  function checkIdUser(){
    if(IdUser == -1){
      alert("El usuario debe estar loggeado para realizar esta acción")
      navigate("/login")
    }
    return IdUser == -1
  }

  async function getMascotasReportadas(){
    try{
      const mascotasReportadasFromBackend = await serviceToBackend.getMascotasReportadasById(eUser)
      setMascotasReportadas(mascotasReportadasFromBackend)
      setLlamadaAlBack(true)
    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    if(!checkIdUser()){
      getMascotasReportadas()
    }
  },[])

  return <>
    <Title align="center">Mascotas reportadas</Title>
    {!llamadaAlBack ? 
      <>
        <Subtitle align="center">Aún no reportaste mascotas perdidas</Subtitle>
        <div className={css.contenedor_imagen_button}>
          <img src={ceroReportesImg} className={css.img} alt="imagen_not_reports" />
          <Button color="#5A8FEC" redirect="/reportar-mascota">Publicar Reporte</Button>
        </div>
      </>
    : 
      <div className={css.card_distribution}>
        {mascotasReportadas.map((mascota)=>{
          return <PetCard key={mascota.id} id={mascota.id} editClick={clickOnEdit} buttonText="Editar" colorButton="#5A8FEC" nombre={mascota.nombre} ubicacion={mascota.ubicacion} foto={mascota.fotoURL}></PetCard>
        })}
      </div> 
  }
  </>
}

export {MascotasReportadas}
import React, { useEffect, useState } from "react";
import css from "./mascotasPerdidasCerca.css"
import { Title } from "../../ui/title/title";
import { serviceToBackend } from "../../lib/service";
import { useEmailUser } from "../../hooks/emailUser";
import { Subtitle } from "../../ui/subtitle/subtitle";
import { PetCard } from "../../components/petCard/petCard";
import { ReporterVentana } from "../../components/reporter/reporter";

function MascotasPerdidasCercaPage(){
  const [mascotasCerca, setMascotasCerca] = useState([])
  const [llamadaAlBack, setLlamadaAlBack] = useState(false)
  const [latitudLongitud,setLatitudLongitud] = useState({lat:0,lng:0})
  const {eUser, setEmailUser} = useEmailUser()
  const [showVentana, setShowVentana] = useState(false)
  const [idMascota, setIdMascota] = useState(-1)

  function getUbicacionActual(){
    if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				const latitud = position.coords.latitude;
				const longitud = position.coords.longitude;
				// Ahora puedes usar estas coordenadas con Mapbox
        setLatitudLongitud({
          lat: latitud,
          lng: longitud
        })
			}, function (error) {
				console.error(`Error al obtener la ubicación: ${error.message}`);
			});
		}else{
			alert("Tu navegador no soporta esta versión, intentelo más tarde o con otro navegador")
		}
  }

  function AbrirCerrarVentana(){
    setShowVentana(!showVentana)
  }

  async function getMascotasCerca(){
    const mascotasCercaFromBack = await serviceToBackend.getMascotasCerca(eUser,latitudLongitud.lat,latitudLongitud.lng)
    setMascotasCerca(mascotasCercaFromBack)
  }

  async function enviarMensaje(obj){
    await serviceToBackend.reportarMascota(idMascota,obj)
    alert("Mascota reportada! Gracias por tu colaboracion")
    AbrirCerrarVentana()
  }

  useEffect(()=>{
    getUbicacionActual()
    getMascotasCerca()
    setLlamadaAlBack(true)
  },[])
  return <>
    {showVentana
    ?
      <ReporterVentana handlerSubmitForm={enviarMensaje} handlerCerrarVentana={AbrirCerrarVentana}></ReporterVentana>
    :
      <></>
    }
    <Title align="center">Mascotas perdidas cerca</Title>
    {!llamadaAlBack ? 
      <><Subtitle align="center">No hay mascotas cerca</Subtitle></>
    :
      <div className={css.card_distribution}>
      {mascotasCerca.map((mascota)=>{
        return <PetCard key={mascota.id}
                  id={mascota.id}
                  buttonText="Reportar" 
                  colorButton="#EB6372" 
                  nombre={mascota.nombre} 
                  ubicacion={mascota.ubicacion} 
                  foto={mascota.fotoURL}
                  editClick={AbrirCerrarVentana}
                  saveIdMascota={setIdMascota}
                  />
      })}
  </div>
    }
  </>
}

export {MascotasPerdidasCercaPage}

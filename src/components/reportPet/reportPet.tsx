import React, { useEffect, useState } from "react"
import css from "./reportPet.css"
import { Input } from "../../ui/input/input"
import { Mapbox } from "../../ui/mapbox/mapbox"
import { Subtitle } from "../../ui/subtitle/subtitle"
import { Button } from "../../ui/button/button"
import logoMascota from "../../assets/reporte_mascota.png"


function ReportPet(props){
  const [dropZone, setDropZone] = useState("")
  const [coordenadas, setCoordenadas] = useState({})

  function changeAtributo(e){
    const newObject = {...props.mascota}
    newObject[e.target.name] = e.target.value;
    props.change(newObject)
  }

  return <form className={css.formulario} onSubmit={(e)=>{
    e.preventDefault()
    props.handlerSubmit({
      nombre: e.target[0].value,
      foto: dropZone,
      coordenadas,
      ubicacion: e.target[2].value
    })
    }}>
    <Input defaultValue={props.mascotaFromBack?.nombre} name="nombre" label="NOMBRE"></Input>
    {/* <MyDropzone img={props.img} somethingChange={setDropZone}></MyDropzone> */}
    {
      localStorage.getItem('urlMascota') 
      ?
        <img className="img-to-replace" src={localStorage.getItem('urlMascota')} alt="agrega una imagen de tu mascota"></img>
      :
        <>
          <img className="img-to-replace" src={logoMascota} alt="agrega una imagen de tu mascota"></img>
          <Subtitle align="center">Agrega una imagen de tu mascota</Subtitle>
        </>
    }
    <Mapbox coordenadas={props.coordenadas} somethingChange={setCoordenadas}></Mapbox>
    <Subtitle align="center">Buscá un punto de referencia para reportar la mascota. Por ejemplo, la ubicación donde lo viste por última vez.</Subtitle>
    <Input defaultValue={props.mascotaFromBack?.ubicacion} name="ubicacion" label="UBICACIÓN"></Input>
    {props.showGuardar
      ?
      <Button type="submit" color="#00A884">Reportar mascota</Button>
      : 
      <Button color="#5A8FEC">Guardar</Button>
    }
  </form>
}

export {ReportPet}
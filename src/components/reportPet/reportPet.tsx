import React, { useEffect, useState } from "react"
import css from "./reportPet.css"
import { Input } from "../../ui/input/input"
import { MyDropzone } from "../../ui/dropzone/dropzone"
import { Mapbox } from "../../ui/mapbox/mapbox"
import { Subtitle } from "../../ui/subtitle/subtitle"
import { Button } from "../../ui/button/button"

function ReportPet(props){
  const [dropZone, setDropZone] = useState("")
  const [coordenadas, setCoordenadas] = useState({})
  
  return <form className={css.formulario} onSubmit={(e)=>{
    e.preventDefault()
    props.handlerSubmit({
      nombre: e.target[0].value,
      foto: dropZone,
      coordenadas,
      ubicacion: e.target[3].value
    })
    }}>
    <Input defaultValue={props.mascotaFromBack?.nombre} name="nombre" label="NOMBRE"></Input>
    <MyDropzone img={props.img} somethingChange={setDropZone}></MyDropzone>
    <Mapbox coordenadas={props.coordenadas} somethingChange={setCoordenadas}></Mapbox>
    <Subtitle align="center">Buscá un punto de referencia para reportar la mascota. Por ejemplo, la ubicación donde lo viste por última vez.</Subtitle>
    <Input defaultValue={props.mascotaFromBack?.ubicacion} name="ubicacion" label="UBICACIÓN"></Input>
    {props.showGuardar
      ?
      <Button type="submit" color="#00A884">Reportar mascota</Button>
      : <></>
    }
  </form>
}

export {ReportPet}
import React, {useCallback, useEffect, useState} from 'react'
import css from "./dropzone.css"
import {useDropzone} from 'react-dropzone'

function MyDropzone(props) {
  const [paths, setPaths] = useState([props.img] || []);
  const [hayFoto, setHayFoto] = useState(false)

  useEffect(()=>{
    if(paths[0] == undefined){
      setHayFoto(true)
    }
  })
  const onDrop = useCallback(acceptedFiles => {
    setPaths(acceptedFiles.map(file =>URL.createObjectURL(file)))
    props.somethingChange(acceptedFiles.map(file =>URL.createObjectURL(file)))
  }, [setPaths]);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p className={css.message}>Agrega una foto de tu mascota, haz click aquí!</p>
      </div>
      {
        !hayFoto
        ?
          paths.map((path) => 
            <img className={css.img} key={path} src={path} />
          )
        :
          <></>
      }
    </div>
  )
}
export { MyDropzone }
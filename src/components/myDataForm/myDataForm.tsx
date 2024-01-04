import React from "react";
import css from "./myDataForm.css"
import { Input } from "../../ui/input/input";
import { Button } from "../../ui/button/button";

function MyDataForm(props){
  return <form className={css.formulario} onSubmit={(e)=>{
              e.preventDefault();
              props.handlerSubmit(e.target[0].value,e.target[1].value)
            }}>
            <div>
              <Input name="Nombre" label="NOMBRE"></Input>
              <Input name="Localidad" label="LOCALIDAD"></Input>
            </div>
            <Button type="submit" color="#5A8FEC">Guardar</Button>
        </form>
}

export {MyDataForm}
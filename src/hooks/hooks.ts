import {
	atom,
} from "recoil";


export const emailUser = atom({
  key: "emailOfUser",
  default: localStorage.getItem("emailUser")
})

export const idUser = atom({
  key: "idUser",
  default: localStorage.getItem("idUser")
})



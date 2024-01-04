import { useRecoilState } from "recoil"
import { idUser } from "./hooks"

const getIdUser = () => {
  const [IdUser, setIdUser] = useRecoilState(idUser);

  return {IdUser, setIdUser}
}

export {getIdUser}
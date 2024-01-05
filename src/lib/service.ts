import { API_URL } from "./port"

export const serviceToBackend = {
  async chequeoExistenciaEmail(email: string) {
		const rta = await fetch(`${API_URL}/check-if-email-exists`, {
			method: "post",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ email: email }),
		});
		const data = await rta.json();
		return data;
	},
  async login(email:string,password:string){
    const rta = await fetch(`${API_URL}/signin`, {
			method: "post",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
		const data = await rta.json();
    return data
  },
  async register(email:string,password:string){
    const rta = await fetch(`${API_URL}/signup`, {
			method: "post",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
		const data = await rta.json();
		return data;
  },
  async getIdByEmail(email: string){
		const user_id = await fetch(`${API_URL}/get-id-by-email/${email}`)
		const IdReportador = await user_id.json()
		return IdReportador;
  },
	async updateDatosUsuario(email:string, nombre:string, localidad:string){
		const user = await fetch(`${API_URL}/user/:email`, {
			method: "post",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ email, nombre, ubicacion: localidad }),
		});
		const data = await user.json();
		return data;
	},
	async updateContraseniaUsuario(email:string,nuevaContrasenia:string){
		const rta = await fetch(
			`${API_URL}/change-password/:email/:password`,
			{
				method: "post",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({ email: email, password: nuevaContrasenia }),
			}
		);
		const data = await rta.json();
		return data;
	},
	async getMascotasReportadasById(email: string){
		const id = await this.getIdByEmail(email)
		const data = await fetch(`${API_URL}/get-reports-by-id/${id}`)
		const rta = await data.json()
		return rta
	},
	async publicarReporteMascota(emailUser:string,info){
		const idReportador = await this.getIdByEmail(emailUser);
		const rta = await fetch(`${API_URL}/reportar-mascota-sin-cloudinary/`, {
			method: "post",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				nombre: info.nombre,
				fotoURL: info.foto,
				ubicacion: info.ubicacion,
				idReportador: idReportador,
				lat: parseFloat(info.coordenadas.lat),
				lng: parseFloat(info.coordenadas.lng)
			}),
		});
		return rta.json();
	},
	async getMascotasCerca(email,lat_user,lng_user){
		const data = await fetch(`${API_URL}/get-mascotas-cerca?lat=${lat_user}&lng=${lng_user}`)
		const rta = await data.json()
		//agarro el id del usuario
		const user_id = await this.getIdByEmail(email)
		//pido esas mascotas a la base de datos
		const mascotasPosta = []
		for (const i of rta) {
			try{
				const mascota = await fetch(`${API_URL}/get-mascota-by-id/${i.objectID}`)
				const mascotaData = await mascota.json()
				//filtro las mascotas que no sean reportadas por el usuario
				if(mascotaData.idReportador != user_id){
					mascotasPosta.push(mascotaData)
				}
			}catch(e){
				console.log(e)
			}
		}
		return mascotasPosta
	},
	async getMascotaById(id){
		const data = await fetch(`${API_URL}/get-mascota-by-id/${id}`)
		const rta = await data.json()
		return rta;
	},
	async getLatLngFromId(id){
		const data =  await fetch(`${API_URL}/get-coordenadas-mascotas-by-id?id=${id}`)
		const rta =  await data.json()
		return rta
	},
	async notificarMascotaEncontrada(id){
		const data = await fetch(`${API_URL}/mascota-encontrada-by-id`,{
			method: "put",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				id: id
			}),
		})
		const rta = await data.json();
		return rta
	}
	,
	async eliminarMascotaById(id){
		const data = await fetch(`${API_URL}/eliminar-mascota-by-id`,{
			method: "delete",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				id: id
			}),
		})
		const rta = await data.json();
		return rta
	},
	async getEmailById(id) {
		const data = await fetch(`${API_URL}/get-email-by-id/${id}`)
		const rta = await data.json()
		return rta
	}
	,
	async reportarMascota(idMascota,obj){
		const mascota = await this.getMascotaById(idMascota)
		const user_email = await this.getEmailById(mascota.idReportador)
		const data = await fetch(`${API_URL}/enviar-email`,{
			method: "post",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				to: user_email,
				subject: "",
				textBody: {
					nombreReportador:obj.nombre, 
					telefono: obj.telefono, 
					informacion: obj.informacion
				}
			}),
		})
		const rta = await data.json()
		return rta
	}
}
import { User } from "@/model/user"
import { authService } from "./auth.service"

class UserService{

    private readonly url = 'http://localhost:3030/users'

    // Criar novo usuário
    public async create(user: User){

        const logged = authService.getLoggedUser()
        if(!logged) throw new Error('Unauthorized')

        const response = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${logged.token}`,
            },
            body: JSON.stringify(user)
        })

        const data = await response.json()
        console.log(data)

        if(response.status === 401){
            throw new Error(response.statusText)
        }
        else if(response.status > 299){
            throw new Error(data.message)
        }
        return data as User

    }

    // Listar todos usuários
    public async getList(){

        const logged = authService.getLoggedUser()
        if(!logged) throw new Error('Unauthorized')

        const response = await fetch(this.url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${logged.token}`,
            },
        })

        const data = await response.json()

        if(response.status === 401){
            throw new Error(response.statusText)
        }

        return data as User[]

    }

}

export const userService = new UserService()
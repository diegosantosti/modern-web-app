import { Roles } from "./roles"

export interface User {

    id?: number
    name: string
    roles: Array<string>
    username: string
    password?: string
    token?: string

}

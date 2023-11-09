import React from 'react'
import Head from "next/head"

import { useParams, useRouter} from 'next/navigation'

import MyInput from '../../components/input'
import styles from './styles.module.css'
import { userService } from '@/services/user.service'
import { authService } from '@/services/auth.service'
import { User } from '@/model/user'
import roles from '../roles'
import { Roles } from '@/model/roles'
import { rolesService } from '@/services/roles.service'
import RolesList from '@/components/roles-list'
import MySelect from '../../components/select-multiple'
import MySelectNextUi from '../../components/select-multiple-nextui'

export default function UserPage() {

    const router = useRouter()
    const params = useParams()

    const [title, setTitle] = React.useState('Novo Usuário')

    const [id, setId] = React.useState(0)
    const [name, setName] = React.useState('')
    const [roles,setRoles] = React.useState<string[]>([])
    const [rolesLista,setRolesLista] = React.useState<Roles[]>([])
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [passConfirm, setPassConfirm] = React.useState('')

    const updateRole = (e : any) => {
        let arrayRoles = e.split(",");
        arrayRoles = arrayRoles.filter( (element : string ) => {
            return element !== null && element !== undefined && element !== ''
        })
        setRoles(arrayRoles)
    }

    React.useEffect(fetchRoles, [])
    function fetchRoles() {
        rolesService.getList()
            .then(list => setRolesLista(list))
            .catch(treat)
    }

    React.useEffect(() => {
        const user = authService.getLoggedUser()
        if (!user) router.replace('/login')

        if (params && params.id) {
            if (Number(params.id) > 0) {
                setTitle('Edição de Usuário')
                setId(Number(params.id))
            }
        }
    }, [params])

    React.useEffect(() => {
        if (id > 0) {
            userService.get(id).then(user => {
                setName(user.name)
                setUsername(user.username)
                setRoles(user.roles)
            }).catch(treat)
        }
    }, [id])

    function treat(error: any) {
        if (authService.isUnauthorized(error)) {
            router.replace('/login')
        } else {
            alert(`${username}: ${error.message}`)
        }
    }

    async function save() {
        if (!name || name.trim() === '') {
            alert('Nome é obrigatório')
            return
        }

        if (id === 0 || password.trim() !== '') {
            if (!password || password.trim() === '') {
                alert('Senha é obrigatória')
                return
            }
            if (password !== passConfirm) {
                alert('A Senha não confere')
                return
            }
        }

        try {
            if (id > 0) { // editar um usuário
                let body = { name, username, roles } as User
                
                if (password && password.trim() !== '') {
                    body = { ...body, password }
                }
                await userService.update(id, body)
                router.back()

            } else { // Criar um novo
                if (!username || username.trim() === '') {
                    alert('Login é obrigatório')
                    return
                }
        
                await userService.create({
                    name, username, password, roles
                })
                router.back()
            }
        } catch (error: any) {
            treat(error)
        }
    }

    return (
        <div className={styles.loginPage}>
            <Head> <title>Cadastro de Usuário</title> </Head>

            <main className={styles.main}>
                <h2>{title}</h2>

                <div className={styles.inputs}>
                    <MyInput
                        label='Nome'
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                    <MyInput
                        label='Login'
                        value={username}
                        readOnly={id > 0}
                        onChange={event => setUsername(event.target.value)}
                    />
                    
                    <MySelectNextUi
                        label='Roles'
                        rolesLista={rolesLista}
                        roles={roles}
                        handleResult={updateRole}
                    />
                    <MyInput
                        label='Senha'
                        type='password'
                        onChange={event => setPassword(event.target.value)}
                    />
                    <MyInput
                        label='Confirmar Senha'
                        type='password'
                        onChange={event => setPassConfirm(event.target.value)}
                    />
                </div>

                <button className={styles.button} onClick={save}>Salvar</button>
            </main>
        </div>
    )
}
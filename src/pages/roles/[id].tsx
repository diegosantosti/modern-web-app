import React from 'react'
import Head from "next/head"

import { useParams, useRouter} from 'next/navigation'

import MyInput from '../../components/input'
import styles from './styles.module.css'
import { rolesService } from '@/services/roles.service'
import { authService } from '@/services/auth.service'
import { Roles } from '@/model/roles'

export default function RolesPage() {

    const router = useRouter()
    const params = useParams()

    const [title, setTitle] = React.useState('Nova Role')

    const [id, setId] = React.useState(0)
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')

    React.useEffect(() => {
        const user = authService.getLoggedUser()
        if (!user) router.replace('/login')

        if (params && params.id) {
            if (Number(params.id) > 0) {
                setTitle('Edição de Role')
                setId(Number(params.id))
            }
        }
    }, [params])

    React.useEffect(() => {
        if (id > 0) {
            rolesService.get(id).then(roles => {
                setName(roles.name)
                setDescription(roles.description)
            }).catch(treat)
        }
    }, [id])

    function treat(error: any) {
        if (authService.isUnauthorized(error)) {
            router.replace('/login')
        } else {
            alert(`${description}: ${error.message}`)
        }
    }

    async function save() {
        if (!name || name.trim() === '') {
            alert('Nome é obrigatório')
            return
        }

        if (!description || description.trim() === '') {
            alert('Descrição é obrigatória')
            return
        }

        try {
            if (id > 0) { // editar uma role
                let body = { name, description } as Roles
                
                if (name && name.trim() !== '') {
                    body = { ...body, name }
                }

                if (description && description.trim() !== ''){
                    body = { ...body, description }
                }

                await rolesService.update(id, body)
                router.back()

            } else { // Criar uma nova role
                if (!name || name.trim() === '') {
                    alert('Nome é obrigatório')
                    return
                }

                if (!description || description.trim() === '') {
                    alert('Descrição é obrigatória')
                    return
                }
        
                await rolesService.create({ name, description})
                router.back()
            }
        } catch (error: any) {
            treat(error)
        }
    }

    return (
        <div className={styles.loginPage}>
            <Head> <title>Cadastro de Roles</title> </Head>

            <main className={styles.main}>
                <h2>{title}</h2>

                <div className={styles.inputs}>
                    <MyInput
                        label='Nome'
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                    <MyInput
                        label='Descrição'
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                </div>

                <button className={styles.button} onClick={save}>Salvar</button>
            </main>
        </div>
    )
}
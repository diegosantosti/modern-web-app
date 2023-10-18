import React from 'react'
import Head from "next/head"

import { useRouter } from 'next/navigation'

import MyInput from '../../components/input'
import styles from './styles.module.css'
import { userService } from '@/services/user.service'

export default function UserPage() {

    const router = useRouter()

    const [name, setName] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [passConfirm, setPassConfirm] = React.useState('')

    async function save() {
        if (!name || name.trim() === '') {
            alert('Nome é obrigatório')
            return
        }
        if (!username || username.trim() === '') {
            alert('Login é obrigatório')
            return
        }
        if (!password || password.trim() === '') {
            alert('Senha é obrigatória')
            return
        }
        if (password !== passConfirm) {
            alert('A Senha não confere')
            return
        }

        try {
            await userService.create({name, username, password})

            router.back()
            
        } catch (error:any) {
            if(error.message === 'Unauthorized'){
                router.replace('login')
            }
            else {
                alert(`${username}: ${error.message}`)
            }
            
        }
            
    }

    return (
        <div className={styles.loginPage}>
            <Head> <title>Cadastro de Usuário</title> </Head>

            <main className={styles.main}>
                <h2>Novo Usuário</h2>

                <div className={styles.inputs}>
                    <MyInput
                        label='Nome'
                        onChange={event => setName(event.target.value)}
                    />
                    <MyInput
                        label='Login'
                        onChange={event => setUsername(event.target.value)}
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
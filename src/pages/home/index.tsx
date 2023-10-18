import Head from "next/head"
import styles from './styles.module.css'
import { useRouter } from "next/navigation"
import React from "react"
import { User } from "@/model/user"
import { userService } from "@/services/user.service"
import UserList from "@/components/user-list"

export default function HomePage(){

    const router = useRouter()
    const [ users, setUsers ] = React.useState<User[]>([])

    function goToUser(){
        router.push('user')
    }

    function fetchUsers(){
        userService.getList().then(list => setUsers(list))
    }

    // Para não entrar em loop infinito de atualização da página
    React.useEffect(fetchUsers, [])

    return(
        <>
            <Head> 
                <title>Home Page</title> 
            </Head>

            <main>
                <div className={styles.homeHeader}>
                    <div>
                        <button onClick={() => router.replace('login')} >Sair</button>
                    </div>

                    <h3>Listagem de usuários</h3>

                    <div>
                        <button onClick={goToUser}>Add</button>
                    </div>
                </div>

                <div className={styles.homeMain}>
                    <UserList users={users}/>
                </div>

            </main>
      </>
  
    )
}
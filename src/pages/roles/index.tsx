import React from 'react'
import Head from 'next/head'

import styles from './styles.module.css'
import { useRouter } from 'next/navigation'
import { Roles } from '@/model/roles'
import { rolesService } from '@/services/roles.service'
import RolesList from '@/components/roles-list'
import { authService } from '@/services/auth.service'

export default function RolesPage() {

    const router = useRouter()

    const [ roles, setRoles ] = React.useState<Roles[]>([])

    React.useEffect(fetchRoles, [])

    function goToRoles() {
        router.push('/roles/0')
    }

    function treat(error: any) {
        if (authService.isUnauthorized(error)) {
            router.replace('login')
        } else {
            alert(error.message)
        }
    }

    function fetchRoles() {
        rolesService.getList()
            .then(list => setRoles(list))
            .catch(treat)
    }

    function edit(id: number) {
        router.push(`/roles/${id}`)
    }

    function remove(id: number) {
        rolesService.remove(id)
            .then(removed => fetchRoles())
            .catch(treat)
    }

    return (
        <>
            <Head>
                <title>Roles Page</title>
            </Head>
            <main>
                <div className={styles.homeHeader}>
                    <div>
                        <button onClick={() => router.replace('home')}>Voltar</button>
                    </div>

                    <h3>Listagem de Roles</h3>

                    <div>
                        <button onClick={goToRoles}>Add</button>
                    </div>

                </div>

                <div className={styles.homeMain}>
                    <RolesList roles={roles} edit={edit} remove={remove} />
                </div>

            </main>
        </>
    )
}

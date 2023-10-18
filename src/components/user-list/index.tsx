import { User } from "@/model/user"

import styles from './styles.module.css'

type Props = { users: User[]}

export default function UserList({ users }: Props){

    return (
        <div>
            { 
                users?.map(user =>(
                    <div className={styles.lineItem}>
                        <span>{user.name}</span>
                        <span>{user.username}</span>
                    </div>
                ))
            }

        </div>

    )

}
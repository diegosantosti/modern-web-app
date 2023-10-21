import { Roles } from "@/model/roles"

import styles from './styles.module.css'

type Props = {
    roles: Roles[],
    edit?: (id: number) => void,
    remove?: (id: number) => void
}

export default function RolesList({ roles, edit, remove }: Props) {
    return (
        <div>
            {
                roles?.map(roles => (
                    <div key={roles.id} className={styles.lineItem}>
                        <span className={styles.nameLabel}>{roles.name}</span>
                        <span className={styles.descriptionLabel}>{roles.description}</span>
                        <div>
                            { edit && (
                                <button
                                    className={styles.editButton}
                                    onClick={() => edit(roles.id!)}
                                >
                                    Alterar
                                </button>
                            ) }
                            { remove && (
                                <button
                                    className={styles.delButton}
                                    onClick={() => remove(roles.id!)}
                                >
                                    Remover
                                </button>
                            ) }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
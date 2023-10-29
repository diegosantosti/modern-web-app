import { DetailedHTMLProps, SelectHTMLAttributes } from 'react'

import styles from './styles.module.css'
import { Roles } from '@/model/roles';

interface Props extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>{
    label: string ,
    rolesLista: Roles[] , 
}

export default function SelectMultiple({ label, rolesLista , ...rest }: Props){
    return(
        <div className={styles.divInput}>
            <label className={styles.label}>{label}:</label>
            <select className={styles.input} {...rest}>
            {rolesLista.map(o => (
                <option key={o.name} value={o.name} >{o.description}</option>
            ))}
            </select>
        </div>
    )
}
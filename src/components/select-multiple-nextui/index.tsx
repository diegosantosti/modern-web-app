import React from "react";
import {Select, SelectItem , SelectSection} from "@nextui-org/react";
// import {animals} from "./data";
import styles from './styles.module.css'
import { Roles } from '@/model/roles';

interface Props{
    label: string ,
    rolesLista: Roles[] , 
    roles: Iterable<string> ,
    handleResult : any
}

export default function App({ label, rolesLista , roles , handleResult   }: Props) {
    console.log(roles);

    const handleSelectionChange = (e : any) => {
        handleResult(e.target.value);
    };

  return (

    <div className={styles.divInput}>
        <label className={styles.label}>{label}:</label>
        <Select
        // label="Favorite Animal"
        placeholder="Selecione uma role"
        selectionMode="multiple"
        // defaultSelectedKeys={roles}
        selectedKeys={roles}
        className="max-w-xs"
        onChange={handleSelectionChange}
        >
        {rolesLista.map((o) => (
            <SelectItem key={o.name} value={o.name}>
            {o.description}
            </SelectItem>
        ))}
        </Select>
    </div>
  );
}

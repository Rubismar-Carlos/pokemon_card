import { BsSearch } from 'react-icons/bs'

import styles from './navbar.module.css'

export default function Navbar() {

    return <nav className={styles.navbar}>

        <div className={styles.btn_search}>
            <button>< BsSearch /></button>
            <input type="text" placeholder='Buscar por pokemon'/>
        </div>
        
    </nav>
}
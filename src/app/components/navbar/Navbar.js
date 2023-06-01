"use client"
import { BsSearch } from 'react-icons/bs'

import { useState, useEffect } from 'react'

import axios from 'axios'

import styles from './navbar.module.css'

import { AiOutlineCloseCircle } from 'react-icons/ai'

export default function Navbar() {

    const [searchPokemon, setSearchPokemon] = useState("")
    const [resultsSearch, setResultsSearch] = useState([])
    const [textSearch, setTextSearch] = useState(false)
    const [searchModal, setSearchModal] = useState(false)
    const [msg, setMsg] = useState("")
    const [boxMsg, setBoxMsg] = useState(false)

    const handleCloseSearch = () => setSearchModal(false)


    const handleSearch = async() => {

        // Box de mensagem na tela
        setBoxMsg(true)

        // ira resetar a mensagem do input
        setTimeout(() => {
            setMsg("")
            setBoxMsg(false)
        }, 2000)

        // checar se o input está recebendo algum texto
        if(searchPokemon === "") {
            return setMsg("Coloque o nome do Pokemon")
        }

        // pesquisando o nome do pokemon pela api
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`)
            setResultsSearch([response.data])
            setTextSearch(true)
            setSearchModal(true)
        } catch (error) {
            console.error("Não existe esse pokemon")
            setTextSearch(true)
            setSearchModal(true)
        }
    }

    return <nav className={styles.navbar}>

        <div className={styles.btn_search}>
            <button onClick={handleSearch}>< BsSearch /></button>
            <input type="text" placeholder='Buscar por pokemon' onChange={(e) => setSearchPokemon(e.target.value)}/>
        </div>
        <div className={`${boxMsg ? `${styles.box_msg_ativado}` : `${styles.box_msg_desativado}`}`}>
            <p>{msg}</p>
        </div>
            {searchModal && (
                <div>
                    <div className={styles.container_modal}>
                        <div className={styles.box_modal}>
                            <div>< AiOutlineCloseCircle onClick={handleCloseSearch}/></div>
                            {textSearch && resultsSearch.length === 0 && <p>Sem Resultados</p>}
                            {resultsSearch.length > 0 &&  (
                                <div>
                                    <h2>Resultado:</h2>
                                    {resultsSearch.map((pokemon, index) => (
                                        <div key={index}>
                                            <p>{pokemon.name}</p>
                                            <img src={pokemon.sprites.front_default} alt={pokemon.name} />    
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>  
            )}  
        
    </nav>
}
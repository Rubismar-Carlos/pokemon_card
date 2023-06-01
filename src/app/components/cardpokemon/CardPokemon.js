'use client'
import axios from "axios"

import {useEffect, useState} from "react"

import styles from './cardpokemon.module.css'

export default function CardPokemon() {

    const [pokemonList, setPokemonList] = useState([])
    const [btnHabilidadesOpen, setBtHabilidasdesOpen] = useState(false)
    const [btnPoderesOpen, setBtnPoderesOpen] = useState(false)

    const handleOpenHabilidades = () => setBtHabilidasdesOpen(!btnHabilidadesOpen)

    const handleOpenPoderes = () => setBtnPoderesOpen(!btnPoderesOpen)

    useEffect(() => {
        const fetchData = async() => {
          try{
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100')
            const results = response.data.results;
    
            const pokemonDataPromises = results.map(async (pokemon) => {
              const response = await axios.get(pokemon.url)
              return response.data
            })
    
            const pokemonData = await Promise.all(pokemonDataPromises)
            setPokemonList(pokemonData)
    
          } catch (error) {
            console.error(error)
          }
        }
    
        fetchData()
      }, [])

      return <div>
        <div>
            <button className={styles.btn} onClick={handleOpenHabilidades}>Habilidades</button>
            <button className={styles.btn} onClick={handleOpenPoderes}>Poderes</button>
        </div>
        {pokemonList.length > 0 ? (
            <div className={styles.cards}>
                {pokemonList.map((pokemon, index) => (
                    <div key={index} className={styles.box_card}>
                        <div className={styles.box_card_img}>
                            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                        </div>
                        <div>
                            <div>
                                <ul>
                                    <div className={`${btnHabilidadesOpen ? `${styles.btn_habilidades_ativado}` : `${styles.btn_habilidades_inativo}`}`}>
                                        {pokemon.abilities.map((ability, index) => (
                                        <li key={index}>{ability.ability.name}</li>
                                        ))}
                                    </div>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <div className={`${btnPoderesOpen ? `${styles.btn_poderes_ativado}` : `${styles.btn_poderes_inativo}`}`}>
                                        {pokemon.stats.map((stat, index) => (
                                        <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
                                        ))}
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p>Loading...</p>
        )}
      </div>
}

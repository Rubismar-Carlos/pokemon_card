'use client'
import styles from './page.module.css'

import { useState, useEffect } from 'react'

import axios from 'axios'


export default function Home() {

  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState(false)
  const [btnOpenHabilidades, setBtnOpenHabilidades] = useState(false)
  const [btnOpenPoderes, setBtnOpenPoderes] = useState(false)


  const handleOpenHabilidades = () => setBtnOpenHabilidades(!btnOpenHabilidades)

  const handleOpenPoderes = () => setBtnOpenPoderes(!btnOpenPoderes)

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if(term === "") {
      setSearch(false)
      setPokemonList([])
      return;
    }

    setSearch(true)
    
    // requisição de buscas do pokemon no input
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon', {
        params: {
          limit: 500, // Aumente o limite para obter mais Pokémon (o valor máximo é 1000)
        },

      });
        const { results } = response.data;
    
        const filteredResults = results.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(term.toLowerCase())
        );
    
        const detailedResults = await Promise.all(
          filteredResults.map((pokemon) => axios.get(pokemon.url))
        );
    
        const pokemonList = detailedResults.map((response) => response.data);
        setPokemonList(pokemonList);
      } catch (error) {
        console.log('Erro ao buscar os pokémons', error);
        setSearch(false)
      }
    };

    

  return (
    <main className={styles.main}>
      <div className={styles.nav}>
        <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Digite o nome do Pokémon" />
        <button onClick={handleOpenHabilidades}>Mostrar Habilidades</button>
        <button onClick={handleOpenPoderes}>Mostrar Poderes</button>
      </div>

      <div className={styles.container_card}>
        <div className={styles.container_card}>
          {pokemonList.length > 0 ? (
            pokemonList.map((pokemon, index) => (
              <div key={index} className={styles.box_card}>
                <h2>{pokemon.name}</h2>
                <div className={styles.box_card_img}>
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                </div>
                <div>
                  <div>
                    <ul>
                      <div className={`${btnOpenHabilidades ? `${styles.btn_habilidades_ativado}` : `${styles.btn_habilidades_inativo}`}`}>
                        {pokemon.abilities.map((ability, index) => (
                          <li key={index}>{ability.ability.name}</li>
                        ))}
                      </div>
                    </ul>
                  </div>
                  <div>
                    <ul>
                      <div className={`${btnOpenPoderes ? `${styles.btn_poderes_ativado}` : `${styles.btn_poderes_inativo}`}`}>
                        {pokemon.stats.map((stat, index) => (
                          <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
                        ))}
                      </div>
                    </ul>
                  </div>
                </div>
              </div>      
            ))
          ) : (
            <p>Digite o nome de um pokemon</p>
          )}
        </div>
      </div>
    </main>
  )
}
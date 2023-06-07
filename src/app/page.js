'use client'
import styles from './page.module.css'

import Link from 'next/link'

import { useState } from 'react'

import axios from 'axios'

import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'


export default function Home() {

  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState(false)
  const [btnOpenHabilidades, setBtnOpenHabilidades] = useState(false)
  const [btnOpenPoderes, setBtnOpenPoderes] = useState(false)
  const [btnHabilidadeVisible, setBtnHabilidadeVisible] = useState(false)
  const [btnPoderesVisible, setBtnPoderesVisible] = useState(false)

  // url imagem do banner
  const urlBanner = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"

  const handleOpenHabilidades = () => {
    setBtnOpenHabilidades(!btnOpenHabilidades)
    setBtnHabilidadeVisible(!btnHabilidadeVisible)
  }

  const handleOpenPoderes = () => {
    setBtnOpenPoderes(!btnOpenPoderes)
    setBtnPoderesVisible(!btnPoderesVisible)
  }

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
      </div>
      <div>
        {pokemonList.length > 0 && (
          <div className={styles.nav_btn}>
          <button onClick={handleOpenHabilidades} className={styles.btns}>
            {!btnHabilidadeVisible && <div className={styles.box_svg}>< MdOutlineVisibility /></div>}
            {btnHabilidadeVisible && <div className={styles.box_svg}>< MdOutlineVisibilityOff /></div>}
            HABILIDADES
          </button>
          <button onClick={handleOpenPoderes} className={styles.btns}>
            {!btnPoderesVisible && <div className={styles.box_svg}>< MdOutlineVisibility /></div>}
            {btnPoderesVisible && <div className={styles.box_svg}>< MdOutlineVisibilityOff /></div>}
            PODERES
          </button>
        </div>
        )}
      </div>

      <div className={styles.container_card}>
        <div className={styles.container_card}>
          {pokemonList.length > 0 && (
            pokemonList.map((pokemon, index) => (
              <div key={index} className={styles.pokemon}>
                <div className={styles.box_card}>
                  <div className={styles.box_background}>
                    <div className={styles.box_name_img}>
                      <h2>{pokemon.name}</h2>
                      <div className={styles.box_card_img}>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                      </div>
                    </div>
                  </div>
                <div>
                  <div className={styles.box_habilidades}>
                    <ul>
                      <div className={`${btnOpenHabilidades ? `${styles.btn_habilidades_ativado}` : `${styles.btn_habilidades_inativo}`}`}>
                      <div>
                        {pokemon.abilities.map((ability, index) => (
                          <div key={index}>
                              <p>{ability.ability.name}</p>
                          </div>
                        ))}
                      </div>
                      </div>
                    </ul>
                  </div>
                  <div className={styles.box_poderes}>
                    <ul>
                      <div className={`${btnOpenPoderes ? `${styles.btn_poderes_ativado}` : `${styles.btn_poderes_inativo}`}`}>
                      <div>
                        {pokemon.stats.map((stat, index) => (
                          <div key={index}>
                            <p>{stat.stat.name}: {stat.base_stat}</p>
                          </div>
                        ))}
                      </div>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>     
              </div> 
            ))
          )}
        </div>
      </div>
      {pokemonList.length === 0 && (
        <div className={styles.container_banner}>
            <div className={styles.img_banner}>
                <img src={urlBanner} alt="Imagem de banner" />
            </div>
            <h1>Pesquise seu Pokémon favorito</h1>
            <p>Veja as habilidades e poderes do seu pokémon</p>
        </div>
      )}
    </main>
  )
}
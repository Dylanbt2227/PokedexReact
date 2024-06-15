import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonList.css';

function PokemonList({ onPokemonSelect }) {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1032');
      const results = response.data.results;

      const detailedPokemons = await Promise.all(results.map(async (pokemon) => {
        const details = await axios.get(pokemon.url);
        return {
          name: pokemon.name,
          id: details.data.id,
          sprite: details.data.sprites.front_default,
        };
      }));

      setPokemons(detailedPokemons);
    };

    fetchPokemonData();
  }, []);

  return (
    <div className="pokedex">
      <div className="pokedex-content">
        <ul>
          {pokemons.map(pokemon => (
            <li key={pokemon.name} className="pokemon-item" onClick={() => onPokemonSelect(pokemon.name)}>
              <img src={pokemon.sprite} alt={pokemon.name} className="pokemon-sprite" />
              <span className="pokemon-id">#{pokemon.id}</span>
              <span className="pokemon-name">{pokemon.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PokemonList;

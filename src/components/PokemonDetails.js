import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonDetails.css';

import bugIcon from '../images/icons/bug.svg';
import darkIcon from '../images/icons/dark.svg';
import dragonIcon from '../images/icons/dragon.svg';
import electricIcon from '../images/icons/electric.svg';
import fairyIcon from '../images/icons/fairy.svg';
import fightingIcon from '../images/icons/fighting.svg';
import fireIcon from '../images/icons/fire.svg';
import flyingIcon from '../images/icons/flying.svg';
import ghostIcon from '../images/icons/ghost.svg';
import grassIcon from '../images/icons/grass.svg';
import groundIcon from '../images/icons/ground.svg';
import iceIcon from '../images/icons/ice.svg';
import normalIcon from '../images/icons/normal.svg';
import poisonIcon from '../images/icons/poison.svg';
import psychicIcon from '../images/icons/psychic.svg';
import rockIcon from '../images/icons/rock.svg';
import steelIcon from '../images/icons/steel.svg';
import waterIcon from '../images/icons/water.svg';

const typeToSvg = {
  bug: bugIcon,
  dark: darkIcon,
  dragon: dragonIcon,
  electric: electricIcon,
  fairy: fairyIcon,
  fighting: fightingIcon,
  fire: fireIcon,
  flying: flyingIcon,
  ghost: ghostIcon,
  grass: grassIcon,
  ground: groundIcon,
  ice: iceIcon,
  normal: normalIcon,
  poison: poisonIcon,
  psychic: psychicIcon,
  rock: rockIcon,
  steel: steelIcon,
  water: waterIcon,
};

function PokemonDetails({ pokemon, onClose }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (pokemon) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => setDetails(response.data));
    }
  }, [pokemon]);

  if (!pokemon) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {details && (
          <div className="details-container">
            <div className="left-panel">
              <img src={details.sprites.front_default} alt={details.name} />
              <h2>{details.name}</h2>
              <div className="types">
                {details.types.map(typeInfo => (
                  <img 
                    key={typeInfo.type.name} 
                    src={typeToSvg[typeInfo.type.name]} 
                    alt={typeInfo.type.name} 
                    className="type-icon" 
                  />
                ))}
              </div>
              <p><strong>Height:</strong> {details.height}</p>
              <p><strong>Weight:</strong> {details.weight}</p>
              <p><strong>Abilities:</strong></p>
              <ul>
                {details.abilities.map(ability => (
                  <li key={ability.ability.name}>{ability.ability.name}</li>
                ))}
              </ul>
            </div>
            <div className="right-panel">
              <p className="moves-label"><strong>Moves:</strong></p>
              <ul className="moves-list">
                {details.moves.slice(0, 4).map(move => (
                  <li key={move.move.name} className="move-item">{move.move.name}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonDetails;

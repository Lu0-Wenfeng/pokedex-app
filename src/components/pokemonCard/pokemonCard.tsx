import { getBackground } from '@constants/pokemon.types';
import { numberFormation } from '@services/common.service';

import type { PokemonCardProps } from '@app-types/component.types';
import type React from 'react';
import './pokemonCard.scss';

const PokemonCard: React.FC<PokemonCardProps> = ({ data, onClick, className = '' }) => {
  const imageUrl =
    data.sprites.other.dream_world.front_default ??
    data.sprites.front_default ??
    'https://via.placeholder.com/150';

  return (
    <div
      className={`${className} card`}
      onClick={onClick}
      role="presentation"
      style={{
        background: getBackground(data.types),
      }}
    >
      <div className="image-container">
        <img src={imageUrl} alt={`${data.name} avatar`} />
      </div>
      <div className="text-container">
        <strong>
          <b>{data.name}</b>
        </strong>
        <span>{numberFormation(data.id)}</span>
      </div>
    </div>
  );
};

export default PokemonCard;

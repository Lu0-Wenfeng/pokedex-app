/* eslint-disable import/order, react/prop-types */
import type { EvolutionChainCardProps } from '@app-types/component.types';
import rightArrowIcon from '@assets/icons/right-arrow.png';
import PokemonCard from '@components/pokemonCard/pokemonCard';
import '@styles/common.scss';
import React from 'react'; // eslint-disable-line import/order
import './evolutionChainCard.scss';

const EvolutionChainCard: React.FC<EvolutionChainCardProps> = ({ data }) => {
  // Placeholder array for evolution stages - in a real implementation,
  // this would be derived from actual evolution chain data
  const evolutionStages: number[] = [1, 2, 3];

  const handleKeyDown = (): void => {
    // Empty handler for accessibility
  };

  return (
    <div>
      <div className="evol-container">
        <div className="evol-wrap evolu-break">
          {evolutionStages.map((stage, index) => (
            <div className="flex-row" key={stage}>
              <div>
                <div className="pt-2">
                  <PokemonCard
                    className="disabled-click"
                    key={`${data.id}-${stage}`}
                    data={data}
                  />
                </div>
              </div>
              {evolutionStages.length !== index + 1 && (
                <div>
                  <div className="evol-next-arrow">
                    <img
                      src={rightArrowIcon}
                      alt="right arrow icon"
                      onKeyDown={handleKeyDown}
                      role="presentation"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EvolutionChainCard;

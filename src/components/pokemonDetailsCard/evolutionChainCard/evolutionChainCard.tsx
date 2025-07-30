import React from 'react';
import "./evolutionChainCard.scss";
import "../../../styles/common.scss";
import PokemonCard from "../../pokemonCard/pokemonCard";
import rightArrowIcon from "../../../assets/icons/right-arrow.png";
import { EvolutionChainCardProps } from '../../../types/component.types';

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

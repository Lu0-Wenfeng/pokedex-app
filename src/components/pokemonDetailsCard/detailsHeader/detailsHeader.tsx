import React from 'react';
import PokemonCard from "../../pokemonCard/pokemonCard";
import AppTooltip from "../../../hooks/tooltip/tooltip";
import backIcon from "../../../assets/icons/back-icon.png";
import closeIcon from "../../../assets/icons/close-icon.png";
import rightIcon from "../../../assets/icons/right-icon.png";
import { numberFormation } from "../../../services/common.service";
import { getPokemonDescription } from "../../../constants/pokemon.types";
import "./detailsHeader.scss";
import "../../../styles/common.scss";
import { DetailsHeaderProps } from '../../../types/component.types';

const DetailsHeader: React.FC<DetailsHeaderProps> = ({ 
    data, 
    speciesData, 
    backClick, 
    closeClick, 
    forwordClick 
}) => {
    const getPokemonDescriptions = (): string => {
        if (speciesData && speciesData.flavor_text_entries) {
            return getPokemonDescription(speciesData.flavor_text_entries);
        } else {
            return "";
        }
    };

    const handleKeyDown = (): void => {
        // Empty handler for accessibility
    };

    const description = getPokemonDescriptions();
    const truncatedDescription = description.substring(0, 363);
    const shouldShowTooltip = description.length > 363;

    return (
        <div className="details-header-container">
            <div className="header-wrap">
                <div>
                    <PokemonCard 
                        className="disabled-click" 
                        key={data.id} 
                        data={data} 
                    />
                </div>
                <div className="header-sub-wrap pl-3">
                    <div className="title-wrap">
                        <div>
                            <h3 className="text-caps">{data.name}</h3>
                        </div>
                        <div className="horizontal-line"></div>
                        <div>
                            <h3>{numberFormation(data.id)}</h3>
                        </div>
                        <div className="horizontal-line"></div>
                        <div>
                            <div className="icon-wrap">
                                <img 
                                    src={backIcon} 
                                    alt="back icon to go backward" 
                                    onClick={backClick} 
                                    onKeyDown={handleKeyDown} 
                                    role="presentation"
                                />
                                <img 
                                    src={closeIcon} 
                                    alt="close icon to close modal" 
                                    onClick={closeClick} 
                                    onKeyDown={handleKeyDown} 
                                    role="presentation"
                                />
                                <img 
                                    src={rightIcon} 
                                    alt="forward icon to go forward" 
                                    onClick={forwordClick} 
                                    onKeyDown={handleKeyDown} 
                                    role="presentation"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-description">
                        <div className="text-dot">
                            <span>{truncatedDescription}</span>
                        </div>
                        <div className="text-dot">...</div>
                        {shouldShowTooltip && (
                            <AppTooltip 
                                placement="bottom" 
                                className="load-more" 
                                tooltipClass="tooltip-popover" 
                                name="read more" 
                                data={description} 
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsHeader;

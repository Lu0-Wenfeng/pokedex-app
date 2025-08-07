import type { DetailsHeaderProps } from '@app-types/component.types';
import backIcon from '@assets/icons/back-icon.png';
import closeIcon from '@assets/icons/close-icon.png';
import rightIcon from '@assets/icons/right-icon.png';
import PokemonCard from '@components/pokemonCard/pokemonCard';
import { getPokemonDescription } from '@constants/pokemon.types';
import AppTooltip from '@hooks/tooltip/tooltip';
import { numberFormation } from '@services/common.service';
import '@styles/common.scss';
import type React from 'react';
import './detailsHeader.scss';

const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  data,
  speciesData,
  backClick,
  closeClick,
  forwardClick,
}) => {
  const getPokemonDescriptions = (): string => {
    if (speciesData?.flavor_text_entries) {
      return getPokemonDescription(speciesData.flavor_text_entries);
    }
    return '';
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
          <PokemonCard className="disabled-click" key={data.id} data={data} />
        </div>
        <div className="header-sub-wrap pl-3">
          <div className="title-wrap">
            <div>
              <h3 className="text-caps">{data.name}</h3>
            </div>
            <div className="horizontal-line" />
            <div>
              <h3>{numberFormation(data.id)}</h3>
            </div>
            <div className="horizontal-line" />
            <div>
              <div className="icon-wrap">
                <button
                  type="button"
                  onClick={backClick}
                  onKeyDown={handleKeyDown}
                  aria-label="Go back to previous Pokemon"
                  className="icon-button"
                >
                  <img src={backIcon} alt="back icon to go backward" role="presentation" />
                </button>
                <button
                  type="button"
                  onClick={closeClick}
                  onKeyDown={handleKeyDown}
                  aria-label="Close modal"
                  className="icon-button"
                >
                  <img src={closeIcon} alt="close icon to close modal" role="presentation" />
                </button>
                <button
                  type="button"
                  onClick={forwardClick}
                  onKeyDown={handleKeyDown}
                  aria-label="Go forward to next Pokemon"
                  className="icon-button"
                >
                  <img src={rightIcon} alt="forward icon to go forward" role="presentation" />
                </button>
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

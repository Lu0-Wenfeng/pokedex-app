import { useEffect, useState } from 'react';
import { Loader, Modal, Placeholder } from 'rsuite';

import DetailsHeader from '@components/pokemonDetailsCard/detailsHeader/detailsHeader';
import EvolutionChainCard from '@components/pokemonDetailsCard/evolutionChainCard/evolutionChainCard';
import PropertyCard from '@components/pokemonDetailsCard/propertyCard/propertyCard';
import StatCard from '@components/pokemonDetailsCard/statCard/statCard';
import {
  getPokemonDataById,
  getPokemonTypesById,
  getSpeciesDataById,
} from '@services/common.service';

import type { DetailPageProps } from '@app-types/component.types';
import type { Pokemon, PokemonSpecies, PokemonTypeData } from '@app-types/pokemon.types';
import type React from 'react';
import './details.page.scss';

const DetailPage: React.FC<DetailPageProps> = ({
  isCardSelected,
  toggleModal,
  pokemonId,
  offset,
}) => {
  const [currentPokemonId, setCurrentPokemonId] = useState<number>(pokemonId);
  const [data, setPokemonData] = useState<Pokemon | null>(null);
  const [isDetailLoading, setLoading] = useState<boolean>(true);

  const [pokemonSpeciesData, setPokemonSpeciesData] = useState<PokemonSpecies>();
  const [pokemonTypeData, setPokemonTypeData] = useState<PokemonTypeData | null>(null);

  const handleClose = (): void => {
    toggleModal();
  };

  useEffect(() => {
    if (!currentPokemonId) return;

    const setPokemonDetails = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await getPokemonDataById(currentPokemonId);
        setPokemonData(response);
        setLoading(false);

        const speciesResponse = await getSpeciesDataById(currentPokemonId);
        setPokemonSpeciesData(speciesResponse);

        const typeResponse = await getPokemonTypesById(currentPokemonId);
        setPokemonTypeData(typeResponse);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching Pokemon details:', error);
        setLoading(false);
      }
    };

    setPokemonDetails();
  }, [currentPokemonId]);

  const handleForwardClick = (): void => {
    if (currentPokemonId === offset) return;
    setCurrentPokemonId(currentPokemonId + 1);
  };

  const handleBackwordClick = (): void => {
    if (currentPokemonId === 1) return;
    setCurrentPokemonId(currentPokemonId - 1);
  };

  const closePopUp = (): void => {
    toggleModal();
  };

  return (
    <Modal
      dialogClassName="details-modal-container"
      size="md"
      open={isCardSelected}
      onClose={handleClose}
      onExited={() => {
        setPokemonData(null);
      }}
    >
      {data ? (
        <div className="model-container">
          <Modal.Header closeButton={false} className="rs-modal-header-2">
            {isDetailLoading && (
              <Placeholder.Paragraph style={{ marginTop: 30 }} rows={5} graph="image" active />
            )}
            {!isDetailLoading && (
              <div>
                <DetailsHeader
                  data={data}
                  {...(pokemonSpeciesData && {
                    speciesData: pokemonSpeciesData,
                  })}
                  forwardClick={handleForwardClick}
                  backClick={handleBackwordClick}
                  closeClick={closePopUp}
                />
              </div>
            )}
            <div className="padding-components">
              {pokemonTypeData && (
                <PropertyCard
                  {...(pokemonSpeciesData && {
                    speciesData: pokemonSpeciesData,
                  })}
                  data={data}
                  pokemonTypeData={pokemonTypeData}
                />
              )}
            </div>
            <div className="padding-components">
              {data.stats && <StatCard stats={data.stats} />}
            </div>
            <div className="padding-components">
              <EvolutionChainCard data={data} />
            </div>
          </Modal.Header>
          <Modal.Body>{/* Future: Additional content can be added here */}</Modal.Body>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <Loader size="md" />
        </div>
      )}
    </Modal>
  );
};

export default DetailPage;

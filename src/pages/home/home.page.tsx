import React, { useContext, useMemo, useState } from "react";
import { Button, Col, Row } from "rsuite";
import AppFilter from "../../components/filter/filter";
import Header from "../../components/header/header";
import Apploader from "../../components/loader/loader";
import PokemonCard from "../../components/pokemonCard/pokemonCard";
import PokemonContext from "../../context/pokemonContext/pokmon.context";
import "../../styles/common.scss";
import { HomePageProps } from "../../types/component.types";
import { Pokemon } from "../../types/pokemon.types";
import DetailPage from "../details/details.page";
import "./home.scss";

const HomePage: React.FC<HomePageProps> = () => {
  const [isCardSelected, setToggleSelect] = useState<boolean>(false);
  const [pokemonId, setPokemonId] = useState<number | undefined>(undefined);
  const [isFilterEnable, setIsFilterEnable] = useState<boolean>(false);

  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("HomePage must be used within a PokemonProvider");
  }
  const { state, getPokemonData } = context;
  const { pokemonsList, isLoading, isLoadMoreInprogress } = state;

  const pokemonsListView = useMemo(
    () =>
      pokemonsList?.map((data: Pokemon) => (
        <div key={data.id} className="responsive">
          <PokemonCard
            key={data.id}
            data={data}
            onClick={() => {
              setPokemonId(data.id);
              toggleModal();
            }}
          />
        </div>
      )),
    [pokemonsList]
  );

  const handleLoadMoreClick = (): void => {
    getPokemonData();
  };

  const toggleModal = (): void => {
    setToggleSelect((prevState) => !prevState);
  };

  const isFilterEnableHandler = (isEnable: boolean): void => {
    setIsFilterEnable(isEnable);
  };

  return (
    <div className="home-container">
      <div>
        <Header className="header-container">
          <Row className="app-header-wrap show-grid">
            <Col xs={12} sm={12} lg={5} xl={5}>
              <div className="header-title">
                <h3>Pokédex</h3>
              </div>
            </Col>
            <Col xs={12} sm={12} lg={2} xl={2} className="hide">
              <div className="header-horizontal-line"></div>
            </Col>
            <Col xs={24} sm={24} lg={20} xl={20}>
              <div className="subheading">
                <span>Search for any Pokémon that exist on the planet</span>
              </div>
            </Col>
          </Row>
        </Header>
        <div>
          <AppFilter isFilterEnable={isFilterEnableHandler} />
        </div>
      </div>

      {pokemonsList.length > 0 && (
        <div>
          <div className="card-list">{pokemonsListView}</div>
          <div>
            {isLoadMoreInprogress && <Apploader className="loadmore-loader" />}
          </div>
          {!isFilterEnable && (
            <div className="load-more-wrap">
              <Button appearance="link" onClick={handleLoadMoreClick}>
                Load more
              </Button>
            </div>
          )}
        </div>
      )}

      {!pokemonsList.length && (
        <div className="no-data-found">
          <span>No data found</span>
        </div>
      )}

      {isLoading && <Apploader className="app-loader-wrapper" />}

      <div>
        {isCardSelected && pokemonId && (
          <DetailPage
            isCardSelected={isCardSelected}
            toggleModal={toggleModal}
            pokemonId={pokemonId}
            offset={pokemonsList.length}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;

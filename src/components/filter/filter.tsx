import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "rsuite";
import { debounceTime, distinctUntilChanged, map, Observable, of } from "rxjs";
import { baseURL, SEARCH_SLICED } from "../../constants/apiUrls";
import { getCamleCaseString } from "../../constants/pokemon.types";
import PokemonContext from "../../context/pokemonContext/pokmon.context";
import {
  getAllParallelCall,
  getPokemonGenders,
  getPokemonTypes,
  removeDuplicateBy,
} from "../../services/common.service";
import { FilterProps } from "../../types/component.types";
import { GenderOption, TypeOption } from "../../types/context.types";
import { Pokemon, PokemonListItem } from "../../types/pokemon.types";
import "./filter.scss";
import AppMultiSelectDropDown from "./multiSelectdropDown/multiSelectdropDown";
import SearchFilter from "./search/search.filter";

const AppFilter: React.FC<FilterProps> = ({ isFilterEnable }) => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("AppFilter must be used within a PokemonProvider");
  }
  const {
    state,
    getPokemonData,
    dispatch,
    setAppLoading,
    getPokemonDetailsListByUrl,
  } = context;
  const { allPokemonsList, pokemonsTypes, pokemonGenderList } = state;

  const [isOpenTypeFilter, setIsOpenTypeFilter] = useState<boolean>(false);
  const [isOpenGendreFilter, setIsOpenGenderFilter] = useState<boolean>(false);

  let data$: Observable<PokemonListItem[]> = of([]);

  const onOpenTypeHandler = (): void => {
    setIsOpenTypeFilter(true);
  };

  const onCloseTypeHandler = (): void => {
    setIsOpenTypeFilter(false);
  };

  const onOpenGenderHandler = (): void => {
    setIsOpenGenderFilter(true);
  };

  const onCloseGenderHandler = (): void => {
    setIsOpenGenderFilter(false);
  };

  const onCleanTypeHandler = (event?: any): void => {
    if (event) {
      isFilterEnable(false);
    }
  };

  const onSearchChangeHandler = (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    value = value.trim();
    setAppLoading(true);

    if (value.length) {
      isFilterEnable(true);
      data$ = of(allPokemonsList).pipe(
        debounceTime(4000),
        distinctUntilChanged(),
        map((pokmons: PokemonListItem[]) => {
          return pokmons.filter(
            (item) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
          );
        })
      );
    } else {
      filterPokemonData([]);
      getPokemonData(true);
      isFilterEnable(false);
    }

    data$.subscribe((pokemanList: PokemonListItem[]) => {
      let filteredList = pokemanList;
      if (filteredList.length > SEARCH_SLICED) {
        filteredList = filteredList.slice(0, SEARCH_SLICED);
      }
      getPokemonDetailsListByUrl(filteredList).then((res: Pokemon[]) => {
        filterPokemonData(res);
      });
    });
    setAppLoading(false);
  };

  const onTypeChangeHandler = (value: string[], event: any): void => {
    event.preventDefault();
    if (value.length) {
      isFilterEnable(true);
      getAllParallelCall(value)
        .then((pokemonList: any[]) => {
          let processedList = pokemonList.map((res) => res.pokemon);
          processedList = processedList.flat().map((res) => res.pokemon);
          processedList = removeDuplicateBy(processedList, "name");

          if (processedList.length > SEARCH_SLICED) {
            processedList = processedList.slice(-SEARCH_SLICED);
          }

          getPokemonDetailsListByUrl(processedList).then((res: Pokemon[]) => {
            filterPokemonData(res);
          });
        })
        .catch((err: Error) => {
          console.error("Error in type filter:", err);
        });
    } else {
      filterPokemonData([]);
      getPokemonData(true);
      isFilterEnable(false);
    }
  };

  const onGenderChangeHandler = (value: string[], event: any): void => {
    event.preventDefault();
    if (value.length) {
      isFilterEnable(true);
      getAllParallelCall(value)
        .then((pokemonList: any[]) => {
          let processedList = pokemonList
            .map((res) => res.pokemon_species_details)
            .flat();
          processedList = processedList.map(
            (res) =>
              baseURL +
              "/pokemon" +
              res.pokemon_species.url.split("pokemon-species")[1]
          );
          processedList = Array.from(new Set(processedList));

          if (processedList.length > SEARCH_SLICED) {
            processedList = [
              ...processedList.slice(0, SEARCH_SLICED),
              ...processedList.slice(-SEARCH_SLICED),
            ];
          }

          const urlList = processedList.map((res) => ({
            url: res,
            name: res.split("/").filter(Boolean).pop() || "",
          }));
          getPokemonDetailsListByUrl(urlList).then((res: Pokemon[]) => {
            filterPokemonData(res);
          });
        })
        .catch((err: Error) => {
          console.error("Error in gender filter:", err);
        });
    } else {
      filterPokemonData([]);
      getPokemonData(true);
      isFilterEnable(false);
    }
  };

  const filterPokemonData = (data: Pokemon[]): void => {
    dispatch({
      type: "ACTIONS.SET_FILTERED_POKEMON_LIST",
      payload: data,
    });
  };

  const setPokemonTypes = (data: any[]): void => {
    if (data.length) {
      const formattedData: TypeOption[] = data.map((item) => ({
        label: getCamleCaseString(item.name),
        value: item.url,
      }));
      dispatch({
        type: "ACTIONS.SET_POKEMON_TYPE",
        payload: formattedData,
      });
    } else {
      dispatch({
        type: "ACTIONS.SET_POKEMON_TYPE",
        payload: [],
      });
    }
  };

  const setPokemonGendersList = (genderList: any[]): void => {
    const formattedGenderList: GenderOption[] = genderList.map((item) => ({
      label: getCamleCaseString(item.name),
      value: item.url,
    }));

    if (formattedGenderList.length) {
      dispatch({
        type: "ACTIONS.SET_POKEMON_GENDER_LIST",
        payload: formattedGenderList,
      });
    } else {
      dispatch({
        type: "ACTIONS.SET_POKEMON_GENDER_LIST",
        payload: [],
      });
    }
  };

  const getAllPokemonType = async (): Promise<void> => {
    try {
      const res = await getPokemonTypes();
      setPokemonTypes(res.results);
    } catch (err) {
      console.error("Error fetching Pokemon types:", err);
    }
  };

  const getPokemonGendersList = async (): Promise<void> => {
    try {
      const res = await getPokemonGenders();
      setPokemonGendersList(res.results);
    } catch (err) {
      console.error("Error fetching Pokemon genders:", err);
    }
  };

  useEffect(() => {
    getAllPokemonType();
    getPokemonGendersList();
  }, []);

  return (
    <div className="filter-container">
      <div className="filter-wrap">
        <Row className="filter-row-wrap show-grid">
          <Col lg={16} xl={16} xs={24} sm={24}>
            <div>
              <SearchFilter
                placeholder="Name or Number"
                inputClass="pokemon-search-filter"
                label="Search By"
                onChangeHandler={onSearchChangeHandler}
              />
            </div>
          </Col>
          <Col lg={4} xl={4} xs={24} sm={24}>
            <div>
              <AppMultiSelectDropDown
                placeholder="Select Types"
                isOpen={isOpenTypeFilter}
                data={pokemonsTypes}
                label="Type"
                onChangeHandler={onTypeChangeHandler}
                onOpenHandler={onOpenTypeHandler}
                onCloseHandler={onCloseTypeHandler}
                onCleanHandler={onCleanTypeHandler}
              />
            </div>
          </Col>
          <Col lg={4} xl={4} xs={24} sm={24}>
            <div>
              <AppMultiSelectDropDown
                placeholder="Select Gender"
                isOpen={isOpenGendreFilter}
                data={pokemonGenderList}
                label="Gender"
                onChangeHandler={onGenderChangeHandler}
                onOpenHandler={onOpenGenderHandler}
                onCloseHandler={onCloseGenderHandler}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AppFilter;

import SearchIcon from "@rsuite/icons/Search";
import React from "react";
import { Input, InputGroup } from "rsuite";
import { SearchFilterProps } from "../../../types/component.types";
import "./search.filter.scss";

const SearchFilter: React.FC<SearchFilterProps> = ({
  placeholder,
  inputClass,
  onChangeHandler,
  label,
  ...props
}) => {
  return (
    <div className="search-container">
      <div className="flex-col">
        <div className="search-label">
          <span>{label}</span>
        </div>
        <InputGroup {...props} inside className="mb-1">
          <Input
            placeholder={placeholder}
            {...(inputClass && { className: inputClass })}
            size="lg"
            onChange={onChangeHandler}
          />
          <InputGroup.Button>
            <SearchIcon />
          </InputGroup.Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default SearchFilter;

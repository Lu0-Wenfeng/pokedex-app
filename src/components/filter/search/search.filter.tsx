import type { SearchFilterProps } from '@app-types/component.types';

import SearchIcon from '@rsuite/icons/Search';
import { Input, InputGroup } from 'rsuite';

import './search.filter.scss';

const SearchFilter = ({
  placeholder,
  inputClass,
  onChangeHandler,
  label,
  ...props
}: SearchFilterProps) => (
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

export default SearchFilter;

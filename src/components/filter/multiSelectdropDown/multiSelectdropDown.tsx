import React from 'react';
import { CheckPicker } from 'rsuite';
import type { MultiSelectDropdownProps } from '@app-types/component.types';
import './multiSelectdropDown.scss';

const AppMultiSelectDropDown = ({
  label,
  onChangeHandler,
  data,
  placeholder,
  isOpen,
  onOpenHandler,
  onCloseHandler,
  onCleanHandler,
  ...props
}: MultiSelectDropdownProps) => (
  <div className="multiselect-dropdown-wrapper">
    <div className="dropdown-label">
      <span>{label}</span>
    </div>
    <div className={`${isOpen ? 'is-dropdown-open' : ''} check-picker-wrap`}>
      {React.createElement(
        CheckPicker as unknown as React.ComponentType<Record<string, unknown>>,
        {
          block: true,
          placeholder,
          onChange: onChangeHandler,
          size: 'lg',
          onOpen: onOpenHandler,
          onClose: onCloseHandler,
          onClean: onCleanHandler,
          data,
          searchable: false,
          style: { width: 224 },
          ...props,
        }
      )}
    </div>
  </div>
);

export default AppMultiSelectDropDown;

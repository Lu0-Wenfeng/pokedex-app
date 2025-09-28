import type { MultiSelectDropdownProps } from '@app-types/component.types';

import type React from 'react';
import { CheckPicker } from 'rsuite';

import './multiSelectDropdown.scss';

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
}: MultiSelectDropdownProps) => {
  // Debug logging
  console.log('🔍 AppMultiSelectDropDown props:', {
    label,
    placeholder,
    isOpen,
    hasOnOpenHandler: typeof onOpenHandler === 'function',
    hasOnCloseHandler: typeof onCloseHandler === 'function',
    dataLength: data?.length,
  });

  // Wrap callbacks to ensure they're properly called
  const handleOpen = () => {
    console.log('🟢 Wrapper handleOpen called');
    if (onOpenHandler) {
      onOpenHandler();
    }
  };

  const handleClose = () => {
    console.log('🔴 Wrapper handleClose called');
    if (onCloseHandler) {
      onCloseHandler();
    }
  };

  const handleChange = (value: string[], event?: React.SyntheticEvent) => {
    console.log('🔄 Wrapper handleChange called with:', value);
    if (onChangeHandler) {
      onChangeHandler(value, event);
    }
  };

  const handleClean = (event: React.SyntheticEvent) => {
    console.log('🧹 Wrapper handleClean called');
    if (onCleanHandler) {
      onCleanHandler(event);
    }
  };

  return (
    <div className="multiselect-dropdown-wrapper">
      <div className="dropdown-label">
        <span>{label}</span>
      </div>
      <div className={`${isOpen ? 'is-dropdown-open' : ''} check-picker-wrap`}>
        <CheckPicker
          block
          placeholder={placeholder}
          onChange={handleChange}
          size="lg"
          onOpen={handleOpen}
          onClose={handleClose}
          onClean={handleClean}
          data={data}
          searchable={false}
          style={{ width: 224 }}
          {...props}
        />
      </div>
    </div>
  );
};

export default AppMultiSelectDropDown;

import { MultiSelectDropdownProps } from "@app-types/component.types";
import React from "react";
import { CheckPicker } from "rsuite";
import "./multiSelectdropDown.scss";

const AppMultiSelectDropDown: React.FC<MultiSelectDropdownProps> = ({
  label,
  onChangeHandler,
  data,
  placeholder,
  isOpen,
  onOpenHandler,
  onCloseHandler,
  onCleanHandler,
  ...props
}) => {
  return (
    <div className="multiselect-dropdown-wrapper">
      <div className="dropdown-label">
        <span>{label}</span>
      </div>
      <div className={`${isOpen ? "is-dropdown-open" : ""} check-picker-wrap`}>
        {React.createElement(CheckPicker as any, {
          block: true,
          placeholder: placeholder,
          onChange: onChangeHandler,
          size: "lg",
          onOpen: onOpenHandler,
          onClose: onCloseHandler,
          onClean: onCleanHandler,
          data: data,
          searchable: false,
          style: { width: 224 },
          ...props,
        })}
      </div>
    </div>
  );
};

export default AppMultiSelectDropDown;

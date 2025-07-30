import { LoaderProps } from "@app-types/component.types";
import React from "react";
import { Loader } from "rsuite";

const Apploader: React.FC<LoaderProps> = ({ className }) => {
  return (
    <div className={className}>
      <Loader size="md" content="Loading..." />
    </div>
  );
};

export default Apploader;

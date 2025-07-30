import React from 'react';
import { Loader } from 'rsuite';
import type { LoaderProps } from '@app-types/component.types';

const Apploader: React.FC<LoaderProps> = ({ className }) => (
  <div className={className}>
    <Loader size="md" content="Loading..." />
  </div>
);

export default Apploader;

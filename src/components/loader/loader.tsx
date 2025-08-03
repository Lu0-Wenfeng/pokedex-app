import type { LoaderProps } from '@app-types/component.types';
import type React from 'react';

import { Loader } from 'rsuite';

const Apploader: React.FC<LoaderProps> = ({ className }) => (
  <div className={className}>
    <Loader size="md" content="Loading..." />
  </div>
);

export default Apploader;

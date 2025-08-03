import { getPokcolor } from '@constants/pokemon.types';

import type { ColorfulTagProps } from '@app-types/component.types';
import type React from 'react';
import './colorfulTags.scss';

const ColorfulTag: React.FC<ColorfulTagProps> = ({ text, className, type }) => (
  <div>
    <div className={className}>
      <span
        style={{
          background: getPokcolor(type),
        }}
        className="colorful-tag"
      >
        {text}
      </span>
    </div>
  </div>
);

export default ColorfulTag;

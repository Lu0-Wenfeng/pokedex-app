import React from 'react';
import { Loader } from "rsuite";
import { LoaderProps } from '../../types/component.types';

const Apploader: React.FC<LoaderProps> = ({ className }) => {
    return (
        <div className={className}>
            <Loader size="md" content="Loading..." />
        </div>
    );
};

export default Apploader;

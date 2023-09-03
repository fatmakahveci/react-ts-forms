'use client';

import { FC } from 'react';
import './Wrapper.css';
import { WrapperProps } from '@/shared/types/Types';

const Wrapper: FC<WrapperProps> = ({ children}) => {
    return children;
};
export default Wrapper;
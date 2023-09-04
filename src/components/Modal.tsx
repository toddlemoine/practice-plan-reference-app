import React, { FC, PropsWithChildren } from 'react';
import { Button } from './Button';

interface Props {
    onClose: () => void;
}

export const Modal: FC<PropsWithChildren<Props>> = ({ children, onClose }) => {
    return (
        <div className="shadow rounded w-100 p-4 relative">
            <Button className="absolute right-4" onClick={onClose}>
                Close
            </Button>
            {children}
        </div>
    );
};

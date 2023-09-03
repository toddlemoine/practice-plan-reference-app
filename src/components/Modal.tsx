import React, { FC, PropsWithChildren } from 'react';

interface Props {
    onClose: () => void;
}

export const Modal: FC<PropsWithChildren<Props>> = ({ children, onClose }) => {
    return (
        <div className="modal">
            <button className="closeButton" onClick={onClose}>
                Close
            </button>
            {children}
        </div>
    );
};

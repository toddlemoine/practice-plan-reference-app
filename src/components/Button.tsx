import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<PropsWithChildren<Props>> = ({
    children,
    onClick,
    ...props
}) => (
    <button
        className="border-1 border-slate-400 border-2 bg-slate-200 p-2"
        onClick={onClick}
        {...props}
    >
        {children}
    </button>
);

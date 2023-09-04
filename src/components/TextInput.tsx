import { FC, InputHTMLAttributes } from 'react';

export const TextInput: FC<InputHTMLAttributes<HTMLInputElement>> = ({
    ...props
}) => {
    return (
        <input className="border-1 border-slate bg-slate-200 p-2" {...props} />
    );
};

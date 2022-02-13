import clsx from 'clsx';

import s from './CustomInput.module.scss'

export const CustomInput = ({ containerClassName, inputClassName, onInput, ...otherProps }) => {
    return (
        <div className={clsx(s.custom_input, containerClassName)}>
            <input
                className={clsx(s.custom_input__input, inputClassName)}
                onInput={(e) => onInput(e.target.value)}
                {...otherProps}
            />
        </div>
    )
}
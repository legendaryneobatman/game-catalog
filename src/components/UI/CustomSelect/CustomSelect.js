import clsx from 'clsx';

import {useEffect, useMemo, useRef} from 'react';
import {ReactComponent as ChevronDownIcon} from "../../../assets/icons/chevronDown.svg";

import s from './CustomSelect.module.scss'
import {useOutsideClick} from "../../../hooks/useOutsideClick";


export const CustomSelect = ({containerClassName, isOpen, list, selected, onOpen, onClose, onSelect}) => {
    const listRef = useRef()

    useOutsideClick(listRef, onClose)

    const listHeight = useMemo(() => {
        const el = listRef.current
        if (isOpen) {
            let height = 0
            el.querySelectorAll('li').forEach((item) => {
                const styles = window.getComputedStyle(item)
                height += item.offsetHeight + Number(styles.marginBottom.slice(0, -2)) + Number(styles.marginTop.slice(0, -2))
            })
            return height
        } else {
            return 0
        }
    }, [isOpen])

    const listMap = list.map(item => (
        <li
            key={item.id}
            className={s.custom_select__item}
            onClick={() => {
                onSelect(item)
                onClose()
            }}
        >
            {item.label}
        </li>
    ))

    return (
        <div className={clsx(s.custom_select, containerClassName)}>
            <div className={s.custom_select__container} onClick={onOpen}>
                <div className={s.custom_select__selected}>
                    {selected?.label || ''}
                </div>
                <div
                    className={clsx(
                        s.custom_select__icon,
                        {
                            [s.custom_select__icon_close]: !isOpen
                        }
                    )}
                >
                    <ChevronDownIcon color="white"/>
                </div>
            </div>
            <ul
                className={clsx(
                    s.custom_select__list,
                    isOpen ? s.custom_select__list_open : ''
                )}
                ref={listRef}
                style={{height: `${listHeight}px`}}
            >
                {listMap}
            </ul>
        </div>
    )
}
import clsx from "clsx";

import {List} from "../List/List";

import s from './Card.module.scss'

export const Card = ({containerClassName, card, ...otherProps}) => {
    const LIST = [
        { id: 1, title: 'Дата релиза', value: card.released },
        { id: 2, title: 'Рейтинг', value: card.rating },
    ]

    return (
        <div className={clsx(s.card, containerClassName)} {...otherProps}>
            <div className={s.card__header}>
                <img src={card.background_image} className={s.card__img}/>
            </div>
            <div className={s.card__body}>
                <a href="#" className={s.card__title}>
                    {card.name}
                </a>
                <List list={LIST} />
            </div>
        </div>
    )
}
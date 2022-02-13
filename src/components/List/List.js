import s from "../List/List.module.scss";

export const List = ({list}) => (
    <ul className={s.list}>
        {list.map(item => (
            <li key={item.id} className={s.list__item}>
                <div className={s.list__item_title}>
                    {item.title}
                </div>
                <div className={s.list__item_value}>
                    {item.value}
                </div>
            </li>
        ))}
    </ul>
)
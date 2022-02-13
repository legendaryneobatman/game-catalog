import clsx from 'clsx';

import {Search} from '../Search/Search';

import s from './Header.module.scss'

export const Header = () => (
    <header className={clsx('container', s.header)}>
        <Search />
    </header>
)
import clsx from "clsx";

import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

import { TailSpin } from "react-loader-spinner";

import {gameRequests} from "../../api/games";

import {getParams, updateParams} from "../../utils/sort";

import {CustomSelect} from "../../components/UI/CustomSelect/CustomSelect";
import {Card} from "../../components/Card/Card";

import s from './IndexPage.module.scss'
import InfiniteScroll from "react-infinite-scroll-component";

const ORDER_OPTIONS = [
    {id: 1, label: 'Сначала новые', value: 'released'},
    {id: 2, label: 'Сначала старые', value: '-released'},
    {id: 3, label: 'Рейтинг (по убыванию)', value: '-rating'},
    {id: 4, label: 'Рейтинг (по возрастанию)', value: 'rating'}
]

const PLATFORM_OPTIONS = [
    {id: 0, label: 'Все платформы', value: 0},
    {id: 1, label: 'PC', value: 1},
    {id: 2, label: 'PlayStation', value: 2},
    {id: 3, label: 'Xbox', value: 3},
    {id: 4, label: 'iOS', value: 4},
    {id: 5, label: 'Android', value: 8},
    {id: 6, label: 'Apple Macintosh', value: 5},
    {id: 7, label: 'Linux', value: 6},
    {id: 8, label: 'Nintendo', value: 7},
    {id: 9, label: 'Sega', value: 11},
    {id: 10, label: 'Web', value: 14},
]

export const IndexPage = () => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    const [games, setGames] = useState([])

    const [isNextPage, setIsNextPage] = useState(false)

    const [loading, setLoading] = useState(false)

    const [order, setOrder] = useState(
        searchParams.get('ordering')
            ? ORDER_OPTIONS.find(i => i.value === searchParams.get('ordering'))
            : ORDER_OPTIONS[0]
    )
    const [isOpenSort, setIsOpenSort] = useState(false)

    const [platform, setPlatform] = useState(
        searchParams.get('parent_platforms')
            ? PLATFORM_OPTIONS.find(i => i.value === Number(searchParams.get('parent_platforms')))
            : PLATFORM_OPTIONS[0]
    )
    const [isOpenPlatform, setIsOpenPlatform] = useState(false)

    const fetchGames = async ({ page, search, parent_platforms, ordering}, isAppendData) => {
        setLoading(!isAppendData)
        const response = await gameRequests.all({
            page,
            search,
            parent_platforms,
            ordering
        })
        if (response.data.next) {
            setIsNextPage(true)
        }
        if (isAppendData) {
            const newData = [...games, ...response.data.results]
            setGames(newData)
        } else {
            setGames(response.data.results)
        }
        setLoading(false)
    }

    const paginate = () => {
        if (isNextPage) {
            const params = getParams(searchParams)
            params.page = Number(params.page) + 1
            updateParams(setSearchParams, params)
            fetchGames(params, true)
        }
    }

    useEffect(() => {
        const params = {
            page:  searchParams.get('page') || 1,
            search: searchParams.get('search'),
            ordering: order.value,
            parent_platforms: platform.value,
        }
        updateParams(
            setSearchParams,
            params
        );
        fetchGames(params)
    }, [order, platform, searchParams.get('search')])

    const cards = games.map((item) => <Card
        key={item.id}
        containerClassName={s.index_page__card}
        card={item}
        onClick={() => navigate(`/game/${item.slug}`)}
    />)


    return (
        <div className={clsx('container', s.index_page)}>
            <div className={s.index_page__nav}>
                <CustomSelect
                    containerClassName={s.index_page__nav_item}
                    isOpen={isOpenSort}
                    list={ORDER_OPTIONS}
                    selected={order}
                    onSelect={setOrder}
                    onOpen={() => setIsOpenSort(true)}
                    onClose={() => setIsOpenSort(false)}
                />
                <CustomSelect
                    containerClassName={s.index_page__nav_item}
                    isOpen={isOpenPlatform}
                    list={PLATFORM_OPTIONS}
                    selected={platform}
                    onSelect={setPlatform}
                    onOpen={() => setIsOpenPlatform(true)}
                    onClose={() => setIsOpenPlatform(false)}
                />
            </div>
            {loading
                ?
                <TailSpin color="#3B3B3BFF" wrapperClass={s.index_page__loading}/>
                :
                <InfiniteScroll
                    dataLength={games.length} //This is important field to render the next data
                    next={paginate}
                    hasMore={true}
                    loader={<TailSpin color="#3B3B3BFF" wrapperClass={s.index_page__loading}/>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Вы просмотрели все</b>
                        </p>
                    }
                    // below props only if you need pull down functionality
                    refreshFunction={paginate}
                    pullDownToRefresh
                    pullDownToRefreshThreshold={50}
                >
                    <div className={s.index_page__list}>
                        {cards}
                    </div>
                </InfiniteScroll>
            }
        </div>
    )
}
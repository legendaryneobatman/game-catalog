import {useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";

import {Carousel} from "react-responsive-carousel";
import {TailSpin} from "react-loader-spinner";

import {gameRequests} from "../../api/games";

import 'react-responsive-carousel/lib/styles/carousel.min.css'

import s from './GamePage.module.scss'
import {List} from "../../components/List/List";


export const GamePage = () => {
    const {slug} = useParams()

    const [loading, setLoading] = useState(true)

    const [game, setGame] = useState({})
    const [screenshots, setScreenshots] = useState([])

    const fetchGame = async () => {
        setLoading(true)
        const gameResponse = await gameRequests.get(slug)
        setGame(gameResponse.data)
        const screenshotsResponse = await gameRequests.screenshots(gameResponse.data.id)
        setScreenshots(screenshotsResponse.data.results)
        setLoading(false)
    }

    useEffect(() => {
        fetchGame()
    }, [])

    const LIST = [
        { id: 1, title: 'Дата релиза', value: game.released },
        { id: 2, title: 'Рейтинг', value: game.rating },
    ]

    const slides = screenshots.map((item) => <img src={item.image} key={item.id}/>)

    return (
        <div className="container">
            {
                loading
                    ?
                    <TailSpin color="#3B3B3BFF" wrapperClass={s.game_page__loader}/>
                    :
                    <div className={s.game_page}>
                        <div className={s.game_page__poster}>
                            <img src={game.background_image} />
                        </div>
                        <h1 color={s.game_page__title}>
                            <a href={game.website} target="_blank">
                                {game.name}
                            </a>
                        </h1>
                        <div
                            className={s.game_page__description}
                            dangerouslySetInnerHTML={{__html: game.description}}
                        />
                        {screenshots && screenshots.length > 1 &&
                            <div className={s.game_page__slider}>
                                <Carousel showArrows={true}>
                                    {slides}
                                </Carousel>
                            </div>
                        }
                        <List list={LIST}/>
                    </div>
            }
        </div>
    )
}
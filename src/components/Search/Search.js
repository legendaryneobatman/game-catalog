import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

import {CustomInput} from "../UI/CustomInput/CustomInput";
import {getParams} from "../../utils/sort";

export const Search = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState('')

    const onSearch = (e) => {
        if (e.key === 'Enter') {
            const params = getParams(searchParams)
            params.search = search;
            navigate(`/?${new URLSearchParams(params).toString()}`, {
                replace: true
            })
        }
    }

    useEffect(() => {
        setSearchParams(searchParams.get('search') ? searchParams.get('search') : '')
    }, [])

    return (
        <CustomInput value={search} onInput={setSearch} onKeyPress={onSearch}/>
    )
}
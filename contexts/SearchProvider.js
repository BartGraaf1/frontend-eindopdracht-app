import React, { useState, useEffect } from 'react';

const SearchContext = React.createContext();

const SearchProvider = (props) => {

    const [query, setQuery] = useState("");
    const [country, setCountry] = useState(67);
    const [type, setType] = useState(1);

    function setCountryF(val){
        setCountry(val);
    }
    function setQueryF(val){
        setQuery(val);
    }
    function setTypeF(val){
        setType(val);
    }
    const data = {
        country,
        setCountryF,
        query,
        setQueryF,
        type,
        setTypeF,
    }

    return (
        <SearchContext.Provider
            value={data}
        >
            {props.children}
        </SearchContext.Provider>
    )
}

export { SearchProvider, SearchContext };
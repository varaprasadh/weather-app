import React from 'react'
import loadIcon from "./loading.png";

function Loader() {
    return (
        <div className="loader">
            <img src={loadIcon} alt="loading icon"/>
        </div>
    )
}

export default Loader;


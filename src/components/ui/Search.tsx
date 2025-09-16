"use client";

import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";

const SearchForm = () => {
    const [isShowClear, setIsShowClear] = useState(false);
    const [text, setText] = useState('');

    const handleSearch = (e: any) => {
        setText(e.target.value);
        setIsShowClear(e.target.value);
    }

    const handleClearText = () => {
        setText('');
        setIsShowClear(false);
    }

    return (
        <form action="" className="header__form">
            <img src="icons/search.svg" alt="" className="header__input-icon" />
            <input
                id="search"
                value={text}
                type="text"
                placeholder="Search here..."
                className="header__input"
                onInput={(e) => handleSearch(e)} />
            {isShowClear &&
                <CloseOutlined
                    className="header__input-clear-btn"
                    onClick={handleClearText} />}

        </form>
    )

}

export default SearchForm;
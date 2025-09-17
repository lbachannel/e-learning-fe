"use client";

import { CloseOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useState } from "react";

const SearchForm = () => {
    const [isShowClear, setIsShowClear] = useState(false);
    const [text, setText] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setText(value);
        setIsShowClear(!!value);
    }

    const handleClearText = () => {
        setText('');
        setIsShowClear(false);
    }

    return (
        <form action="" className="header__form">
            <Image width={13} height={13} src="icons/search.svg" alt="" className="header__input-icon" />
            <input
                id="search"
                value={text}
                type="text"
                placeholder="Search here..."
                className="header__input"
                onChange={handleSearch} />
            {isShowClear &&
                <CloseOutlined
                    className="header__input-clear-btn"
                    onClick={handleClearText} />}

        </form>
    )

}

export default SearchForm;
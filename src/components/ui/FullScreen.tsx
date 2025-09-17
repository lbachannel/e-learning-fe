'use client';

import Image from "next/image";

const Fullscreen = () => {
    // Header fullscreen
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    return (
        <span onClick={toggleFullscreen}>
            <Image
                width={16}
                height={16}
                src="icons/fullscreen.svg"
                alt=""
                className="header__settings-list-item-icon" />
        </span>
    )
}

export default Fullscreen;
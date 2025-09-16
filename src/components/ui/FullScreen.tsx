import { useEffect, useState } from "react";

const Fullscreen = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        }
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, [])
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
            <img
                src="icons/fullscreen.svg"
                alt=""
                className="header__settings-list-item-icon" />
        </span>
    )
}

export default Fullscreen;
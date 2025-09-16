"use client";

import { useTheme } from "@/components/ThemeProvider";

const DarkLightMode = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <label htmlFor="themes-input" className="themes">
            <input
                type="checkbox"
                id="themes-input"
                className="themes-input"
                hidden
                onChange={toggleTheme}
                checked={theme === 'dark'} />
            <span className="themes-slider"></span>
        </label>
    )

}

export default DarkLightMode;
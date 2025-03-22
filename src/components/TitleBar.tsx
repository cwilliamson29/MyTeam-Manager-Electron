import React from "react";

interface TitlebarProps {
    title: string;
}

const TitleBar: React.FC<TitlebarProps> = ({ title }) => {
    const handleMinimize = () => {
        window.electron.ipcRenderer.sendMessage("minimizeApp", ["minimizeApp"]);
    };

    const handleMaximize = () => {
        window.electronAPI.toggleMaximizeWindow();
    };

    const handleClose = () => {
        window.electronAPI.closeWindow();
    };

    return (
        <div className="titlebar">
            <div className="titlebar-title">{title}</div>
            <div className="titlebar-buttons">
                <button onClick={handleMinimize} className="titlebar-button">
                    _
                </button>
                <button onClick={handleMaximize} className="titlebar-button">
                    [ ]
                </button>
                <button onClick={handleClose} className="titlebar-button">
                    X
                </button>
            </div>
        </div>
    );
};

export default TitleBar;

import React, { useState} from 'react'

export const ERROR_POPUP = 0;
export const INFO_POPUP = 1;
export const PopupContext = React.createContext([]);

export const PopupContextProvider = props => {
    const [popupList, setPopups] = useState([]);
    const addPopup = (text, type) => {
        if (type === ERROR_POPUP || type === INFO_POPUP) {
            setPopups((prevState) => {
                const newPopupIndex = prevState.length === 0  ? 0 : prevState[prevState.length-1].index + 1;
                return [...prevState, {text: text, type: type, index: newPopupIndex}];
            });
        } else {
            console.error("Invalid popup type: " + type + ". Should be ERROR_POPUP or INFO_POPUP.")
        }
    };

    const removePopup = (popupId) => {
        setPopups(popupList.filter((popup) => (popup.index !== popupId)))
    };

    return (
        <PopupContext.Provider value={{popupList: popupList, addPopup: addPopup, removePopup: removePopup}}>
            {props.children}
        </PopupContext.Provider>
    );
};

// export const PopupConsumer = PopupContext.Consumer;
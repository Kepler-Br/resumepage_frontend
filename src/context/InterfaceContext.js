import React, { useState } from 'react'

export const LANGUAGE_EN = 0;
export const LANGUAGE_RU = 1;
export const InterfaceContext = React.createContext([]);

export const InterfaceContextProvider = props => {
    const [currentLanguage, setCurrentLanguage] = useState(LANGUAGE_EN);
    const setLanguage = (language) => {
        if (language !== LANGUAGE_EN && language !== LANGUAGE_RU) {
            console.error(language + " is not a valid language. LANGUAGE_EN and LANGUAGE_RU are valid.");
            return;
        }
        setCurrentLanguage(language);
    };

    return (
        <InterfaceContext.Provider value={{setLanguage: setLanguage, currentLanguage: currentLanguage}}>
            {props.children}
        </InterfaceContext.Provider>
    );
};

// export const PopupConsumer = PopupContext.Consumer;
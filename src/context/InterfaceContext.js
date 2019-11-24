import Cookies from "universal-cookie";
import React, { useState, useEffect } from 'react';

export const LANGUAGE_EN = 0;
export const LANGUAGE_RU = 1;
export const InterfaceContext = React.createContext([]);

export const InterfaceContextProvider = props => {
    const [currentLanguage, setCurrentLanguage] = useState(LANGUAGE_EN);
    useEffect(() => {
        let cookies = new Cookies();
        let cookieLanguage = parseInt(cookies.get("language"));
        // If language was not set or is incorrect.
        if (cookieLanguage !== LANGUAGE_EN && cookieLanguage !== LANGUAGE_RU) {
            console.log("Cookie language is not LANGUAGE_EN or LANGUAGE_RU. Setting it to LANGUAGE_EN");
            cookies.set("language", LANGUAGE_EN, { path: '/' });
            return;
        }
        setCurrentLanguage(cookieLanguage);
    }, []);
    const setLanguage = (language) => {
        if (language !== LANGUAGE_EN && language !== LANGUAGE_RU) {
            console.error(language + " is not a valid language. LANGUAGE_EN and LANGUAGE_RU are valid.");
            return;
        }
        let cookies = new Cookies();
        cookies.set("language", language, { path: '/' });
        setCurrentLanguage(language);
    };

    return (
        <InterfaceContext.Provider value={{setLanguage: setLanguage, currentLanguage: currentLanguage}}>
            {props.children}
        </InterfaceContext.Provider>
    );
};

// export const PopupConsumer = PopupContext.Consumer;
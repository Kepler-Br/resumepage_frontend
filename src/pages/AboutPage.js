import React, { useContext, useState, useEffect } from 'react';
import { LANGUAGE_RU, LANGUAGE_EN, InterfaceContext } from '../context/InterfaceContext';
import axios from 'axios';
import {ERROR_POPUP, PopupContext} from "../context/PopupContext";

const translationEng = {
    onFetchError: "Cannot get about page. Try again later.",
};

const translationRus = {
    onFetchError: "Не могу загрузить страницу с сервера. Попробуйте позже.",
};

const AboutPage = (props) => {
    const [about, setAbout] = useState([]);
    const popupContext = useContext(PopupContext);
    const interfaceContext = useContext(InterfaceContext);
    let translatedBody;
    let currentTranslation;
    if (interfaceContext.currentLanguage === LANGUAGE_EN) {
        currentTranslation = translationEng;
        translatedBody = about.bodyEn;
    }
    else if (interfaceContext.currentLanguage === LANGUAGE_RU) {
        currentTranslation = translationRus;
        translatedBody = about.bodyRu;
    }

    const fetchAbout = async () => {
        let response;
        try {
            response = await axios.get("/api/about.get");
            setAbout(response.data);
        } catch (e) {
            popupContext.addPopup(currentTranslation.onFetchError, ERROR_POPUP);
        }
    };

    useEffect(() => {fetchAbout();}, []);
    return (
        <div className="row">
            <div className="col mt-2">
                {<span dangerouslySetInnerHTML={{__html: translatedBody}}/>}
            </div>
        </div>
    );
};

export default AboutPage;
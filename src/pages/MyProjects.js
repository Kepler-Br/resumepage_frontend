import React, { useContext, useState } from 'react';
import { LANGUAGE_RU, LANGUAGE_EN, InterfaceContext } from '../context/InterfaceContext';
import { ERROR_POPUP, INFO_POPUP, PopupContext } from '../context/PopupContext';
import axios from 'axios';
import ProjectsSidebar from "../components/ProjectsSidebar";

const translationEng = {
    pick: "<- Pick one of these.",
};

const translationRus = {
    pick: "<- Выберите один из них.",
};

const MyProjects = (props) => {
    const interfaceContext = useContext(InterfaceContext);
    // const popupContext = useContext(PopupContext);
    let currentTranslation;
    if (interfaceContext.currentLanguage === LANGUAGE_EN)
        currentTranslation = translationEng;
    else if (interfaceContext.currentLanguage === LANGUAGE_RU)
        currentTranslation = translationRus;

    return (
        <div className="row">
            <ProjectsSidebar />
            {<h3>{currentTranslation.pick}</h3>}
        </div>
    );
};

export default MyProjects;
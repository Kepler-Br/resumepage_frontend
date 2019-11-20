import React, { useContext, useState } from 'react';
import { LANGUAGE_RU, LANGUAGE_EN, InterfaceContext } from '../context/InterfaceContext';
import { ERROR_POPUP, INFO_POPUP, PopupContext } from '../context/PopupContext';
import axios from 'axios';
import ProjectsSidebar from "../components/ProjectsSidebar";
import ProjectsView from "../components/ProjectView";

const translationEng = {
    submit: "Submit",
};

const translationRus = {
    submit: "Отправить",
};

const ProjectPage = (props) => {
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
            <ProjectsView projectId={props.match.params.id}/>
        </div>
    );
};

export default ProjectPage;
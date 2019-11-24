import React, { useContext, useState, useEffect } from 'react';
import { LANGUAGE_RU, LANGUAGE_EN, InterfaceContext } from "../context/InterfaceContext";

import axios from 'axios';
import {ERROR_POPUP, PopupContext} from "../context/PopupContext";
import ImageCard from "./ImageCard";

const translationEng = {
    projectString: "Project",
    onFetchError: "Cannot fetch project data. Try again later.",
};

const translationRus = {
    projectString: "Проект",
    onFetchError: "Не могу получить данные проекта. Попробуйте позже.",
};

const ProjectsView = (props) => {
    const popupContext = useContext(PopupContext);
    const interfaceContext = useContext(InterfaceContext);
    const [project, setProject] = useState([]);
    const [titleImage, setTitleImage] = useState({});
    const [screenshots, setScreenshots] = useState([]);
    let translatedBody;
    let currentTranslation;
    if (interfaceContext.currentLanguage === LANGUAGE_EN) {
        currentTranslation = translationEng;
        translatedBody = project.body;
    }
    else if (interfaceContext.currentLanguage === LANGUAGE_RU) {
        currentTranslation = translationRus;
        translatedBody = project.bodyRu;
    }

    const fetchProject = async () => {
        let response;
        try {
            response = await axios.get(`/api/project.get?id=${props.projectId}`);
        } catch (e) {
            popupContext.addPopup(currentTranslation.onFetchError, ERROR_POPUP);
            return;
        }
        const screenshotIds = response.data.images;
        setProject(response.data);
        try {
            response = await axios.get(`/api/image.get?id=${response.data.titleImage}`);
            setTitleImage(response.data);
        } catch (e) {
            console.error("Image not loaded. Cannot get response from server.")
        }
        let screenshots = [];
        for (let i = 0; i < screenshotIds.length; i++) {
            try {
                response = await axios.get(`/api/image.get?id=${screenshotIds[i]}`);
                screenshots.push(response.data);
            } catch (e) {
                console.error("Image not loaded. Cannot get response from server.");
            }
        }
        setScreenshots(screenshots);
    };

    useEffect(() => {
        fetchProject();
    }, [props.projectId]);
    // console.log(titleImage);
    return (
        <div className="col-md-9 col-xl-10 mt-2">
            <div style={{background: `url(${titleImage.url}) center center / cover no-repeat fixed`}}
                 className="container-fluid project-preview-image"></div>
            <h1>{currentTranslation.projectString + " " + project.name }</h1>
            <span dangerouslySetInnerHTML={{__html: translatedBody}}/>

            <br />
            <a href={project.githubUrl}><i style={{color: "#3f3f3f"}} className="fab fa-github"></i> Github</a>
            <hr/>
            <div className="container">
                <div className="row justify-content-center">
                    {screenshots.map((screenshot) => {return <ImageCard key={screenshot.id} data={screenshot}/>;})}
                </div>
            </div>
        </div>
    );
};

export default ProjectsView;
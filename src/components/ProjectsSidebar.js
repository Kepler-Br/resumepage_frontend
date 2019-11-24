import React, { useContext, useState, useEffect } from 'react';
import { LANGUAGE_RU, LANGUAGE_EN, InterfaceContext } from "../context/InterfaceContext";
import { Link } from "react-router-dom";
import axios from 'axios';
import {ERROR_POPUP, PopupContext} from "../context/PopupContext";

const translationEng = {
    projectString: "Project",
    myProjects: "My projects",
    onFetchError: "Error fetching project list data. Try later."
};

const translationRus = {
    projectString: "Проект",
    myProjects: "Мои проекты",
    onFetchError: "Ошибка при получении листа проектов. Попробуйте позже."
};

const ProjectsSidebar = (props) => {
    const popupContext = useContext(PopupContext);
    const interfaceContext = useContext(InterfaceContext);
    let currentTranslation;
    if (interfaceContext.currentLanguage === LANGUAGE_EN)
        currentTranslation = translationEng;
    else if (interfaceContext.currentLanguage === LANGUAGE_RU)
        currentTranslation = translationRus;

    const [projectList, setProjectList] = useState([]);
    const fetchProjects = async () => {
        let response;
        try {
            response = await axios.get("/api/project.get_all");
        } catch (e) {
            popupContext.addPopup(currentTranslation.onFetchError, ERROR_POPUP);
            return;
        }
        setProjectList(response.data);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="col-md-3 col-xl-2 sidebar">
            <div className="container-fluid mt-2 d-flex">
                <span className="h5 md-text-center" style={{flex: "1"}}>{currentTranslation.myProjects}</span>
                <button className="navbar-toggler d-md-none" type="button" data-toggle="collapse"
                        data-target="#sidebarBlock">
                    <i className="fas fa-bars"></i>
                </button>
            </div>
            <nav className="collapse show sidebar-links" id="sidebarBlock">
                <hr className="m-1"/>
                {
                    projectList.map((project) => {
                        return <Link to={"/project/" + project.id} key={project.id}>{project.name}</Link>;
                    })
                }
            </nav>
        </div>
    );
};

export default ProjectsSidebar;
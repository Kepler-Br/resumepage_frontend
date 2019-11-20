import React, { useContext } from 'react';
import { LANGUAGE_RU, LANGUAGE_EN, InterfaceContext } from "../context/InterfaceContext";
import { Link } from "react-router-dom";

const translationEng = {
    projects: "My projects",
    renders: "My renders",
    about: "About me",
    contact: "Contact me",
    language: "Language",
    english: "English",
    russian: "Russian",
};

const translationRus = {
    projects: "Мои проекты",
    renders: "Мои рендеры",
    about: "Обо мне",
    contact: "Обратная связь",
    language: "Язык",
    english: "Английский",
    russian: "Русский",
};

const Navbar = (props) => {
    const interfaceContext = useContext(InterfaceContext);
    let currentTranslation;
    if (interfaceContext.currentLanguage === LANGUAGE_EN)
        currentTranslation = translationEng;
    else if (interfaceContext.currentLanguage === LANGUAGE_RU)
        currentTranslation = translationRus;
    const setLanguage = (language) => {
        interfaceContext.setLanguage(language);
    };

    return (
        <nav className="navbar navbar-bg-purple sticky-top">
            <Link to="/" className="navbar-brand navbar-text-active">Kepler-Br</Link>

            <div className=" navbar-nav-scroll">
                <ul className="navbar-nav flex-row">
                    <li className="nav-item">
                        <Link to="/projects" className="nav-item nav-link mr-3 navbar-text-inactive">{currentTranslation.projects}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/renders" className="nav-item nav-link mr-3 navbar-text-inactive">{currentTranslation.renders}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-item nav-link mr-3 navbar-text-inactive">{currentTranslation.about}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact_me" className="nav-item nav-link mr-3 navbar-text-inactive">{currentTranslation.contact}</Link>
                    </li>
                </ul>
            </div>

            <div className="nav-item dropdown">
                <span className="nav-item nav-link dropdown-toggle mr-md-2 navbar-text-inactive" id="bd-versions"
                    data-toggle="dropdown">
                {currentTranslation.language}
                </span>
                <div className="dropdown-menu dropdown-menu-right">
                    <span className="dropdown-item" onClick={setLanguage.bind(undefined, LANGUAGE_EN)}>{currentTranslation.english}</span>
                    <span className="dropdown-item" onClick={setLanguage.bind(undefined, LANGUAGE_RU)}>{currentTranslation.russian}</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
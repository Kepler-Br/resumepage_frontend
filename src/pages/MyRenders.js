import React, { useContext, useState, useEffect } from 'react';
import { LANGUAGE_RU, LANGUAGE_EN, InterfaceContext } from '../context/InterfaceContext';
import axios from 'axios';
import {ERROR_POPUP, PopupContext} from "../context/PopupContext";
import RenderCard from "../components/RenderCard";

const translationEng = {
    onFetchError: "Cannot fetch render images. Try again later.",
};

const translationRus = {
    onFetchError: "Не могу получить рендеры. Попробуйте позже.",
};

const MyRenders = (props) => {
    const interfaceContext = useContext(InterfaceContext);
    const popupContext = useContext(PopupContext);
    const [renderList, setRenderList] = useState([]);
    let currentTranslation;
    if (interfaceContext.currentLanguage === LANGUAGE_EN)
        currentTranslation = translationEng;
    else if (interfaceContext.currentLanguage === LANGUAGE_RU)
        currentTranslation = translationRus;

    const fetchRenders = async () => {
        let response;
        try {
            response = await axios.get("http://127.0.0.1:8000/api/render.get_all");
            setRenderList(response.data);
        } catch (e) {
            popupContext.addPopup(currentTranslation.onFetchError, ERROR_POPUP);
        }
    };

    useEffect(() => {fetchRenders();}, []);
    return (
        <div className="row justify-content-center">
            {/*<div className="col-12 mt-2">*/}
                {renderList.map((render) => {
                    return <RenderCard data={render.image} key={render.id} />
                })}
                {/*{projectImages.map(((image, index) => (*/}
                {/*    <ProjectImage data={image} key={image.id} projectId={projects[index].id} />*/}
                {/*)))}*/}
            {/*</div>*/}
        </div>
    );
};

export default MyRenders;
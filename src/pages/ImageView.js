import React, { useContext, useState, useEffect } from 'react';
import { LANGUAGE_RU, LANGUAGE_EN, InterfaceContext } from '../context/InterfaceContext';
import { ERROR_POPUP, INFO_POPUP, PopupContext } from '../context/PopupContext';
import axios from 'axios';
import ProjectsSidebar from "../components/ProjectsSidebar";

const translationEng = {
    onFetchError: "Cannot fetch image data. Try again later.",
};

const translationRus = {
    onFetchError: "Не могу получить данные изображения. Попробуйте позже.",
};

const ImageView = (props) => {
    const interfaceContext = useContext(InterfaceContext);
    const popupContext = useContext(PopupContext);
    const [data, setData] = useState({});
    let currentTranslation;
    if (interfaceContext.currentLanguage === LANGUAGE_EN){
        currentTranslation = translationEng;
        currentTranslation.title = data.title;
        currentTranslation.description = data.description;
    }
    else if (interfaceContext.currentLanguage === LANGUAGE_RU){
        currentTranslation = translationRus;
        currentTranslation.title = data.titleRu;
        currentTranslation.description = data.descriptionRu;
    }
    const fetchImageData = async () => {
        let response;
        try {
            response = await axios.get(`http://127.0.0.1:8000/api/image.get?id=${props.match.params.id}`);
            setData(response.data);
        } catch (e) {
            popupContext.addPopup(currentTranslation.onFetchError, ERROR_POPUP);
            return;
        }
    };

    useEffect(() => {fetchImageData();}, []);
    return (
        <div className="row text-center">
            <div className="col mb-2  justify-content-center">
                <img src={data.url} alt="Oh noes" className="img-fluid" />
                    <h5 className="d-block mt-2">{currentTranslation.title}</h5>
                    <span className="d-block">{currentTranslation.description}</span>
            </div>
        </div>
    );
};

export default ImageView;
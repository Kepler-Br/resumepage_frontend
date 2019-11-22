import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {InterfaceContext, LANGUAGE_EN, LANGUAGE_RU} from "../context/InterfaceContext";

const RenderCard = (props) => {
    const interfaceContext = useContext(InterfaceContext);
    let translation = {};
    if (interfaceContext.currentLanguage === LANGUAGE_EN) {
        translation = {
            title: props.data.title,
            description: props.data.description
        };
    }
    else if (interfaceContext.currentLanguage === LANGUAGE_RU) {
        translation = {
            title: props.data.titleRu,
            description: props.data.descriptionRu
        };
    }
    return (
        <div className="m-2">
            <div className="card" style={{width: "18rem"}}>
                <Link to={"/image/" + props.data.id}>
                <div style={{backgroundImage: `url(${props.data.url})`}}
                     className="container-fluid preview-image" >
                </div>
                </Link>
                <div className="card-header">
                    <h5 className="card-title mb-0">{translation.title}</h5>
                </div>
            </div>
        </div>

    );
};

export default RenderCard;
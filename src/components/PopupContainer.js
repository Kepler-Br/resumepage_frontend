import React, { useContext } from 'react'
import Popup from './Popup'
import { PopupContext } from "../context/PopupContext";

const PopupContainer = (props) => {
    const popupContext = useContext(PopupContext);
    const errorList = popupContext.popupList.map(
        (popup) => <Popup text={popup.text} key={popup.index} popupId={popup.index} type={popup.type}/>
    );
    return (
        <div className="container-fluid" style={{position: "fixed", bottom: "0px"}}>
          { errorList }
        </div>
    );
};

export default PopupContainer;

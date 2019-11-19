import React, {useContext} from 'react'
import { PopupContext } from "../context/PopupContext";
import { ERROR_POPUP, INFO_POPUP } from "../context/PopupContext";

const Popup = (props) => {
    const popupContext = useContext(PopupContext);
    const onClose = () => (popupContext.removePopup(props.popupId));

    let popupClasses = "alert";
    if (props.type === ERROR_POPUP) {
        popupClasses += " alert-danger"
    } else if (props.type === INFO_POPUP) {
        popupClasses += " alert-info"
    }
    return(
        <div className={popupClasses} role="alert">
          <span>{props.text}</span>
          <button style={{cursor: "pointer"}} className="close" onClick={onClose}>&times;</button>
        </div>
    );
};

export default Popup;

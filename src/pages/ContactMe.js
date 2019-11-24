import React, { useContext, useState } from 'react';
import { LANGUAGE_RU, LANGUAGE_EN, InterfaceContext } from '../context/InterfaceContext';
import { ERROR_POPUP, INFO_POPUP, PopupContext } from '../context/PopupContext';
import axios from 'axios';
import Cookies from "universal-cookie";

const translationEng = {
    submit: "Submit",
    onSubmit: "Your message has been submitted.",
    onNameEmpty: "Name field is required.",
    onContactsEmpty: "Contacts field is required.",
    onMessageEmpty: "Message field is required.",
    tooFast: "You're too fast! Try in a day.",

    contactsLabel: "Your contacts*",
    contactsInputPlaceholder: "Contacts",
    contactsSmall: "I'll never share your contacts.",

    nameLabel: "Your name*",
    nameInputPlaceholder: "Name",

    messageLabel: "Your message*",
    messageInputPlaceholder: "What do you want to tell me?",
};

const translationRus = {
    submit: "Отправить",
    onSubmit: "Ваше сообщение было отправлено.",
    onNameEmpty: "Поле Имя не должно быть пустым.",
    onContactsEmpty: "Поле Контакты не должно быть пустым.",
    onMessageEmpty: "Поле Сообщение не должно быть пустым.",
    tooFast: "Слишком быстро! Попробуйте через день.",

    contactsLabel: "Ваши контакты*",
    contactsInputPlaceholder: "Контакты",
    contactsSmall: "Я не буду разглашать ваши контакты.",

    nameLabel: "Ваше имя*",
    nameInputPlaceholder: "Имя",

    messageLabel: "Ваше сообщение*",
    messageInputPlaceholder: "Что вы хотите сказать мне?",
};

const ContactMe = (props) => {
    const MAX_MESSAGE_LEN = 500;
    const MAX_CONTACT_LEN = 100;
    const MAX_NAME_LEN = 100;
    const interfaceContext = useContext(InterfaceContext);
    const popupContext = useContext(PopupContext);
    let currentTranslation;
    if (interfaceContext.currentLanguage === LANGUAGE_EN)
        currentTranslation = translationEng;
    else if (interfaceContext.currentLanguage === LANGUAGE_RU)
        currentTranslation = translationRus;
    const [fields, setFields] = useState({contactsInputField: "",
                                                    nameInputField: "",
                                                    messageInputField: ""});

    const onChange = (e) => {
        if (e.target.id === "messageInputField" && e.target.value.length > MAX_MESSAGE_LEN)
            return;
        if (e.target.id === "nameInputField" && e.target.value.length > MAX_NAME_LEN)
            return;
        if (e.target.id === "contactsInputField" && e.target.value.length > MAX_CONTACT_LEN)
            return;
        const newFields = {...fields, [e.target.id]: e.target.value};
        setFields(newFields);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const PERIOD_BETWEEN_MESSAGES = 60*60*24;
        let cookies = new Cookies();
        let lastMessageTime = cookies.get("last_message");
        if (typeof parseInt(lastMessageTime) !== "number") {
            cookies.set("last_message", 0, { path: '/' });
            lastMessageTime = 0;
        }
        const currentTime = Math.round((new Date()).getTime()/1000);
        if ((currentTime - lastMessageTime) < PERIOD_BETWEEN_MESSAGES) {
            popupContext.addPopup(currentTranslation.tooFast, ERROR_POPUP);
            return;
        }
        if (fields.contactsInputField.length === 0) {
            popupContext.addPopup(currentTranslation.onContactsEmpty, ERROR_POPUP);
            return;
        }
        if (fields.nameInputField.length === 0) {
            popupContext.addPopup(currentTranslation.onNameEmpty, ERROR_POPUP);
            return;
        }
        if (fields.messageInputField.length === 0) {
            popupContext.addPopup(currentTranslation.onMessageEmpty, ERROR_POPUP);
            return;
        }
        axios.get(`/api/message.send?contacts=${fields.contactsInputField}&name=${fields.nameInputField}&message=${fields.messageInputField}`)
            .then((res) => {
                popupContext.addPopup(currentTranslation.onSubmit, INFO_POPUP);
                cookies.set("last_message", currentTime, { path: '/' });
            })
            .catch((reason) => {
                let errorMessage = "Denied: ";
                try {
                    errorMessage += reason.response.data.error;
                } catch (e) {
                    errorMessage += reason.toString();
                }
                popupContext.addPopup(errorMessage, ERROR_POPUP);
            });
    };

    return (
        <div className="row justify-content-center">
            <form className="mb-2 mt-2 col-8" autoComplete="off" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="contactsInputField">{currentTranslation.contactsLabel}</label>
                    <input value={fields.contactsInputField} onChange={onChange} type="text" className="form-control" id="contactsInputField" placeholder={currentTranslation.contactsInputPlaceholder} />
                    <small className="form-text text-muted">{currentTranslation.contactsSmall}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="nameInputField">{currentTranslation.nameLabel}</label>
                    <input value={fields.nameInputField} onChange={onChange} type="text" className="form-control" id="nameInputField" placeholder={currentTranslation.nameInputPlaceholder} />
                </div>
                <div className="form-group">
                    <label htmlFor="messageInputField">{currentTranslation.messageLabel}</label>
                    <textarea value={fields.messageInputField} onChange={onChange} type="textarea" className="form-control" id="messageInputField"
                              placeholder={currentTranslation.messageInputPlaceholder} />
                    <small className="form-text text-muted">{fields.messageInputField.length + "/" + MAX_MESSAGE_LEN}</small>
                </div>
                <button type="submit" className="btn btn-primary">{currentTranslation.submit}</button>
            </form>
        </div>
    );
};

export default ContactMe;
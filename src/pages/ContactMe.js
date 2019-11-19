import React, { useContext, useState } from 'react';
import { LANGUAGE_RU, LANGUAGE_EN, InterfaceContext } from '../context/InterfaceContext';
import { ERROR_POPUP, INFO_POPUP, PopupContext } from '../context/PopupContext';
import axios from 'axios';

const translationEng = {
    submit: "Submit",
    onSubmit: "Your message has been submitted.",
    onNameEmpty: "Name field is required.",
    onContactsEmpty: "Contacts field is required.",
    onMessageEmpty: "Message field is required.",

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
        popupContext.addPopup(currentTranslation.onSubmit, INFO_POPUP);
        axios.get("localhost:");
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
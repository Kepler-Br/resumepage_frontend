import { Link } from "react-router-dom";
import React from 'react';

const ProjectImage = (props) => {
    return (
        <Link to={"project/" + props.projectId}>
            <div style={{background: `url(${props.data.url}) center center / cover no-repeat`}}
                     className="container-fluid project-preview-image"></div>
        </Link>
    );
};

export default ProjectImage;
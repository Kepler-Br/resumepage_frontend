import React from 'react';
import ProjectsSidebar from "../components/ProjectsSidebar";
import ProjectsView from "../components/ProjectView";

const ProjectPage = (props) => {

    return (
        <div className="row">
            <ProjectsSidebar />
            <ProjectsView projectId={props.match.params.id}/>
        </div>
    );
};

export default ProjectPage;
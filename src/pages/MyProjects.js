import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectsSidebar from "../components/ProjectsSidebar";
import ProjectImage from "../components/ProjectImage";

const MyProjects = (props) => {
    const [projectImages, setProjectImages] = useState([]);
    const [projects, setProjects] = useState([]);

    const fetchImages = async () => {
        let response;
        try {
            response = await axios.get("/api/project.get_all");
            setProjects(response.data);
        } catch (e) {
            return;
        }
        const  imageIds = response.data.map((project) => (project.titleImage));
        let images = [];
        for (let i = 0; i < imageIds.length; i++) {
            try {
                response = await axios.get(`/api/image.get?id=${imageIds[i]}`);
                images.push(response.data);
            } catch (e) {
                console.error("Image not loaded. Cannot get response from server.");
            }
        }
        setProjectImages(images);
    };

    useEffect(() => {fetchImages();}, []);
    return (
        <div className="row">
            <ProjectsSidebar />
            <div className="col-md-9 col-xl-10 mt-2">
                {projectImages.map(((image, index) => (
                    <ProjectImage data={image} key={image.id} projectId={projects[index].id} />
                )))}
            </div>
        </div>
    );
};

export default MyProjects;
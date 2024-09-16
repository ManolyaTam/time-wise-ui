import { useEffect, useState } from "react";
import { Button, Spin } from "antd";
import ProjectForm from "../../components/project-form/project-form";
import ProjectCard from "../../components/project-card/project-card";
import getProjects from "../../services/projects/getProjects";
import { IProject } from "../../types/project-interface";
import "./projects.css";
import showMessage from "../../utils/message/message";
import NoProjectsFound from "./no-projects-found/not-found";

const ProjectsPage = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getProjects();
        if (Array.isArray(fetchedProjects)) {
          setProjects(fetchedProjects);
        } else {
          showMessage("error", "Invalid projects data");
        }
      } catch (error) {
        showMessage("error", "Error fetching projects");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchProjects();
  }, [isSubmit]);

  const handleProjectCreated = (newProject: IProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  return (
    <div id="projects-page">
      <Spin spinning={loading}>
        <div className="projects-page" id="projects-page">
          <div className="projects-page-inner" id="projects-page-inner">
            <div className="new-project-btn" id="new-project-btn">
              <Button onClick={() => setShowPopup(!showPopup)}>
                New Project
              </Button>
            </div>
          </div>
          <div className="projects-board" id="projects-board">
            {projects.length ? (
              projects.map((project) => (
                <ProjectCard
                  key={project.name}
                  color={project.color}
                  name={project.name}
                  description={project.description || ""}
                  projectHours={project.projectHours || ""}
                  id={`project-card-${project.name}`}
                />
              ))
            ) : (
              <NoProjectsFound />
            )}
          </div>
          <ProjectForm
            onProjectCreated={handleProjectCreated}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            setIsSubmit={setIsSubmit}
            isSubmit={isSubmit}
          />
        </div>
      </Spin>
    </div>
  );
};

export default ProjectsPage;

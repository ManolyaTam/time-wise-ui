import { useEffect, useState } from 'react';
import { Button } from 'antd';
import ProjectForm from '../../components/project-form/project-form';
import ProjectCard from '../../components/project-card/project-card';
import getProjects from '../../services/projects/getProjects';
import { IProject } from '../../types/project-interface';

const ProjectsPage = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getProjects();
        if (Array.isArray(fetchedProjects)) {
          setProjects(fetchedProjects);
        } else {
          console.error('Invalid projects data:', fetchedProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [isSubmit]);

  const handleProjectCreated = (newProject: IProject) => {
    setProjects(prevProjects => [...prevProjects, newProject]);
  };

  return (
    <div className="projects-page">
      <div className="projects-page-inner">
        <div className="new-project-btn">
          <Button onClick={() =>
            setShowPopup(!showPopup)
          }>New Project</Button>
        </div>
      </div>
      <div className="projects-board">
        {projects.map((project) => (
          <ProjectCard
            key={project.name}
            color={project.color}
            name={project.name}
            description={project.description || ''}
            projectHours={project.projectHours || 0}
          />
        ))}
      </div>
      <ProjectForm
        onProjectCreated={handleProjectCreated}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        setIsSubmit={setIsSubmit}
        isSubmit={isSubmit}
      />
    </div>
  );
};

export default ProjectsPage;


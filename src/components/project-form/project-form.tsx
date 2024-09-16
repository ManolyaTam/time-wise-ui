import "./project-form.css";
import Input from "../input/input";
import { Modal, Form, Button } from "antd";
import useCreateProject from "../../hooks/project/submit.hook";
import { IProject } from "../../types/project-interface";

interface IProps {
  onProjectCreated: (newProject: IProject) => void;
  showPopup: boolean;
  setShowPopup: (oldVal: boolean) => void;
  setIsSubmit: Function;
  isSubmit: boolean;
}

const ProjectForm = (props: IProps) => {
  const hook = useCreateProject(props);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProject = await hook.submitHandler(e);

    if (typeof newProject !== "undefined" && newProject !== null) {
      props.onProjectCreated(newProject as IProject);
    }
    props.setIsSubmit(!props.isSubmit);
  };

  return (
    <div className="project-form" id="project-form">
      <Modal
        title="Create a New Project"
        open={props.showPopup}
        footer={null}
        onCancel={hook.resetAndClose}
        okButtonProps={{ form: "category-editor-form", htmlType: "submit" }}
      >
        <Form onSubmitCapture={handleFormSubmit} id="project-form-form">
          <Input
            name="name"
            value={hook.projectData.name.val}
            onChange={(e) => hook.projectData.name.onchange(e.target.value)}
            label="Project Name"
            required
            id="project-form-name-input"
          />
          <Input
            name="description"
            label="Description"
            value={hook.projectData.description.val}
            onChange={(e) =>
              hook.projectData.description.onchange(e.target.value)
            }
            id="project-form-description-input"
          />
          <Input
            name="color"
            label="Color"
            type="color"
            value={hook.projectData.color.val}
            onChange={(e) => hook.projectData.color.onchange(e.target.value)}
            required
            id="project-form-color-input"
          />
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Button
              style={{ marginRight: 10 }}
              onClick={hook.resetAndClose}
              id="project-form-cancel-btn"
            >
              Cancel
            </Button>
            <Button
              style={{ marginRight: 10 }}
              htmlType="submit"
              id="project-form-submit-btn"
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectForm;

import "./project-card.css";
import { Tooltip } from "antd";
import { ClockCircleOutlined, InfoCircleFilled } from "@ant-design/icons";
import { convertTimestampToDHMS } from "../../utils/time-borders";

interface IProps {
  name: string;
  color: string;
  description?: string;
  projectHours: string;
  id: string;
}

const ProjectCard = (props: IProps) => {
  return (
    <div className="project-card" id={props.id}>
      <div className="project-card-header" id="project-card-header">
        <span className="color" style={{ backgroundColor: props.color }}>
          &nbsp;
        </span>
        <Tooltip placement="top" title={props.description || "no description"}>
          <button className="proj-tooltip-btn" id="info-tooltip-btn">
            <InfoCircleFilled />
          </button>
        </Tooltip>
      </div>
      <h4 id="project-card-name">{props.name}</h4>
      <div className="proj-time" id="project-card-hours">
        <p>
          <b>
            <ClockCircleOutlined />{" "}
          </b>
          {convertTimestampToDHMS(Number(props.projectHours))}
        </p>
      </div>
    </div>
  );
};
export default ProjectCard;

import { useEffect, useState } from 'react';
import './time-tracker.css';
import NewTaskForm from '../../components/new-task-form/new-task-form';
import TaskLog from '../../components/task-log/task-log';
import { fetchProjectNames } from '../../services/projects/get-projects-names';
import showMessage from '../../utils/message/message';

interface IProName {
  _id: string,
  name: string
}

const TimeTracker = () => {// eslint-disable-next-line
  const [projectsNames, setProjectsNames] = useState<Array<IProName>>([]);

  useEffect(() => {
    fetchProjectNames()
      .then((names: Array<IProName>) => {
        if (names === null || names === undefined) {
          showMessage('error', "names of projects are not found")
        } else {
          setProjectsNames(names);
        }
      }
      )// eslint-disable-next-line
  }, [])

  const convertedProjectsNames = projectsNames.map((item, index) => ({
    key: index.toString(),
    label: item.name,
  }));
  const projectsId = projectsNames.map((item)=>({
    id : item._id,
    name : item.name
  }))

  return (
    <div className='time-tracker'>
      <NewTaskForm projects={convertedProjectsNames} projectsId={projectsId}/>
      <TaskLog />
    </div>
  )
}

export default TimeTracker;
import React, { useEffect } from 'react';
import './new-task-form.css';
import { Input } from 'antd';
import DropDown from '../drop-down/drop-down';
import StopWatch from '../stop-watch/stop-watch';
import ControlBtn from '../../services/control-button';
import showMessage from '../../utils/message/message';
import useTask from '../../hooks/tasks/submit-task';
// import getTimeInSeconds from '../../utils/get-time-in-seconds';

const NewTaskForm = (props: any) => {

  const [timeInSecond, setTimeInSecond] = React.useState<number>(0);//getTimeInSeconds(Number(localStorage.getItem("startTime")?.toString()) || 0)
  const [dropdownLabel, setDropdownLabel] = React.useState<string>(localStorage.getItem('projectName')?.toString() || 'Projects');
  const [isRunning, setIsRunning] = React.useState<boolean>((Number(localStorage.getItem("startTime")?.toString()) > 0));
  const [taskDescription, setTaskDescription] = React.useState<string>(localStorage.getItem("taskDescription")?.toString() || '');


  const submitTask = useTask();
  const handleRequired = () => {
    if (taskDescription.length > 0 && dropdownLabel !== 'Projects') {
      return true
    } else {
      showMessage('warning', "task description and project name is required")
      return false
    }
  }

  useEffect(() => {
    //Save the stopwatch time to localStorage whenever it changes
    localStorage.setItem('stopwatchTime', timeInSecond.toString());
  }, [timeInSecond]);

  useEffect(() => {
    localStorage.setItem("taskDescription", taskDescription)
  }, [taskDescription])

  return (
    <form className='new-task-form' onSubmit={(e : any) => submitTask.submitTaskHandler(e.target)}>
      <Input required={true} disabled={isRunning} placeholder="Task Description" type='string' style={{ width: '300px', marginRight: '50px', height: '30px' }} value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
      <DropDown projects={props.projects} dropdownLabel={dropdownLabel} setDropdownLabel={setDropdownLabel} isRunning={isRunning} />
      <StopWatch timeInSecond={timeInSecond} />
      <ControlBtn handleSubmit={submitTask.submitTaskHandler} setTimeInSecond={setTimeInSecond} setDropdownLabel={setDropdownLabel} setIsRunning={setIsRunning} setTaskDescription={setTaskDescription} handleRequired={handleRequired} />
    </form>
  )
}

export default NewTaskForm;
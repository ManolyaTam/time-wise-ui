import "./dashboard.css";
import { default as BarChart } from "../../components/charts/bar-chart/bar-chart";
import { default as PieChart } from "../../components/charts/pie-chart";
import { DatePicker } from "antd";
import UserCard from "../../components/user-card/user-card";
import { useEffect, useState } from "react";
import UseFetchUser from "../../hooks/user/fetch.hook";
import { Spin } from "antd";
import useRange from "../../hooks/dashboard/date.hook";
import { IProject } from "../../types/project-interface";
import getProjects from "../../services/projects/getProjects";
import showMessage from "../../utils/message/message";
const { RangePicker } = DatePicker;

const Dashboard = () => {
  const [dateRange, setDateRange] = useState<any | null>([]);

  const rangeHook = useRange(dateRange, setDateRange);
  const userHook = UseFetchUser();
  const [fetchingUser, setFetchingUser] = useState(true);
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    userHook.fetchUserData().then(() => setFetchingUser(false));
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
      }
    };

    fetchProjects();
    // eslint-disable-next-line
  }, []);

  return (
    <Spin spinning={fetchingUser}>
      <div className="dashboard">
        <div className="top">
          <UserCard username={userHook.username} email={userHook.email} />
          <div className="range-picker">
            <RangePicker
              placement="bottomRight"
              format={"MMM DD, YYYY"}
              onChange={rangeHook.dateChangeHandler}
            />
            <PieChart projects={projects} />
          </div>
        </div>
        {/* <BarChart dateRange={dateRange} /> */}
      </div>
    </Spin>
  );
};

export default Dashboard;

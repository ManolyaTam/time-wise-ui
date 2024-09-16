import { useState } from "react";
import showMessage from "../../../utils/message/message";

const useFetchTimeline = () => {
  const [timeline, setTimeline] = useState<[any] | null>();

  const fetchtimeline = async (startDate: number, endDate: number) => {
    const token: string = localStorage.getItem("token") || "";
    fetch(
      `http://localhost:3001/dashboard/bar-chart?startDate=${startDate}&endDate=${endDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          res.json().then((res) => {
            setTimeline(res);
            return true;
          });
        }
      })
      .catch((err) => {
        showMessage("error", err);
        return false;
      });
  };
  return {
    timeline,
    fetchtimeline,
  };
};
export default useFetchTimeline;

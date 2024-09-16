import { Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import "./logout-button.css";

const LogoutButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      type="primary"
      style={{ border: 0 }}
      className="logout-btn"
      id="logout-button"
      onClick={() => {
        localStorage.setItem("token", "");
        navigate("/login");
      }}
    >
      <ExportOutlined />
      <p>Logout</p>
    </Button>
  );
};

export default LogoutButton;

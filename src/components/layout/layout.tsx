import React from "react";
import "./layout.css";
import {
  FieldTimeOutlined,
  PieChartOutlined,
  ProjectFilled,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router";
import LogoutButton from "./logout-button/logout-button";

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "/dashboard", <PieChartOutlined />),
  getItem("Time Tracker", "/timeTracker", <FieldTimeOutlined />),
  getItem("Projects", "/projects", <ProjectFilled />),
];

interface IProps {
  children: React.ReactNode;
}

const PageLayout = (props: IProps) => {
  const navigate = useNavigate();

  return (
    <div className="page-layout" id="page-layout">
      <Layout>
        <Sider style={{ minHeight: "83vh" }} theme="dark">
          <div className="menu-logo" id="menu-logo">
            <img src="/logo.png" alt="logo" />
            <h4 id="menu-logo-title">Time Wise</h4>
          </div>
          <Menu
            onClick={({ key }) => navigate(key)}
            theme="dark"
            style={{
              backgroundColor: "#c4d3fa",
              color: "#52469C",
              fontWeight: 600,
            }}
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            selectedKeys={[window.location.pathname]}
            id="menu"
          />
          <LogoutButton />
        </Sider>
        <Layout style={{ paddingTop: 25 }}>
          <Content style={{ margin: "0 16px" }}>{props.children}</Content>
          <Footer style={{ textAlign: "center", fontSize: 10 }} id="footer">
            Created with AntDesign
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default PageLayout;

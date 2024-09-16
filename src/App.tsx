import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ConfigProvider } from "antd";
import { Navigate } from "react-router-dom";
import Signup from "./pages/signup/signup";
import ProjectsPage from "./pages/projects/projects";
import TimeTracker from "./pages/time-tracker/time-tracker";
import PageLayout from "./components/layout/layout";
import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/Login/login";
import Guard from "./providers/guard/guard";
function App() {
  return (
    <div className="App">
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              colorBgHeader: "#c4d3fa",
              colorBgBase: "#c4d3fa",
              colorBgBody: "#f1f8ff",
            },
            Input: {
              borderRadius: 4,
              colorBgBase: "#f1f8ff",
            },
            Button: {
              colorText: "#52469C",
            },
          },
          token: {
            colorPrimary: "#52469C",
            colorBgLayout: "#F1F8FF",
          },
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <Guard>
                  <PageLayout>
                    <Dashboard />
                  </PageLayout>
                </Guard>
              }
            />
            <Route
              path="/timeTracker"
              element={
                <Guard>
                  <PageLayout>
                    <TimeTracker />
                  </PageLayout>
                </Guard>
              }
            />
            <Route
              path="/projects"
              element={
                <Guard>
                  <PageLayout>
                    <ProjectsPage />
                  </PageLayout>
                </Guard>
              }
            />
            <Route path="/*" element={<Navigate to="/Dashboard" />} />
            <Route path="/" element={<Navigate to="/Dashboard" />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
}
export default App;

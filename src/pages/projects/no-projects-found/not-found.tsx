const NoProjectsFound = () => {
  return (
    <div
      style={{
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
      id="no-projects-found"
    >
      <img width={100} src="empty-box.png" alt="empty" />
      <p>no projects yet</p>
    </div>
  );
};
export default NoProjectsFound;

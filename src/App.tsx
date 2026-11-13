import SideBar from "./app/components/layout/sideBar/SideBar";

const App = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f7f7f5]">
      <SideBar />
      
      <main aria-label="Workspace" className="min-w-0 flex-1" />
    </div>
  );
};

export default App;

import { useState } from "react";
import SideBar from "./app/components/layout/sideBar/SideBar";
import HomePage from "./app/features/home/HomePage";
import MyWorkPage from "./app/features/my-work/MyWorkPage";
import InboxPage from "./app/features/inbox/InboxPage";
import { Route, Routes } from "react-router";
import MeetingsPage from "./app/features/meetings/MeetingsPage";


const App = () => {
  const [activeItem, setActiveItem] = useState("home");

  return (
    <div className="flex h-dvh overflow-hidden bg-(--workspace-canvas)">
      <SideBar activeItem={activeItem} setActiveItem={setActiveItem} />

      <main
        aria-label="Workspace"
        className="workspace-main min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-y-contain"
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/myWork" element={<MyWorkPage />} />
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/meetings" element={<MeetingsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopMenu from "../TopMenu";
import SideMenu from "../SideMenu";
import Analytics from "./Analytics";

function Dashboard() {
  return (
    <>
      {/* <TopMenu /> */}
      <div className="echo group bg-gradient-to-b from-slate-200/70 to-slate-50 background relative min-h-screen before:content-[''] before:h-[370px] before:w-screen before:bg-gradient-to-t before:from-theme-1/80 before:to-theme-2 [&.background--hidden]:before:opacity-0 before:transition-[opacity,height] before:ease-in-out before:duration-300 before:top-0 before:fixed after:content-[''] after:h-[370px] after:w-screen [&.background--hidden]:after:opacity-0 after:transition-[opacity,height] after:ease-in-out after:duration-300 after:top-0 after:fixed after:bg-texture-white after:bg-contain after:bg-fixed after:bg-[center_-13rem] after:bg-no-repeat">
        <SideMenu />
        <Analytics />
      </div>
    </>
  );
}

export default Dashboard;

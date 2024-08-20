import { Icon } from "@/@core-components/builder-components/IconHandler/IconComponent";
import React, { useState } from "react";
import ProjectAside from "./Aside";

export interface LayoutProps {
  children: React.ReactNode;
  data?: any;
}

const ProjectLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex bg-gray-50 h-screen overflow-hidden">
      <ProjectAside />
      <main className="flex flex-col w-full">
        <nav className="bg-green-100 p-4">Dashboard</nav>
        <div className="flex-1 p-4 h-full overflow-y-auto">{children}</div>
        <footer className="bg-purple-100 p-4">Footer</footer>
      </main>
    </div>
  );
};

export default ProjectLayout;

// import { Icon } from "@/@core-components/builder-components/IconHandler/IconComponent";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const ProjectSettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { id } = router.query;

  const menuItems = [
    {
      label: "General Settings",
      icon: "FaServer",
      href: `/projects/${id}/general`,
    },
    { label: "Host Settings", icon: "FaServer", href: `/projects/${id}/host` },
    {
      label: "Project Detail",
      icon: "FaProjectDiagram",
      href: `/projects/${id}/project-detail`,
    },
  ];
  return (
    <>
      <div className="mb-4">
        <h3 className="text-2xl font-bold ">Project</h3>
        <p>
          Uncover the innovation, challenges, and triumphs that define this
          transformative project, where creativity meets cutting-edge
          technology.
        </p>
      </div>
      <div className="flex h-[calc(100vh-220px)] gap-2">
        <aside className="w-64 bg-gray-100">
          <nav className="bg-gray-100 text-gray-800">
            <ul>
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="mb-2 bg-gray-200 px-2 py-3 rounded-sm"
                >
                  <Link
                    href={item.href}
                    className="flex items-center hover:text-blue-600 transition-colors duration-300"
                  >
                    <span className="mr-2">
                      {/* <Icon nameIcon={item.icon} /> */}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <div className="w-full h-full overflow-auto">{children}</div>
      </div>
    </>
  );
};

export default ProjectSettingsLayout;

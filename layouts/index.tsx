import BuilderLayout from "./BuilderLayout";
import ProjectLayout from "./ProjectLayout";
import ProjectSettingsLayout from "./ProjectSettingsLayout";
import MainLayout from "./MainLayout";

export interface LayoutProps {
  children: React.ReactNode;
  layout?: string;
  data?: any;
}

const Layout = ({ children, layout, data }: LayoutProps) => {
  const layouts = layout ? layout.split("_") : [];

  const currentLayout = layouts.shift();
  const props = layouts.join("_");
 
  return (
    <>
      {currentLayout === "project" && (
        <ProjectLayout>
          {<Layout layout={props}>{children}</Layout>}
        </ProjectLayout>
      )}
      {currentLayout === "project-settings" && (
        <ProjectSettingsLayout>
          {<Layout layout={props}>{children}</Layout>}
        </ProjectSettingsLayout>
      )}

      {currentLayout === "main" && (
        <MainLayout>{<Layout layout={props}>{children}</Layout>}</MainLayout>
      )}

      {/* builder layouts */}
      {(currentLayout === "page-builder" ||
        currentLayout === "component-builder" ||
        currentLayout === "form-builder" ||
        currentLayout === "ws-builder" ||
        currentLayout === "web-hook-builder" ||
        currentLayout === "api-builder" ||
        currentLayout === "model-builder") && (
        <BuilderLayout data={data}>
          <Layout layout={props}>{children}</Layout>
        </BuilderLayout>
      )}

      {!currentLayout && children}
      {/* <MoveableComponent /> */}
    </>
  );
};
export default Layout;

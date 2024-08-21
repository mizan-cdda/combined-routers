import InputBasicSettings from "./InputBasicSettings";
import DisplaySize from "./DisplaySize";
import ChildrenViewer from "./ChildrenViewer";
import ButtonBasicSettings from "./ButtonBasicSettings";
import { useDispatch } from "react-redux";
import { updateContent } from "@/redux/features/components/componentsSlice";
import TableBasicSettings from "./TableBasicSettings";
import FormStepperSettings from "./FormStepperSettings";

const BasicSettings = ({ component }: any) => {
  // Render the UI for basic settings
  const dispatch = useDispatch();
  return (
    <div>
      {/* RENDER CHILDREN VIEWER COMPONENT WHERE DEFINE CHILDREN COMPONENTS */}
      {/* <ChildrenViewer component={component} /> */}
      {/* RENDER DISPLAY SIZE COMPONENT WHERE DEFINE DISPLAY SIZE BY DEVICE */}
      <DisplaySize component={component} />

      {/* Update Content starts */}
      {component?.content && (
        <>
          <label htmlFor="text" className="block">
            Content
          </label>
          <input
            onChange={(e) => {
              dispatch(
                updateContent({
                  id: component.id,
                  name: e.target.name,
                  value: e.target.value,
                })
              );
            }}
            className="w-full border-2"
            id="content"
            name="text"
            type="text"
            value={component?.content?.text}
            placeholder="write something here"
          />
        </>
      )}
      {/* Update Content ends */}

      {(() => {
        switch (component.type) {
          case "div":
            return null;
          case "text":
          case "number":
          case "email":
            return <InputBasicSettings component={component} />;
          case "button":
            return <ButtonBasicSettings component={component} />;
          case "table":
            return <TableBasicSettings component={component} />;
          case "form":
            return <FormStepperSettings component={component} />;
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default BasicSettings;

import React from "react";
import Switch from "../../Inputs/InputsForSettings/Switch";
import { useDispatch } from "react-redux";
import { updateProps } from "@/redux/features/components/componentsSlice";
import StepperOption from "./StepperOption";

const FormStepperSettings = ({ component }: { component: any }) => {
  const dispatch = useDispatch();
  const onChange = (
    value?: string | number | boolean | null | undefined | any,
    key?: string
  ) => {
    dispatch(
      updateProps({
        id: component.id,
        name: key,
        value: value,
      })
    );
  };
  return (
    <div>
      <div className="flex flex-col gap-4">
        <header className="text-base font-bold border-b-2 py-2">
          Form Stepper Settings
        </header>
        <Switch
          label="Stepper"
          name="stepper"
          onChange={onChange}
          value={false}
        />

        <Switch
          label="Show Icon"
          name="show_icon"
          onChange={onChange}
          value={false}
        />
        <Switch
          label="Show Stepper Number"
          name="show_stepper_number"
          onChange={onChange}
          value={false}
        />
        <Switch
          label="Completion Checkmark?"
          name="completion_checkmark"
          onChange={onChange}
          value={false}
        />
      </div>

      <div>
        <div className="flex flex-col gap-4">
          <header className="text-base font-bold border-b-2 py-2">
            Stepper Settings
          </header>
          <StepperOption />
        </div>
      </div>
    </div>
  );
};

export default FormStepperSettings;

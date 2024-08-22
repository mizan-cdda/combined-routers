import { updateProps } from "@/redux/features/components/componentsSlice";
import { useDispatch } from "react-redux";
import TextInput from "../../Inputs/InputsForSettings/TextInput";
import Switch from "../../Inputs/InputsForSettings/Switch";

interface InputSettingsProps {
  component: {
    id: string;

    value: string;
    label: string;
    placeholder: string;
    type: string;
    description: string;
    required: boolean;
    show_label: boolean;
    disable: boolean;
    default_value: string | number | boolean | null | undefined | any;
    unique: boolean;
    hidden: boolean;
    private_field: boolean;
    input_name?: string;
    hint: string;
  };
}

const InputBasicSettings: React.FC<InputSettingsProps> = ({ component }) => {
  const dispatch = useDispatch();

  const {
    label,
    placeholder,
    description,
    required,
    show_label,
    disable,
    default_value,
    unique,
    hidden,
    private_field,
    input_name,
    hint,
  } = component || {};

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
    <div className="mb-4 flex flex-col gap-2">
      <TextInput
        label="Label"
        name="label"
        onChange={onChange}
        value={label || ""}
        placeholder="Enter label"
      />
      <Switch
        label="Show label"
        name="show_label"
        onChange={onChange}
        value={show_label || false}
      />
      <TextInput
        label="Name"
        name="input_name"
        onChange={onChange}
        value={input_name || ""}
        placeholder="Enter name"
      />
      <TextInput
        label="Placeholder"
        name="placeholder"
        onChange={onChange}
        value={placeholder || ""}
        placeholder="Enter placeholder"
      />
      <TextInput
        label="Description"
        name="description"
        onChange={onChange}
        value={description || ""}
        placeholder="Description..."
        textArea
      />
      <TextInput
        label="Hint(S)"
        name="hint"
        onChange={onChange}
        value={hint || ""}
        placeholder="Hint..."
        textArea
      />
      <TextInput
        label="Default value"
        name="default_value"
        onChange={onChange}
        value={default_value || ""}
        placeholder="Description..."
      />
      <Switch
        label="Required"
        name="required"
        onChange={onChange}
        value={required || false}
      />
      <Switch
        label="Disabled"
        name="disabled"
        onChange={onChange}
        value={disable || false}
      />
      <Switch
        label="Unique"
        name="unique"
        onChange={onChange}
        value={unique || false}
      />
      <Switch
        label="Hidden"
        name="hidden"
        onChange={onChange}
        value={hidden || false}
      />
      <Switch
        label="Private"
        name="private_field"
        onChange={onChange}
        value={private_field || false}
      />
    </div>
  );
};

export default InputBasicSettings;

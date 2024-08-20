import fs from "fs";
import path from "path";
import { ComponentsJsonProps } from "@/types/types";

const Home = ({ data }: ComponentsJsonProps) => {
  return <div>Home</div>;
};

export async function getServerSideProps() {
  return {
    props: {
      data: {
        layouts: [
          {
            id: "pyrcomp-LP9KL0JW15TJc",
            name: "Form",
            type: "form",
            icon: "MdOutlineViewCompact",
            category: "basic",
            author: "Maruf",
            description:
              "This is a form component wrapper. It can be used to wrap other components to create a form.",
            acceptChildren: true,
          },
        ],
        basic: [
          {
            id: "pyrcomp-LP9ED93W15TJB",
            name: "TextInput",
            type: "text",
            icon: "BsInputCursor",
            category: "basic",
            author: "Maruf",
            description: "Text input component",
          },
          {
            id: "pyrcomp-JFTY6875DJKS7Y",
            name: "Number",
            type: "number",
            icon: "MdOutlineConfirmationNumber",
            category: "basic",
            author: "Maruf",
            description: "Number input component",
          },
          {
            id: "pyrcomp-ML9EY45L0MLHT",
            name: "Email",
            type: "email",
            icon: "MdOutlineMail",
            category: "basic",
            author: "Maruf",
            description: "Email input component",
          },
          {
            id: "pyrcomp-ML9EY8CKLPF8T",
            name: "Phone",
            type: "phone",
            icon: "MdPhone",
            category: "basic",
            author: "Maruf",
            description: "Phone input component",
          },
          {
            id: "pyrcomp-LP9ED16W15TJB",
            name: "Select",
            type: "select",
            icon: "RiDropdownList",
            category: "basic",
            author: "Maruf",
            description: "Select input component",
          },
          {
            id: "pyrcomp-LP9ED16W83TJB",
            name: "Radio",
            type: "radio",
            icon: "BsUiRadios",
            category: "basic",
            author: "Maruf",
            description: "N/A",
          },
          {
            id: "pyrcomp-LP5TD16W83TJB",
            name: "Checkbox",
            type: "checkbox",
            icon: "IoIosCheckboxOutline",
            category: "basic",
            author: "Maruf",
            description: "N/A",
          },
          {
            id: "pyrcomp-LP9ED1P083TJB",
            name: "TextArea",
            type: "textarea",
            icon: "BsTextareaResize",
            category: "basic",
            author: "Maruf",
            description: "N/A",
          },
          {
            id: "pyrcomp-LP9ED16W83DJS",
            name: "Hidden",
            type: "hidden",
            icon: "BiHide",
            category: "basic",
            author: "Maruf",
            description: "N/A",
          },
          {
            id: "pyrcomp-ML9EY45W83TJB",
            name: "Time",
            type: "time",
            icon: "BiTime",
            category: "basic",
            author: "Maruf",
            description: "N/A",
          },
          {
            id: "pyrcomp-ML9EY45W88YHT",
            name: "Media",
            type: "media",
            icon: "GoFileMedia",
            category: "basic",
            author: "Maruf",
            description: "N/A",
          },
          {
            id: "pyrcomp-ML9EY45L09YHT",
            name: "Range",
            type: "range",
            icon: "RxSlider",
            category: "basic",
            author: "Maruf",
            description: "N/A",
          },
          {
            id: "pyrcomp-ML9EY8C9*PLTT",
            name: "URL",
            type: "url",
            icon: "SiCurl",
            category: "basic",
            author: "Maruf",
            description: "N/A",
          },
          {
            id: "pyrcomp-ML9EY8C90MLHT",
            name: "Password",
            type: "password",
            icon: "PiPassword",
            category: "basic",
            author: "Maruf",
            description: "N/A",
          },
          {
            id: "pyrcomp-LP9ED1645HTJB",
            name: "Date & Time",
            type: "datetime",
            icon: "TbCalendarTime",
            category: "basic",
            author: "Maruf",
            description: "N/A",
          },
          {
            id: "pyrcomp-LP98469SKA2LL",
            name: "Button",
            type: "button",
            icon: "RxButton",
            category: "Basic",
            author: "N/A",
            description: "A button component",
            defaultStyles: {
              padding: "6px 12px",
              borderRadius: "4px",
              backgroundColor: "#007bff",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "14px",
              width: "200px",
            },
          },
        ],
        advanced: [],
      }
    },
  }
}

Home.layout = "form-builder";
export default Home;

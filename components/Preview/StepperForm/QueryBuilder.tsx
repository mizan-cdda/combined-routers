'use client';
import React from 'react';
import { useFormik, FormikErrors } from 'formik';
import * as Yup from 'yup';
import { getIn } from 'formik';
import Select from '../ui/form/select/Select';
import Input from '../ui/form/input/Input';

// Type definitions
interface Rule {
  field?: string;
  operator?: string;
  value?: string;
  condition?: string;
  rules?: Rule[];
}

interface FormValues {
  condition: string;
  rules: Rule[];
}

// Initial Values
const initialValues: FormValues = {
  condition: 'OR',
  rules: [
    {
      field: 'AGE',
      operator: 'GT',
      value: ''
    }
  ]
};

// Validation Schema
const ruleSchema: any = Yup.lazy((value: any) => {
  if (value && value.condition) {
    return Yup.object().shape({
      condition: Yup.string().required('Condition is required'),
      rules: Yup.array()
        .of(Yup.lazy(() => ruleSchema))
        .required('Rules are required')
    });
  } else {
    return Yup.object().shape({
      field: Yup.string().required('Field is required'),
      operator: Yup.string().required('Operator is required'),
      value: Yup.string().required('Value is required')
    });
  }
});

const validationSchema = Yup.object().shape({
  condition: Yup.string().required('Condition is required'),
  rules: Yup.array().of(ruleSchema).required('Rules are required')
});

const QueryBuilderForm: React.FC = () => {
  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log('Form values:', values);
    }
  });

  const handleChange = (path: string, value: any) => {
    formik.setFieldValue(path, value);
  };

  const handleAddRule = (path?: string) => {
    if (path) {
      const rules = getIn(formik.values, path) as Rule[];
      formik.setFieldValue(path, [...rules, { field: 'NAME', operator: 'GT', value: '' }]);
    } else {
      formik.setFieldValue('rules', [
        ...getIn(formik.values, 'rules'),
        { field: 'NAME', operator: 'GT', value: '' }
      ]);
    }
  };

  const handleAddGroup = (path?: string) => {
    if (path) {
      const rules = getIn(formik.values, path) as Rule[];
      formik.setFieldValue(path, [
        ...rules,
        { condition: 'AND', rules: [{ field: 'NAME', operator: 'GT', value: '' }] }
      ]);
    } else {
      formik.setFieldValue('rules', [
        ...getIn(formik.values, 'rules'),
        { condition: 'AND', rules: [{ field: 'NAME', operator: 'GT', value: '' }] }
      ]);
    }
  };

  const handleRemoveRule = (path: string) => {
    const keys = path.split('.');
    const index = parseInt(keys.pop()!, 10);
    const parentPath = keys.join('.');
    const parent = getIn(formik.values, parentPath) as Rule[];
    parent.splice(index, 1);
    formik.setFieldValue(parentPath, [...parent]);
  };

  const renderRules = (rules: Rule[], path = 'rules') => {
    return rules.map((rule, index) => {
      const currentPath = `${path}.${index}`;
      const error = (getIn(formik.errors, currentPath) as FormikErrors<Rule>) || {};

      return rule.condition ? (
        <div key={currentPath} className="group mb-4 p-4 border border-gray-200 rounded-md">
          <div className="flex items-center space-x-2 mb-2">
            <Select
              label='Condition'
              name={`${currentPath}.condition`}
              options={['OR', 'AND']}
              onChange={(e) => formik.setFieldValue(`${currentPath}.condition`, e.target.value)}
              value={getIn(formik.values, `${currentPath}.condition`)}
            />
            {error.condition && <div className="text-red-500">{error.condition}</div>}
            <button
              type="button"
              onClick={() => handleRemoveRule(currentPath)}
              className="text-red-500 border border-red-300 rounded-md px-2 py-1"
            >
              Delete Group
            </button>
          </div>
          <div className="ml-4">
            {renderRules(rule.rules || [], `${currentPath}.rules`)}
            <button
              type="button"
              onClick={() => handleAddRule(`${currentPath}.rules`)}
              className="text-blue-500 border border-blue-300 rounded-md px-2 py-1"
            >
              Add Condition
            </button>
            <button
              type="button"
              onClick={() => handleAddGroup(`${currentPath}.rules`)}
              className="text-blue-500 border border-blue-300 rounded-md px-2 py-1 ml-2"
            >
              Add Group
            </button>
          </div>
        </div>
      ) : (
        <div key={currentPath} className="mb-4 p-4 border border-gray-200 rounded-md">
          <div className="flex items-center space-x-2 mb-2">
            <Select
              label="Field"
              name={`${currentPath}.field`}
              value={getIn(formik.values, `${currentPath}.field`)}
              options={['AGE', 'NAME']}
              onChange={(e) => formik.setFieldValue(`${currentPath}.field`, e.target.value)}
            />
            {error.field && <div className="text-red-500">{error.field}</div>}
            <Select
              label="Operator"
              name={`${currentPath}.operator`}
              options={['GT', 'LT', 'CONTAINS']}
              value={getIn(formik.values, `${currentPath}.operator`)}
              onChange={(e) => formik.setFieldValue(`${currentPath}.operator`, e.target.value)}
            />
            {error.operator && <div className="text-red-500">{error.operator}</div>}
            <Input
              name={`${currentPath}.value`}
              label="Value"
              type="text"
              value={rule.value}
              onChange={(e) => handleChange(`${currentPath}.value`, e.target.value)}
              showErrorMessage={false}
              onBlur={formik.handleBlur}
              formik={formik}
              placeholder="Value"
              className="p-2 border border-gray-300 rounded-md flex-grow"
            />
            <button
              type="button"
              onClick={() => handleRemoveRule(currentPath)}
              className="text-red-500 border border-red-300 rounded-md px-2 py-1"
            >
              Delete Condition
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <form onSubmit={formik.handleSubmit} className="p-4 m-2 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-2 mb-2">
        <Select
          label="Condition"
          name="condition"
          options={['OR', 'AND']}
          value={formik.values.condition}
          onChange={(e) => formik.setFieldValue('condition', e.target.value)}
        />
        {formik.errors.condition && <div className="text-red-500">{formik.errors.condition}</div>}
      </div>
      <div className="pl-4">
        {renderRules(formik.values.rules)}
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => handleAddRule()}
            className="text-blue-500 border border-blue-300 rounded-md px-2 py-1"
          >
            Add Rule
          </button>
          <button
            type="button"
            onClick={() => handleAddGroup()}
            className="text-green-500 border border-green-300 rounded-md px-2 py-1"
          >
            Add Group
          </button>
        </div>
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
        Submit
      </button>
    </form>
  );
};

export default QueryBuilderForm;

// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import Select from '../ui/form/select/Select';

// // Form JSON Configuration
// const formConfig = [
//   {
//     key: 'condition',
//     type: 'select',
//     label: 'Condition',
//     options: ['OR', 'AND'],
//     validation: Yup.string().required('Condition is required')
//   },
//   {
//     key: 'rule',
//     fields: [
//       {
//         key: 'field',
//         type: 'select',
//         label: 'Field',
//         options: ['AGE', 'NAME'],
//         validation: Yup.string().required('Field is required')
//       },
//       {
//         key: 'operator',
//         type: 'select',
//         label: 'Operator',
//         options: ['GT', 'LT', 'CONTAINS'],
//         validation: Yup.string().required('Operator is required')
//       },
//       {
//         key: 'value',
//         type: 'text',
//         label: 'Value',
//         validation: Yup.string().required('Value is required')
//       }
//     ]
//   }
// ];

// // Validation Schema based on JSON Configuration
// const createValidationSchema = (config: any[]) => {
//   const schema: any = {};

//   config.forEach((item) => {
//     if (item.key === 'rule') {
//       schema.rules = Yup.array().of(
//         Yup.lazy((value: any) =>
//           value?.condition
//             ? createValidationSchema(config) // Recursive schema for nested groups
//             : Yup.object().shape(
//                 item.fields.reduce((acc: any, field: any) => {
//                   acc[field.key] = field.validation;
//                   return acc;
//                 }, {})
//               )
//         )
//       );
//     } else {
//       schema[item.key] = item.validation;
//     }
//   });

//   return Yup.object().shape(schema);
// };

// const validationSchema = createValidationSchema(formConfig);

// const initialValues = {
//   condition: 'OR',
//   rules: [
//     {
//       field: 'AGE',
//       operator: 'GT',
//       value: ''
//     }
//   ]
// };

// const QueryBuilderForm: React.FC = () => {
//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit: (values) => {
//       console.log('Form values:', values);
//     }
//   });

//   const handleAddRule = (path: string) => {
//     const rules = formik.getFieldProps(path).value;
//     formik.setFieldValue(path, [
//       ...rules,
//       { field: '', operator: '', value: '' }
//     ]);
//   };

//   const handleAddGroup = (path: string) => {
//     const rules = formik.getFieldProps(path).value;
//     formik.setFieldValue(path, [
//       ...rules,
//       {
//         condition: 'AND',
//         rules: [{ field: '', operator: '', value: '' }]
//       }
//     ]);
//   };

//   const handleRemoveRule = (path: string, index: number) => {
//     const rules = formik.getFieldProps(path).value;
//     const updatedRules = rules.filter((_: any, i: number) => i !== index);
//     formik.setFieldValue(path, updatedRules);
//   };

//   const renderField = (name: string, config: any, index: number) => {
//     if (!config || !config.type) return null;

//     switch (config.type) {
//       case 'select':
//         return (
//           <div key={`${name}-${index}`} className="mb-2">
//             <label>{config.label}</label>
//             <Select
//               name={name}
//               options={config.options}
//               value={formik.getFieldProps(name).value}
//               onChange={formik.handleChange}
//             />
//             {formik.touched[name] && formik.errors[name] && (
//               <div className="text-red-500">{formik.errors[name]}</div>
//             )}
//           </div>
//         );
//       case 'text':
//         return (
//           <div key={`${name}-${index}`} className="mb-2">
//             <label>{config.label}</label>
//             <input
//               type="text"
//               name={name}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.getFieldProps(name).value}
//               className="p-2 border border-gray-300 rounded-md flex-grow"
//             />
//             {formik.touched[name] && formik.errors[name] && (
//               <div className="text-red-500">{formik.errors[name]}</div>
//             )}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const renderRules = (rules: any[], path = 'rules') => {
//     return rules.map((rule, index) => {
//       const currentPath = `${path}[${index}]`;

//       return rule.condition ? (
//         <div key={currentPath} className="group mb-4 p-4 border border-gray-200 rounded-md">
//           {renderField(`${currentPath}.condition`, formConfig[0], index)}
//           <div className="ml-4">
//             {renderRules(rule.rules, `${currentPath}.rules`)}
//             <button
//               type="button"
//               onClick={() => handleAddRule(`${currentPath}.rules`)}
//               className="text-blue-500 border border-blue-300 rounded-md px-2 py-1"
//             >
//               Add Condition
//             </button>
//             <button
//               type="button"
//               onClick={() => handleAddGroup(`${currentPath}.rules`)}
//               className="text-blue-500 border border-blue-300 rounded-md px-2 py-1 ml-2"
//             >
//               Add Group
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div key={currentPath} className="mb-4 p-4 border border-gray-200 rounded-md">
//           {formConfig[1].fields.map((field: any, i: number) =>
//             renderField(`${currentPath}.${field.key}`, field, i)
//           )}
//           <button
//             type="button"
//             onClick={() => handleRemoveRule(path, index)}
//             className="text-red-500 border border-red-300 rounded-md px-2 py-1"
//           >
//             Delete Condition
//           </button>
//         </div>
//       );
//     });
//   };

//   return (
//     <form onSubmit={formik.handleSubmit} className="p-4 m-2 bg-white rounded-lg shadow-md">
//       {renderField('condition', formConfig.condition, 0)}
//       <div className="pl-4">
//         {renderRules(formik.values.rules)}
//         <div className="flex space-x-2">
//           <button
//             type="button"
//             onClick={() => handleAddRule('rules')}
//             className="text-blue-500 border border-blue-300 rounded-md px-2 py-1"
//           >
//             Add Rule
//           </button>
//           <button
//             type="button"
//             onClick={() => handleAddGroup('rules')}
//             className="text-green-500 border border-green-300 rounded-md px-2 py-1"
//           >
//             Add Group
//           </button>
//         </div>
//       </div>
//       <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default QueryBuilderForm;

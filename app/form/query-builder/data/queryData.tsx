export const queryData = {
  name: 'Sign In',
  grid: 5,
  submit: {
    store: 'localStorage', // local Storage, session Storage, cookies
    key_name: 'name-form',
    endPoint: '/name-form',
    method: 'UPDATE' // INSERT, UPSERT, DELETE, UPDATE
  },
  items: [
    {
      index: 2,
      widths: {
        default: '100%',
        greaterThan1440: '60%',
        between890And1440: '60%',
        between600And890: '60%'
      },
      asterisk: true,
      size: 'md',
      color: 'default',
      shape: 'smooth',
      type: 'select',
      options: ['OR', 'AND'],
      id: 'condition',
      label: 'Condition',
      name: 'condition',
      placeholder: '',
      required: true
    },
    {
      index: 7,
      widths: {
        default: '100%',
        greaterThan1440: '100%',
        between890And1440: '100%',
        between600And890: '100%'
      },
      name: 'rules',
      label: '',
      required: true,
      tag: 'query',
      placeholder: 'rule',
      form: {
        name: 'Nested Form',
        grid: 3,
        items: [
          {
            index: 2,
            widths: {
              default: '100%',
              greaterThan1440: '',
              between890And1440: '',
              between600And890: ''
            },
            asterisk: true,
            size: 'md',
            color: 'default',
            shape: 'smooth',
            type: 'select',
            options: ['name', 'test'],
            id: 'field',
            label: 'Field',
            name: 'field',
            placeholder: '',
            required: true
          },
          {
            index: 2,
            widths: {
              default: '100%',
              greaterThan1440: '',
              between890And1440: '',
              between600And890: ''
            },
            asterisk: true,
            size: 'md',
            color: 'default',
            shape: 'smooth',
            type: 'select',
            options: ['EQ', 'NOT_EQ', 'GT', 'LT'],
            id: 'operator',
            label: 'Operator',
            name: 'operator',
            placeholder: '',
            required: true
          },
          {
            index: 2,
            widths: {
              default: '100%',
              greaterThan1440: '',
              between890And1440: '',
              between600And890: ''
            },
            asterisk: true,
            size: 'md',
            color: 'default',
            shape: 'smooth',
            type: 'text',
            id: 'value',
            label: 'value',
            name: 'value',
            placeholder: '',
            required: true
          }
        ]
      },
      validation: {
        type: 'array',
        validations: {}
      }
    }
  ]
};
// export const queryData = {
//   name: 'Sign In',
//   grid: 5,
//   submit: {
//     store: 'localStorage', // local Storage, session Storage, cookies
//     key_name: 'name-form',
//     endPoint: '/name-form',
//     method: 'UPDATE' // INSERT, UPSERT, DELETE, UPDATE
//   },
//   items: [
//     {
//       index: 2,
//       widths: {
//         default: '100%',
//         greaterThan1440: '60%',
//         between890And1440: '60%',
//         between600And890: '60%'
//       },
//       asterisk: true,
//       size: 'md',
//       color: 'default',
//       shape: 'smooth',
//       type: 'select',
//       options: ['OR', 'AND'],
//       id: 'condition',
//       label: 'Condition',
//       name: 'condition',
//       placeholder: '',
//       required: true
//     },
//     {
//       index: 7,
//       widths: {
//         default: '100%',
//         greaterThan1440: '100%',
//         between890And1440: '100%',
//         between600And890: '100%'
//       },
//       name: 'rules',
//       label: '',
//       required: true,
//       tag: 'repeater',
//       placeholder: 'rule',
//       form: {
//         name: 'Nested Form',
//         grid: 3,
//         items: [
//           {
//             index: 1,
//             widths: {
//               default: '100%',
//               greaterThan1440: '',
//               between890And1440: '',
//               between600And890: ''
//             },
//             asterisk: true,
//             size: 'md',
//             color: 'default',
//             shape: 'smooth',
//             type: 'select',
//             options: ['Field1', 'Field2'],
//             id: 'field',
//             label: 'Field',
//             name: 'field',
//             placeholder: '',
//             required: true
//           },
//           {
//             index: 2,
//             widths: {
//               default: '100%',
//               greaterThan1440: '',
//               between890And1440: '',
//               between600And890: ''
//             },
//             asterisk: true,
//             size: 'md',
//             color: 'default',
//             shape: 'smooth',
//             type: 'select',
//             options: ['EQ', 'NOT_EQ', 'GT', 'LT'],
//             id: 'operator',
//             label: 'Operator',
//             name: 'operator',
//             placeholder: '',
//             required: true
//           },
//           {
//             index: 3,
//             widths: {
//               default: '100%',
//               greaterThan1440: '',
//               between890And1440: '',
//               between600And890: ''
//             },
//             asterisk: true,
//             size: 'md',
//             color: 'default',
//             shape: 'smooth',
//             type: 'text',
//             id: 'value',
//             label: 'Value',
//             name: 'value',
//             placeholder: '',
//             required: true
//           },
//           {
//             index: 7,
//             widths: {
//               default: '100%',
//               greaterThan1440: '100%',
//               between890And1440: '100%',
//               between600And890: '100%'
//             },
//             name: 'rules',
//             label: '',
//             required: true,
//             tag: 'repeater',
//             placeholder: 'rule',
//             form: {
//               name: 'Nested Form',
//               grid: 3,
//               items: [
//                 {
//                   index: 2,
//                   widths: {
//                     default: '100%',
//                     greaterThan1440: '60%',
//                     between890And1440: '60%',
//                     between600And890: '60%'
//                   },
//                   asterisk: true,
//                   size: 'md',
//                   color: 'default',
//                   shape: 'smooth',
//                   type: 'select',
//                   options: ['OR', 'AND'],
//                   id: 'condition',
//                   label: 'Condition',
//                   name: 'condition',
//                   placeholder: '',
//                   required: true
//                 },
//                 {
//                   index: 7,
//                   widths: {
//                     default: '100%',
//                     greaterThan1440: '100%',
//                     between890And1440: '100%',
//                     between600And890: '100%'
//                   },
//                   name: 'rules',
//                   label: '',
//                   required: true,
//                   tag: 'repeater',
//                   placeholder: 'rule',
//                   form: {
//                     name: 'Nested Form',
//                     grid: 3,
//                     items: [
//                       {
//                         index: 1,
//                         widths: {
//                           default: '100%',
//                           greaterThan1440: '',
//                           between890And1440: '',
//                           between600And890: ''
//                         },
//                         asterisk: true,
//                         size: 'md',
//                         color: 'default',
//                         shape: 'smooth',
//                         type: 'select',
//                         options: ['Field1', 'Field2'],
//                         id: 'field',
//                         label: 'Field',
//                         name: 'field',
//                         placeholder: '',
//                         required: true
//                       },
//                       {
//                         index: 2,
//                         widths: {
//                           default: '100%',
//                           greaterThan1440: '',
//                           between890And1440: '',
//                           between600And890: ''
//                         },
//                         asterisk: true,
//                         size: 'md',
//                         color: 'default',
//                         shape: 'smooth',
//                         type: 'select',
//                         options: ['EQ', 'NOT_EQ', 'GT', 'LT'],
//                         id: 'operator',
//                         label: 'Operator',
//                         name: 'operator',
//                         placeholder: '',
//                         required: true
//                       },
//                       {
//                         index: 3,
//                         widths: {
//                           default: '100%',
//                           greaterThan1440: '',
//                           between890And1440: '',
//                           between600And890: ''
//                         },
//                         asterisk: true,
//                         size: 'md',
//                         color: 'default',
//                         shape: 'smooth',
//                         type: 'text',
//                         id: 'value',
//                         label: 'Value',
//                         name: 'value',
//                         placeholder: '',
//                         required: true
//                       }
//                     ]
//                   },
//                   validation: {
//                     type: 'array',
//                     validations: {}
//                   }
//                 }
//               ]
//             },
//             validation: {
//               type: 'array',
//               validations: {}
//             }
//           }
//         ]
//       },
//       validation: {
//         type: 'array',
//         validations: {}
//       }
//     }
//   ]
// };

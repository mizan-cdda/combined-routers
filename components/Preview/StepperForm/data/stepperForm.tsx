export const sForm = [
  {
    step: 1,
    slug: 1,
    name: 'Sign In',
    form: {
      name: 'Sign In',
      grid: 2,
      submit: {
        store: 'localStorage', // local Storage, session Storage, cookies
        key_name: 'name-form',
        endPoint: '/name-form',
        method: 'UPDATE' // INSERT, UPSERT, DELETE, UPDATE
      },
      items: [
        {
          index: 1,
          widths: {
            default: '100%',
            greaterThan1440: '50%',
            between890And1440: '50%',
            between600And890: '50%'
          },
          asterisk: true,
          size: 'md',
          color: 'default',
          shape: 'smooth',
          type: 'email',
          id: 'email',
          label: 'Email',
          name: 'email',
          placeholder: 'jenifer.lawrence@cdda.io',
          required: true,
          validation: {
            type: 'string',
            validations: {
              matches: {
                regex: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                message: 'Invalid Email'
              }
            }
          }
        },
        {
          index: 3,
          widths: {
            default: '100%',
            greaterThan1440: '100%',
            between890And1440: '100%',
            between600And890: '100%'
          },
          // atom: false,
          asterisk: true,
          color: 'default',
          type: 'textarea',
          resize: 'false',
          shape: 'smooth',
          id: 'textarea',
          label: 'Description',
          name: 'description',
          placeholder: '********',
          // variant: 'L',
          // labelClass: 'text-[#64748B] text-sm',
          required: true,
          validation: {
            type: 'string',
            validations: {
              minLength: {
                value: 10,
                message: 'Description must be at least 10 characters long'
              },
              maxLength: {
                value: 150,
                message: 'Description must be at most 50 characters long'
              }
            }
          }
        },
        {
          index: 2,
          widths: {
            default: '100%',
            greaterThan1440: '100%',
            between890And1440: '100%',
            between600And890: '100%'
          },
          asterisk: true,
          size: 'md',
          color: 'default',
          shape: 'smooth',
          type: 'password',
          id: 'password',
          label: 'Password',
          name: 'password',
          placeholder: '*************',
          required: true,
          validation: {
            type: 'string',
            validations: {
              matches: {
                regex: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                message:
                  'Password must contain at least 8 characters, one number, one uppercase letter, and one special character !@#$%^&*'
              }
            }
          }
        },
        {
          index: 7,
          widths: {
            default: '100%',
            greaterThan1440: '100%',
            between890And1440: '100%',
            between600And890: '100%'
          },
          name: 'friends',
          label: 'Friends',
          required: true,
          tag: 'repeater',
          placeholder: 'friend',
          form: {
            name: 'Nested Test',
            grid: 4,
            items: [
              {
                index: 3,
                widths: {
                  default: '100%',
                  greaterThan1440: '100%',
                  between890And1440: '100%',
                  between600And890: '100%'
                },
                asterisk: true,
                size: 'md',
                color: 'default',
                shape: 'smooth',
                type: 'number',
                id: 'age',
                label: 'Friend age',
                name: 'f_age',
                placeholder: 'write your friend age',
                required: true,
                validation: {
                  type: 'number',
                  validations: {
                    min: {
                      value: 18,
                      message: 'Friend age should be at least 18'
                    },
                    max: {
                      value: 65,
                      message: 'Friend age should be less than 65'
                    }
                  }
                }
              },
              {
                index: 2,
                widths: {
                  default: '100%',
                  greaterThan1440: '100%',
                  between890And1440: '100%',
                  between600And890: '100%'
                },
                asterisk: true,
                size: 'md',
                color: 'default',
                shape: 'smooth',
                type: 'text',
                id: 'name',
                label: 'Friend Name',
                name: 'f_name',
                placeholder: 'write your friend name',
                required: true,
                validation: {
                  type: 'string',
                  validations: {
                    minLength: {
                      value: 5,
                      message: 'Friend name should be at least 5 characters long'
                    },
                    maxLength: {
                      value: 20,
                      message: 'Friend name should be less than 20 characters long'
                    }
                  }
                }
              },
              {
                index: 7,
                widths: {
                  default: '100%',
                  greaterThan1440: '100%',
                  between890And1440: '100%',
                  between600And890: '100%'
                },
                name: 'friends',
                label: 'Friends',
                required: true,
                tag: 'repeater',
                placeholder: 'friend',
                form: {
                  name: 'Nested Test',
                  grid: 4,
                  items: [
                    {
                      index: 3,
                      widths: {
                        default: '100%',
                        greaterThan1440: '100%',
                        between890And1440: '100%',
                        between600And890: '100%'
                      },
                      asterisk: true,
                      size: 'md',
                      color: 'default',
                      shape: 'smooth',
                      type: 'number',
                      id: 'age',
                      label: 'Friend age',
                      name: 'f_age',
                      placeholder: 'write your friend age',
                      required: true,
                      validation: {
                        type: 'number',
                        validations: {
                          min: {
                            value: 18,
                            message: 'Friend age should be at least 18'
                          },
                          max: {
                            value: 65,
                            message: 'Friend age should be less than 65'
                          }
                        }
                      }
                    },
                    {
                      index: 2,
                      widths: {
                        default: '100%',
                        greaterThan1440: '100%',
                        between890And1440: '100%',
                        between600And890: '100%'
                      },
                      asterisk: true,
                      size: 'md',
                      color: 'default',
                      shape: 'smooth',
                      type: 'text',
                      id: 'name',
                      label: 'Friend Name',
                      name: 'f_name',
                      placeholder: 'write your friend name',
                      required: true,
                      validation: {
                        type: 'string',
                        validations: {
                          minLength: {
                            value: 5,
                            message: 'Friend name should be at least 5 characters long'
                          },
                          maxLength: {
                            value: 20,
                            message: 'Friend name should be less than 20 characters long'
                          }
                        }
                      }
                    },
                    {
                      index: 7,
                      widths: {
                        default: '100%',
                        greaterThan1440: '100%',
                        between890And1440: '100%',
                        between600And890: '100%'
                      },
                      name: 'friends',
                      label: 'Friends',
                      required: true,
                      tag: 'repeater',
                      placeholder: 'friend',
                      form: {
                        name: 'Nested Test',
                        grid: 4,
                        items: [
                          {
                            index: 3,
                            widths: {
                              default: '100%',
                              greaterThan1440: '100%',
                              between890And1440: '100%',
                              between600And890: '100%'
                            },
                            asterisk: true,
                            size: 'md',
                            color: 'default',
                            shape: 'smooth',
                            type: 'number',
                            id: 'age',
                            label: 'Friend age',
                            name: 'f_age',
                            placeholder: 'write your friend age',
                            required: true,
                            validation: {
                              type: 'number',
                              validations: {
                                min: {
                                  value: 18,
                                  message: 'Friend age should be at least 18'
                                },
                                max: {
                                  value: 65,
                                  message: 'Friend age should be less than 65'
                                }
                              }
                            }
                          },
                          {
                            index: 2,
                            widths: {
                              default: '100%',
                              greaterThan1440: '100%',
                              between890And1440: '100%',
                              between600And890: '100%'
                            },
                            asterisk: true,
                            size: 'md',
                            color: 'default',
                            shape: 'smooth',
                            type: 'text',
                            id: 'name',
                            label: 'Friend Name',
                            name: 'f_name',
                            placeholder: 'write your friend name',
                            required: true,
                            validation: {
                              type: 'string',
                              validations: {
                                minLength: {
                                  value: 5,
                                  message: 'Friend name should be at least 5 characters long'
                                },
                                maxLength: {
                                  value: 20,
                                  message: 'Friend name should be less than 20 characters long'
                                }
                              }
                            }
                          },
                          {
                            index: 7,
                            widths: {
                              default: '100%',
                              greaterThan1440: '100%',
                              between890And1440: '100%',
                              between600And890: '100%'
                            },
                            name: 'friends',
                            label: 'Friends',
                            required: true,
                            tag: 'repeater',
                            placeholder: 'friend',
                            form: {
                              name: 'Nested Test',
                              grid: 4,
                              items: [
                                {
                                  index: 3,
                                  widths: {
                                    default: '100%',
                                    greaterThan1440: '100%',
                                    between890And1440: '100%',
                                    between600And890: '100%'
                                  },
                                  asterisk: true,
                                  size: 'md',
                                  color: 'default',
                                  shape: 'smooth',
                                  type: 'number',
                                  id: 'age',
                                  label: 'Friend age',
                                  name: 'f_age',
                                  placeholder: 'write your friend age',
                                  required: true,
                                  validation: {
                                    type: 'number',
                                    validations: {
                                      min: {
                                        value: 18,
                                        message: 'Friend age should be at least 18'
                                      },
                                      max: {
                                        value: 65,
                                        message: 'Friend age should be less than 65'
                                      }
                                    }
                                  }
                                },
                                {
                                  index: 2,
                                  widths: {
                                    default: '100%',
                                    greaterThan1440: '100%',
                                    between890And1440: '100%',
                                    between600And890: '100%'
                                  },
                                  asterisk: true,
                                  size: 'md',
                                  color: 'default',
                                  shape: 'smooth',
                                  type: 'text',
                                  id: 'name',
                                  label: 'Friend Name',
                                  name: 'f_name',
                                  placeholder: 'write your friend name',
                                  required: true,
                                  validation: {
                                    type: 'string',
                                    validations: {
                                      minLength: {
                                        value: 5,
                                        message: 'Friend name should be at least 5 characters long'
                                      },
                                      maxLength: {
                                        value: 20,
                                        message:
                                          'Friend name should be less than 20 characters long'
                                      }
                                    }
                                  }
                                }
                              ]
                            },
                            validation: {
                              type: 'array',
                              validations: {}
                            }
                          }
                        ]
                      },
                      validation: {
                        type: 'array',
                        validations: {}
                      }
                    }
                  ]
                },
                validation: {
                  type: 'array',
                  validations: {}
                }
              }
            ]
          },
          validation: {
            type: 'array',
            validations: {}
          }
        },
        {
          index: 7,
          widths: {
            default: '100%',
            greaterThan1440: '100%',
            between890And1440: '100%',
            between600And890: '100%'
          },
          name: 'guests',
          label: 'Guests',
          required: true,
          tag: 'repeater',
          variant: 'custom-cdda',
          placeholder: 'guest',
          form: {
            name: 'Nested Test',
            grid: 4,
            items: [
              {
                index: 2,
                widths: {
                  default: '100%',
                  greaterThan1440: '100%',
                  between890And1440: '100%',
                  between600And890: '100%'
                },
                asterisk: true,
                size: 'md',
                color: 'default',
                shape: 'smooth',
                type: 'text',
                id: 'name',
                label: 'Friend Name',
                name: 'f_name',
                placeholder: 'write your friend name',
                required: true,
                validation: {
                  type: 'string',
                  validations: {
                    minLength: {
                      value: 5,
                      message: 'Friend name should be at least 5 characters long'
                    },
                    maxLength: {
                      value: 20,
                      message: 'Friend name should be less than 20 characters long'
                    }
                  }
                }
              },
              {
                index: 3,
                widths: {
                  default: '100%',
                  greaterThan1440: '100%',
                  between890And1440: '100%',
                  between600And890: '100%'
                },
                asterisk: true,
                size: 'md',
                color: 'default',
                shape: 'smooth',
                type: 'number',
                id: 'age',
                label: 'Friend age',
                name: 'f_age',
                placeholder: 'write your friend age',
                required: true,
                validation: {
                  type: 'number',
                  validations: {
                    min: {
                      value: 18,
                      message: 'Friend age should be at least 18'
                    },
                    max: {
                      value: 65,
                      message: 'Friend age should be less than 65'
                    }
                  }
                }
              },
              {
                index: 2,
                widths: {
                  default: '100%',
                  greaterThan1440: '100%',
                  between890And1440: '100%',
                  between600And890: '100%'
                },
                asterisk: true,
                size: 'md',
                color: 'default',
                shape: 'smooth',
                type: 'textarea',
                id: 'description',
                label: 'Description',
                name: 'f_description',
                placeholder: 'write description',
                required: true,
                validation: {
                  type: 'string',
                  validations: {
                    minLength: {
                      value: 5,
                      message: 'Description name should be at least 5 characters long'
                    },
                    maxLength: {
                      value: 20,
                      message: 'Description should be less than 20 characters long'
                    }
                  }
                }
              }
            ]
          },
          validation: {
            type: 'array',
            validations: {}
          }
        }
      ]
    }
  },
  {
    step: 2,
    slug: 2,
    name: 'Profile',
    form: {
      name: 'Profile',
      grid: 2,
      submit: {
        store: 'localStorage', // local Storage, session Storage
        key_name: 'change-form',
        endPoint: '/change-form',
        method: 'INSERT' // UPSERT, DELETE, UPDATE
      },
      items: [
        {
          index: 1,
          widths: {
            default: '100%',
            greaterThan1440: '100%',
            between890And1440: '100%',
            between600And890: '100%'
          },
          type: 'email',
          asterisk: true,
          id: 'email',
          label: 'Email',
          name: 'email',
          placeholder: 'Enter Email',
          variant: 'L',
          className: 'w-full',
          labelClass: 'text-sm',
          required: true,
          validation: {
            type: 'string',
            validations: {
              matches: {
                regex: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                message: 'Invalid Email'
              },
              min: {
                value: 5,
                message: 'Password must be at least 5 characters long'
              }
            }
          }
        },
        {
          index: 2,
          widths: {
            default: '100%',
            greaterThan1440: '100%',
            between890And1440: '100%',
            between600And890: '100%'
          },
          type: 'checkbox',
          color: 'primary',
          shape: 'smooth',
          label: <span className="text-sm">Is Married</span>,
          className: '',
          size: 'sm',
          name: 'isMarried'
        },
        {
          index: 4,
          widths: {
            default: '100%',
            greaterThan1440: '50%',
            between890And1440: '50%',
            between600And890: '100%'
          },
          type: 'signature',
          name: 'signature',
          label: 'Signature',
          required: true
        },
        {
          index: 5,
          widths: {
            default: '100%',
            greaterThan1440: '50%',
            between890And1440: '50%',
            between600And890: '100%'
          },
          type: 'signature',
          name: 'initials',
          required: true,
          label: 'Initial'
        },
        {
          index: 3,
          widths: {
            default: '100%',
            greaterThan1440: '100%',
            between890And1440: '100%',
            between600And890: '100%'
          },
          type: 'text',
          name: 'spouse_name',
          label: 'Spouse Name',
          variant: 'M',
          labelClass: 'text-sm',
          placeholder: 'Spouse name',
          className: 'bg-red-900',
          asterisk: true,
          depends: {
            name: 'isMarried',
            operator: 'eq',
            value: true
          },
          validation: {
            type: 'string',
            validations: {
              minLength: {
                value: 10,
                message: 'Description must be at least 10 characters long'
              },
              maxLength: {
                value: 50,
                message: 'Description must be at most 50 characters long'
              }
            }
          }
        }
      ]
    }
  },
  {
    step: 3,
    slug: 3,
    name: 'Change Mailing Address',
    form: {
      name: 'Change Mailing Address',
      grid: 2,
      submit: {
        store: 'localStorage', // local Storage, session Storage, cookies
        key_name: 'name-form',
        endPoint: '/name-form',
        method: 'UPDATE' // INSERT, UPSERT, DELETE, UPDATE
      },
      items: [
        {
          index: 1,
          widths: {
            default: '100%',
            greaterThan1440: '50%',
            between890And1440: '50%',
            between600And890: '100%'
          },
          type: 'select',
          name: 'mailing_address',
          label: 'Mailing Address',
          variant: 'M',
          asterisk: true,
          labelClass: 'text-sm',
          // options: ['mctos', 'khulna', 'dhaka'], // if options are given , availableDataAPI cannot be used
          availableDataAPI: 'https://jsonplaceholder.typicode.com/users' // if options are given , availableDataAPI cannot be used
        },
        {
          index: 2,
          widths: {
            default: '100%',
            greaterThan1440: '50%',
            between890And1440: '50%',
            between600And890: '100%'
          },
          type: 'number',
          name: 'street_number',
          label: 'Street Number',
          placeholder: 'Street Number',
          variant: 'M',
          asterisk: true,
          labelClass: 'text-sm',
          required: true
        },
        {
          index: 3,
          widths: {
            default: '100%',
            greaterThan1440: '50%',
            between890And1440: '50%',
            between600And890: '100%'
          },
          type: 'text',
          name: 'street_name',
          label: 'Street Name',
          variant: 'M',
          labelClass: 'text-sm',
          placeholder: 'Street Name',
          asterisk: true
        },
        {
          index: 4,
          widths: {
            default: '100%',
            greaterThan1440: '50%',
            between890And1440: '50%',
            between600And890: '100%'
          },
          type: 'text',
          name: 'apt',
          label: 'Apt/Suite',
          placeholder: 'Apt/Suite',
          variant: 'M',
          asterisk: true,
          labelClass: 'text-sm',
          required: true
        },
        {
          index: 5,
          widths: {
            default: '100%',
            greaterThan1440: '50%',
            between890And1440: '50%',
            between600And890: '100%'
          },
          type: 'text',
          name: 'city',
          label: 'City',
          variant: 'M',
          labelClass: 'text-sm',
          placeholder: 'City',
          asterisk: true
        },
        {
          index: 6,
          widths: {
            default: '100%',
            greaterThan1440: '50%',
            between890And1440: '50%',
            between600And890: '100%'
          },
          type: 'text',
          name: 'state',
          label: 'State',
          placeholder: 'State',
          variant: 'M',
          asterisk: true,
          labelClass: 'text-sm',
          required: true
        },
        {
          index: 7,
          widths: {
            default: '100%',
            greaterThan1440: '50%',
            between890And1440: '50%',
            between600And890: '100%'
          },
          type: 'number',
          name: 'zip',
          label: 'Zip',
          variant: 'M',
          labelClass: 'text-sm',
          placeholder: 'Zip',
          className: 'bg-red-900',
          asterisk: true,
          required: true
        }
      ]
    }
  }
];

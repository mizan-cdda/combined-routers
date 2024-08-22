// Define the Rule interface correctly
export interface Rule {
  field?: string; // Field name (optional)
  operator?: Operator; // Operator like 'GT', 'LT', 'CONTAINS' (optional)
  value?: string | number; // Value to compare against (optional)
  condition?: Condition; // Condition like 'AND' or 'OR' (optional)
  rules?: Rule[]; // Nested rules (optional)
}

// Data structure where keys are dynamic
export interface Data {
  [key: string]: any;
}

// Supported operators
export type Operator = "GT" | "LT" | "EQ" | "NEQ" | "CONTAINS";

// Supported conditions
export type Condition = "AND" | "OR";

// Function to evaluate conditions based on rules
function evaluateCondition(data: Data, rules: Rule[]): boolean {
  return rules.every((rule) => {
    if (rule.condition && rule.rules) {
      // Recursively evaluate the nested condition
      return evaluateRules(data, rule.condition, rule.rules);
    } 
    else if (
      rule.field &&
      rule.operator !== undefined &&
      rule.value !== undefined
    ) {
      const { field, operator, value } = rule;
      const fieldValue = data[field];

      switch (operator) {
        case "GT":
          return Number(fieldValue) > Number(value);
        case "LT":
          return Number(fieldValue) < Number(value);
        case "EQ":
          return fieldValue == value;
        case "NEQ":
          return fieldValue != value;
        case "CONTAINS":
          return (
            typeof fieldValue === "string" &&
            fieldValue
              .toLocaleLowerCase()
              .includes(String(value).toLocaleLowerCase())
          );
        default:
          return false;
      }
    }
    return false;
  });
}

// Function to evaluate the rules
export function evaluateRules(
  data: Data,
  condition: Condition,
  rules: Rule[]
): boolean {
  if (condition === "AND") {
    return evaluateCondition(data, rules);
  } else if (condition === "OR") {
    return rules.some((rule) => evaluateCondition(data, [rule]));
  }
  return false;
}

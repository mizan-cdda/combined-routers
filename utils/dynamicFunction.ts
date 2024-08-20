export const dynamicFunc = async (val: string, parameter: any) => {
  const functionsModule = await import("@/functions");

  if (!functionsModule.functions[val]) {
    return;
  }
  const dynamicFunction = functionsModule.functions[val];
  if (parameter) {
    dynamicFunction(parameter);
    return;
  }
  dynamicFunction();
};

export const generateId = (project?: string) => {
  if (project) {
    return `pyr-${project}-${(
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
    ).toUpperCase()}`;
  }
  return `pyrcomp-${(
    Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
  ).toUpperCase()}`;
};

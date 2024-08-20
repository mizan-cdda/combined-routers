export const organizeDataIntoTree = (components: any, parent_id = null) => {
  // Define a recursive function to organize data into a tree
  // const filteredData = data?.filter(
  //   (item: any) => item.parent_id === parent_id
  // ); // Filter data by parent_id

  // find parent
  const parent = components.find(
    (component: any) => component?.id === (parent_id || "root")
  );
  // find children of parent and map them to their data
  const filteredChild = parent?.children?.map((childId: string) =>
    components?.find((component: any) => component.id === childId)
  );

  // children are empty
  // if (filteredData.length === 0) {
  if (filteredChild?.length === 0) {
    return null;
  }

  // Return the filtered data mapped with its children
  return filteredChild?.map((component: any) => ({
    ...component,
    childrenArr: organizeDataIntoTree(components, component?.id), // Recursively call the function for children
  }));
};

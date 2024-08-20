export const convertToPageCompilerData = (data: any) => {
  return (
    data ||
    []
      // .filter((c: any) => c.id !== "root")
      .map((c: any) => ({
        id: c.id,
        parent_id: c.parent,
        children: c.children,
        styles:
          c.props && c.props.style
            ? Object.keys(c.props.style).map((style) => ({
                key: style,
                value: c.props.style[style],
                device: "desktop",
              }))
            : null, // handle the case when c.props.style is null or undefined

        static_content: null,
        dynamic_content: {
          hooks: [],
          data: [],
        },
      }))
  );
};

export const getShowLayout = (state: any) => state.app.showLayout;

export const getFocusedComponent = (id: string) => (state: any) =>
  state.app.inputTextFocused && state.components.present.selectedId === id;

export const getInputTextFocused = (state: any) => state.app.inputTextFocused;

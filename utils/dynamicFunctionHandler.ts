import { MouseEvent } from "react";

export const dynamicFunctionHandler = ({
  handlers = {},
}: {
  handlers: any;
}) => {
  // Define a function to handle a specific event based on its name and the event object
  const handleEvent = (eventName: string, event: MouseEvent) => {
    // Check if the data object has a function associated with the current event name
    if (handlers?.[eventName]) {
      // If there is a function, use eval to execute it with the provided event object
      eval(handlers?.[eventName])(event);
    }
  };

  // Use the reduce function to dynamically create event handlers for each event in the data object
  const eventHandlers = Object.keys(handlers).reduce(
    (handlers: any, eventName: string) => {
      // For each event name, create a new function that calls the handleEvent function with the event name and object
      handlers[eventName] = (event: MouseEvent) =>
        handleEvent(eventName, event);
      // Return the updated handlers object
      return handlers;
    },
    {}
  );

  return eventHandlers;
};

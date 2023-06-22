export const setAttribute = (element: Element, name: string, value: string | null | undefined) => {
  if (typeof value === "string") {
    element.setAttribute(name, value);
  }
};

export const clipboardCopy = (text: string) => {
  return window.navigator.clipboard.writeText(text);
};

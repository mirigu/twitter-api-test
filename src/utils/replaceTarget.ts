export const replaceTarget = (url: string) => {
  return url.split("/")[url.split("/").length - 1];
};

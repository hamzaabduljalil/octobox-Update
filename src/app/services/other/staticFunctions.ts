export function deepMergeAndOverwrite(target: any, source: any) {
  Object.keys(target).forEach((key) => {
    if (!source.hasOwnProperty(key)) {
      delete target[key];
    }
  });
  Object.keys(source).forEach((key) => {
    target[key] = source[key];
  });
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

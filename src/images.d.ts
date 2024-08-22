declare module '*.png' {
  const value: {uri: string};
  export default value;
}

declare module '*.mp4' {
  const src: string;
  export default src;
}

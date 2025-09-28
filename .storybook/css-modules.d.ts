declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'rsuite/dist/rsuite.min.css';

declare const IS_DEVELOPMENT: boolean;
declare const IS_PRODUCTION: boolean;

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

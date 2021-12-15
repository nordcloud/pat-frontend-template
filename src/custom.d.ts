/* Copyright (c) 2021 Nordcloud Oy or its affiliates. All Rights Reserved. */

declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

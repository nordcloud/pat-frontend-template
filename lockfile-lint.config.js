/** @see https://github.com/lirantal/lockfile-lint/tree/main/packages/lockfile-lint#file-based-configuration */
module.exports = {
  type: "npm",
  path: "package-lock.json",
  allowedHosts: "npm",
  validateHttps: true,
  validateIntegrity: false,
  validatePackageNames: true,
  allowedPackageNameAliases: [
    "string-width-cjs:string-width",
    "strip-ansi-cjs: strip-ansi",
    "wrap-ansi-cjs:wrap-ansi",
  ],
};

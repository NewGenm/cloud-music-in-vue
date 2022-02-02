module.exports = {
  "presets": [["@babel/preset-env", { "modules": false }], ["@vue/app", { useBuiltIns: "entry" }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    "@babel/plugin-transform-runtime"
  ]
}

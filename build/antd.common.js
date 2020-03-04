const tsImportPluginFactory = require("ts-import-plugin") //https://github.com/Brooooooklyn/ts-import-plugin
module.exports = () => ({
  before: [
    tsImportPluginFactory({
      libraryName: "antd",
      libraryDirectory: "lib",
      style: true
    })
  ]
})

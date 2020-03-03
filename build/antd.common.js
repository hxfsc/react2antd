const tsImportPluginFactory = require("ts-import-plugin")
module.exports = () => ({
  before: [
    tsImportPluginFactory({
      libraryName: "antd",
      libraryDirectory: "lib",
      style: true
    })
  ]
})

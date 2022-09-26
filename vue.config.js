require('dotenv').config();
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  pwa: {
    name: 'Calc Ip',
    themeColor: "#ffffff",
  }
}
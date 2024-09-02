/**
 * plugins/router.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import router from './router'

export function registerPlugins (app) {
  app.use(router)
  app.use(vuetify)
}
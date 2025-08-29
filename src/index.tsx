import '@lynx-js/preact-devtools'
import { root } from '@lynx-js/react'
import '@lynx-js/react/debug'

import Layout from './Router.js'

root.render(<Layout />)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}

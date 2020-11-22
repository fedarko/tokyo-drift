const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')

describe('Application launch', function () {
  this.timeout(120000)

  beforeEach(function () {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '../..')],
      // https://stackoverflow.com/a/50725918/10730311
      // https://github.com/electron-userland/spectron/issues/357
      chromeDriverArgs: [
          "--disable-dev-shm-usage",
          "--no-sandbox",
          "--whitelisted-ips=",
          "--disable-gpu",
          "--headless",
          // https://stackoverflow.com/a/56638103/10730311
          "--remote-debugging-port=9222",
      ]
    })
    return this.app.start()
  })

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('shows an initial window', function () {
    return this.app.client.getWindowCount().then(function (count) {
      assert.equal(count, 1)
      // Please note that getWindowCount() will return 2 if `dev tools` are opened.
      // assert.equal(count, 2)
    })
  })
})

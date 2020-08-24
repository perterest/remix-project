'use strict'
const init = require('../helpers/init')
const sauce = require('./sauce')

module.exports = {
  before: function (browser, done) {
    init(browser, done, 'http://127.0.0.1:8080', false)
  },

  'Should display settings menu': function (browser) {
    browser.waitForElementVisible('*[data-id="remixIdeIconPanel"]', 10000)
    .click('*[data-id="landingPageStartSolidity"]')
    .waitForElementVisible('*[data-id="verticalIconsKindsettings"]', 5000)
    .click('*[data-id="verticalIconsKindsettings"]')
    .waitForElementContainsText('h6[data-id="sidePanelSwapitTitle"]', 'SETTINGS')
  },

  'Should open gitter channel in a new tab when `Gitter Channel Button` is clicked': function (browser) {
    const runtimeBrowser = browser.capabilities.browserName

    browser.waitForElementVisible('*[data-id="remixIdeSidePanel"]')
    .waitForElementVisible('*[data-id="settingsTabGitterChannelButton"]', 5000)
    .click('*[data-id="settingsTabGitterChannelButton"]')
    .pause(2000)
    .perform((done) => { if (runtimeBrowser === 'chrome') { browser.switchBrowserTab(1).assert.urlContains('https://gitter.im/ethereum/remix') } done() })
  },

  'Should activate `generate contract metadata`': function (browser) {
    browser.switchBrowserTab(0)
    .waitForElementVisible('*[data-id="remixIdeSidePanel"]', 5000)
    .waitForElementVisible('*[data-id="settingsTabGenerateContractMetadata"]', 5000)
    .click('*[data-id="settingsTabGenerateContractMetadata"]')
    .click('*[data-id="verticalIconsFileExplorerIcons"]')
    .openFile('browser/3_Ballot.sol')
    .click('*[data-id="verticalIconsKindsolidity"]')
    .pause(2000)
    .click('*[data-id="compilerContainerCompileBtn"]')
    .pause(3000)
    .click('*[data-id="verticalIconsKindfileExplorers"]')
    .openFile('browser/artifacts/Ballot.json')
  },

  'Should add new github access token': function (browser) {
    browser.waitForElementVisible('*[data-id="verticalIconsKindsettings"]', 5000)
    .click('*[data-id="verticalIconsKindsettings"]')
    .setValue('*[data-id="settingsTabGistAccessToken"]', '**********')
    .click('*[data-id="settingsTabSaveGistToken"]')
    .waitForElementVisible('*[data-shared="tooltipPopup"]:nth-last-of-type(1)', 5000)
    .assert.containsText('*[data-shared="tooltipPopup"]:nth-last-of-type(1)', 'Access token saved')
  },

  'Should copy github access token to clipboard': function (browser) {
    browser.waitForElementVisible('*[data-id="verticalIconsKindsettings"]', 5000)
    .click('*[data-id="copyToClipboardCopyIcon"]')
    .waitForElementVisible('*[data-shared="tooltipPopup"]:nth-last-of-type(1)', 5000)
    .assert.containsText('*[data-shared="tooltipPopup"]:nth-last-of-type(1)', 'Copied value to clipboard.')
  },

  'Should remove github access token': function (browser) {
    browser.waitForElementVisible('*[data-id="verticalIconsKindsettings"]', 5000)
    .click('*[data-id="settingsTabRemoveGistToken"]')
    .waitForElementVisible('*[data-shared="tooltipPopup"]:nth-last-of-type(1)', 5000)
    .assert.containsText('*[data-shared="tooltipPopup"]:nth-last-of-type(1)', 'Access token removed')
    .assert.containsText('*[data-id="settingsTabGistAccessToken"]', '')
  },

  'Should load dark theme': function (browser) {
    browser.waitForElementVisible('*[data-id="verticalIconsKindsettings"]', 5000)
    .click('*[data-id="settingsTabThemeDark"]')
    .pause(2000)
    .checkElementStyle(':root', '--primary', remixIdeThemes.dark.primary)
    .checkElementStyle(':root', '--secondary', remixIdeThemes.dark.secondary)
    .checkElementStyle(':root', '--success', remixIdeThemes.dark.success)
    .checkElementStyle(':root', '--info', remixIdeThemes.dark.info)
    .checkElementStyle(':root', '--warning', remixIdeThemes.dark.warning)
    .checkElementStyle(':root', '--danger', remixIdeThemes.dark.danger)
  },

  'Should load light theme': function (browser) {
    browser.waitForElementVisible('*[data-id="verticalIconsKindsettings"]', 5000)
    .click('*[data-id="settingsTabThemeLight"]')
    .pause(2000)
    .checkElementStyle(':root', '--primary', remixIdeThemes.light.primary)
    .checkElementStyle(':root', '--secondary', remixIdeThemes.light.secondary)
    .checkElementStyle(':root', '--success', remixIdeThemes.light.success)
    .checkElementStyle(':root', '--info', remixIdeThemes.light.info)
    .checkElementStyle(':root', '--warning', remixIdeThemes.light.warning)
    .checkElementStyle(':root', '--danger', remixIdeThemes.light.danger)
  },

  'Should load Cerulean theme': function (browser) {
    browser.waitForElementVisible('*[data-id="verticalIconsKindsettings"]', 5000)
    .click('*[data-id="settingsTabThemeCerulean"]')
    .pause(5000)
    .checkElementStyle(':root', '--primary', remixIdeThemes.curelean.primary)
    .checkElementStyle(':root', '--secondary', remixIdeThemes.curelean.secondary)
    .checkElementStyle(':root', '--success', remixIdeThemes.curelean.success)
    .checkElementStyle(':root', '--info', remixIdeThemes.curelean.info)
    .checkElementStyle(':root', '--warning', remixIdeThemes.curelean.warning)
    .checkElementStyle(':root', '--danger', remixIdeThemes.curelean.danger)
  },

  'Should load Flatly theme': function (browser) {
    browser.waitForElementVisible('*[data-id="verticalIconsKindsettings"]', 5000)
    .click('*[data-id="settingsTabThemeFlatly"]')
    .pause(2000)
    .checkElementStyle(':root', '--primary', remixIdeThemes.flatly.primary)
    .checkElementStyle(':root', '--secondary', remixIdeThemes.flatly.secondary)
    .checkElementStyle(':root', '--success', remixIdeThemes.flatly.success)
    .checkElementStyle(':root', '--info', remixIdeThemes.flatly.info)
    .checkElementStyle(':root', '--warning', remixIdeThemes.flatly.warning)
    .checkElementStyle(':root', '--danger', remixIdeThemes.flatly.danger)
  },

  'Should load Spacelab theme': function (browser) {
    browser.waitForElementVisible('*[data-id="verticalIconsKindsettings"]', 5000)
    .click('*[data-id="settingsTabThemeSpacelab"]')
    .pause(2000)
    .checkElementStyle(':root', '--primary', remixIdeThemes.spacelab.primary)
    .checkElementStyle(':root', '--secondary', remixIdeThemes.spacelab.secondary)
    .checkElementStyle(':root', '--success', remixIdeThemes.spacelab.success)
    .checkElementStyle(':root', '--info', remixIdeThemes.spacelab.info)
    .checkElementStyle(':root', '--warning', remixIdeThemes.spacelab.warning)
    .checkElementStyle(':root', '--danger', remixIdeThemes.spacelab.danger)
  },

  'Should load Cyborg theme': function (browser) {
    browser.waitForElementVisible('*[data-id="verticalIconsKindsettings"]', 5000)
    .click('*[data-id="settingsTabThemeCyborg"]')
    .pause(2000)
    .checkElementStyle(':root', '--primary', remixIdeThemes.cyborg.primary)
    .checkElementStyle(':root', '--secondary', remixIdeThemes.cyborg.secondary)
    .checkElementStyle(':root', '--success', remixIdeThemes.cyborg.success)
    .checkElementStyle(':root', '--info', remixIdeThemes.cyborg.info)
    .checkElementStyle(':root', '--warning', remixIdeThemes.cyborg.warning)
    .checkElementStyle(':root', '--danger', remixIdeThemes.cyborg.danger)
  },

  tearDown: sauce
}

var remixIdeThemes = {
  dark: {
    primary: '#007aa6',
    secondary: '#595c76',
    success: '#32ba89',
    info: '#086CB5',
    warning: '#c97539',
    danger: '#b84040'
  },
  light: {
    primary: '#007aa6',
    secondary: '#a8b3bc',
    success: '#32ba89',
    info: '#007aa6',
    warning: '#c97539',
    danger: '#b84040'
  },
  curelean: {
    primary: '#2FA4E7',
    secondary: '#e9ecef',
    success: '#73A839',
    info: '#033C73',
    warning: '#DD5600',
    danger: '#C71C22'
  },
  flatly: {
    primary: '#2C3E50',
    secondary: '#95a5a6',
    success: '#18BC9C',
    info: '#3498DB',
    warning: '#F39C12',
    danger: '#E74C3C'
  },
  spacelab: {
    primary: '#446E9B',
    secondary: '#999',
    success: '#3CB521',
    info: '#3399F3',
    warning: '#D47500',
    danger: '#CD0200'
  },
  cyborg: {
    primary: '#2A9FD6',
    secondary: '#555',
    success: '#77B300',
    info: '#9933CC',
    warning: '#FF8800',
    danger: '#CC0000'
  }
}

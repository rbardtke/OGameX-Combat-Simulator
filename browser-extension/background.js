// Background script for opening the simulator in a new tab
// Works for both Chrome and Firefox

// Use browser API if available (Firefox), otherwise use chrome API (Chrome)
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;
const actionAPI = browserAPI.browserAction || browserAPI.action;

actionAPI.onClicked.addListener(() => {
  browserAPI.tabs.create({
    url: browserAPI.runtime.getURL('index.html')
  });
});

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * * Portions Copyright (C) Philipp Kewisch, 2017
 * Updated for Manifest V3 and Things 3 by Sridhar Katakam, 2026 */

browser.action.onClicked.addListener(async (tab) => {
  let { quickentry, reveal, when } = await browser.storage.local.get({
    quickentry: true,
    reveal: true,
    when: "inbox",
  });

  // Construct the things:///add URL scheme
  let thingsUrl = `things:///add?title=${encodeURIComponent(tab.title)}&notes=${encodeURIComponent(tab.url)}&show-quick-entry=${quickentry}&reveal=${reveal}`;

  if (when !== "inbox" && !quickentry) {
    thingsUrl += `&when=${when}`;
  }

  try {
    // Navigate the current tab to trigger the Things protocol handler
    await browser.tabs.update(tab.id, { url: thingsUrl });
  } catch (error) {
    console.error("Things Quick Entry Error:", error);
  }
});

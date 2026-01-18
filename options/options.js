/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Portions Copyright (C) Philipp Kewisch, 2018 */

// https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    let later = () => {
      timeout = null;
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (!timeout) {
      func.apply(this, args);
    }
  };
}

function updateRevealState() {
  let showNode = document.getElementById("quickentry");
  let revealNode = document.getElementById("reveal");
  let whenNode = document.getElementById("when");

  revealNode.parentNode.classList.toggle("disabled", showNode.checked);
  whenNode.parentNode.classList.toggle("disabled", showNode.checked);
  whenNode.classList.toggle("disabled", showNode.checked);
  whenNode.disabled = showNode.checked;

  if (showNode.checked) {
    revealNode.dataset.realchecked = revealNode.checked;
    revealNode.checked = false;
  } else if ("realchecked" in revealNode.dataset) {
    revealNode.checked = revealNode.dataset.realchecked == "true";
    delete revealNode.dataset.realchecked;
  }
}

let save = debounce(() => {
  let showNode = document.getElementById("quickentry");
  let revealNode = document.getElementById("reveal");
  let whenNode = document.getElementById("when");

  browser.storage.local.set({
    quickentry: showNode.checked,
    reveal: revealNode.checked,
    when: whenNode.value
  });
});

async function load() {
  let { quickentry, reveal, when } = await browser.storage.local.get({ quickentry: true, reveal: true, when: "inbox" });
  let showNode = document.getElementById("quickentry");
  let revealNode = document.getElementById("reveal");
  let whenNode = document.getElementById("when");
  showNode.checked = quickentry;
  revealNode.checked = reveal;
  whenNode.value = when;

  updateRevealState();
}

function listen() {
  let showNode = document.getElementById("quickentry");
  showNode.addEventListener("click", save);
  showNode.addEventListener("click", updateRevealState);

  let revealNode = document.getElementById("reveal");
  revealNode.addEventListener("click", save);

  let whenNode = document.getElementById("when");
  whenNode.addEventListener("change", save);
}

(async function() {
  listen();
  await load();
})();

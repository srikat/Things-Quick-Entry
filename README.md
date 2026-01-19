# Things Quick Entry

A Firefox extension that sends the current tab's title and URL to **Things 3**.

Tested on macOS.

## Why this exists
The native Things 3 "Quick Entry with Autofill" feature often struggles to grab metadata from Firefox due to privacy sandboxing. This extension bypasses that by using the official `things:///add` URL scheme to ensure your tasks always include the page title and link.

## Features
- **One-Click Entry:** Send any webpage to your Things Inbox instantly.
- **Pre-filled Data:** Automatically sets the task title to the webpage title and the notes to the URL.
- **Customizable Shortcut:** Defaulted to `Ctrl+T`
- **Manifest V3:** Modernized for long-term compatibility and performance.

## Installation
Currently, this is a personal fork. To install it:
1. Download the repo.
2. Open Firefox and go to `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on** and select the `manifest.json` file.

## Configuration
You can adjust behavior in the extension options.
- **Show Quick Entry:** Toggle whether the Things Quick Entry dialog appears or if the task is sent silently.
- **List selection** Choose where the task should appear (Inbox, Today, etc.) when Quick Entry dialog is set not to be shown.
- **Select newly created task:** Choose whether to highlight/select the newly created task in Things 3 or not. Things window will still become active regardless of this setting.

## Credits
This project is a Manifest V3 fork of the original ["Send to Things" extension by Philipp Kewisch](https://addons.mozilla.org/en-US/firefox/addon/send-to-things/).

Modified and maintained by **Sridhar Katakam**.

## License
This project is licensed under the **Mozilla Public License 2.0**. See the `LICENSE` file for details.

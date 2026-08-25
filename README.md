# Password Generator V8

A lightweight, client-side password generator with English and Chinese interfaces.

**Live demo:** [Password Generator V8 - Bilingual](https://the-password-generator.pages.dev/)

## Features

- Generate regular passwords or numeric PINs.
- Generate 1 to 16 passwords in one operation.
- Configure password length from 0 to 128 characters (0 is treated as invalid for generation).
- Configure PIN length from 3 to 32 digits.
- Select lowercase letters, uppercase letters, digits, and custom special characters.
- Enforce at least one character from every selected character category.
- Edit the special-character set before generating.
- Advanced filters for:
  - Easier-to-speak passwords by removing ambiguous characters.
  - Easier-to-read passwords by removing visually similar characters.
  - Smartphone-friendly input by excluding uppercase letters and special-character conflicts.
- Automatic password strength analysis with theoretical and effective entropy details.
- Common weak-password detection via lazy async loading from `weakpasswords.json`.
- Uses a browser-locale-aware default language: Chinese when the browser locale is Chinese, otherwise English.
- English and Chinese language switching.
- Dark and light themes.
- Responsive layout for desktop and mobile screens.
- Built-in QR code preview for copied passwords.
- Professional strength checker modal for detailed password analysis.

## How It Works

Regular passwords are generated from the selected character pool. The generator first places one character from each selected category, then fills the remaining positions from the effective pool and shuffles the result.

PIN mode generates numeric values only and uses a separate length range. Advanced password filters are hidden while PIN mode is active.

Random values are produced with the browser's Web Crypto API (`crypto.getRandomValues`). Generation happens locally in the browser; passwords are not sent to a server by this project.

The weak-password list is loaded lazily through `fetch('./weakpasswords.json')` and cached after the first successful load. This keeps the page lightweight and avoids loading the password dictionary unless the strength checker actually needs it.

## Run Locally

No build step or dependency installation is required.

1. Clone or download this repository.
2. Open `index.html` in a modern browser.
3. Choose a mode and configure the options.
4. Click **Generate**.

For the most reliable clipboard behavior, serve the folder through a local HTTP server or open the hosted demo over HTTPS. Clipboard access may be restricted when a local file is opened directly.

Example using Python:

```bash
python -m http.server 8018
```

Then visit <http://localhost:8018/>.

### Troubleshoot Port 8018

Use PowerShell to find and stop a process that is occupying port 8018:

**Find the process:**

```powershell
Get-NetTCPConnection -LocalPort 8018 | Select-Object LocalAddress, LocalPort, @{Name="PID";Expression={$_.OwningProcess}}, @{Name="ProcessName";Expression={(Get-Process -Id $_.OwningProcess).ProcessName}}, @{Name="Path";Expression={(Get-Process -Id $_.OwningProcess).Path}}
```

**Stop the process:**

```powershell
Get-NetTCPConnection -LocalPort 8018 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

**Check the port again:**

```powershell
Get-NetTCPConnection -LocalPort 8018
```

If the final command returns no connection, port 8018 is no longer in use. Start the local server again with `python -m http.server 8018`.

## Project Structure

| File | Purpose |
| --- | --- |
| `index.html` | Main application markup and bilingual interface labels. |
| `script.js` | Password generation, validation, filtering, strength analysis, copying, QR preview, weak-password lazy loading, language switching, and theme toggling. |
| `weakpasswords.json` | Weak-password dictionary used by the lazy async common-password detection. |
| `style.css` | Responsive layout, controls, result styling, and light/dark themes. |
| `historical_edition/*.html` | Earlier standalone versions. |

## Browser Support

Use a modern browser with support for:

- JavaScript ES2019 or newer features.
- Web Crypto API.
- Clipboard API, when copying generated results.
- Fetch API for loading the weak-password list when analysis is used.

## Privacy Note

This is a local browser tool. Avoid copying generated passwords into untrusted applications or exposing them in screenshots, logs, or shared terminals. The strength score is an estimate for comparison, not a guarantee of security.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

Copyright (c) 2026

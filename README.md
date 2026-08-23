# Password Generator V8

A lightweight, client-side password generator with English and Chinese interfaces.

**Live demo:** [Password Generator V8 - Bilingual](https://the-password-generator.pages.dev/)

## Features

- Generate regular passwords or numeric PINs.
- Generate 1 to 10 passwords in one operation.
- Configure password length from 1 to 256 characters.
- Configure PIN length from 3 to 32 digits.
- Select lowercase letters, uppercase letters, digits, and custom special characters.
- Enforce at least one character from every selected character category.
- Edit the special-character set before generating.
- Advanced filters for:
  - Easier-to-speak passwords by removing ambiguous characters.
  - Easier-to-read passwords by removing visually similar characters.
  - Smartphone-friendly input by excluding uppercase letters and special-character conflicts.
- Automatic password strength analysis with theoretical and effective entropy details.
- Copy one password or all generated passwords to the clipboard.
- English and Chinese language switching.
- Dark and light themes.
- Responsive layout for desktop and mobile screens.

## How It Works

Regular passwords are generated from the selected character pool. The generator first places one character from each selected category, then fills the remaining positions from the effective pool and shuffles the result.

PIN mode generates numeric values only and uses a separate length range. Advanced password filters are hidden while PIN mode is active.

Random values are produced with the browser's Web Crypto API (`crypto.getRandomValues`). Generation happens locally in the browser; passwords are not sent to a server by this project.

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

## Project Structure

| File | Purpose |
| --- | --- |
| `index.html` | Main application markup and bilingual interface labels. |
| `script.js` | Password generation, validation, filtering, strength analysis, copying, language switching, and theme toggling. |
| `style.css` | Responsive layout, controls, result styling, and light/dark themes. |
| `password-generator_V6.html` | Earlier standalone V6 version. |
| `password-generator_V7.html` | Earlier standalone V7 version. |

## Browser Support

Use a modern browser with support for:

- JavaScript ES2019 or newer features.
- Web Crypto API.
- Clipboard API, when copying generated results.

## Privacy Note

This is a local browser tool. Avoid copying generated passwords into untrusted applications or exposing them in screenshots, logs, or shared terminals. The strength score is an estimate for comparison, not a guarantee of security.

## License

No license file is currently included in this repository.

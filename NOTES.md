## 💻 Installation
- Because of a bug with webpack, you must use a node version below 9 for this project. This is fixed on `kyt` master, but not yet released. To use another version of Node, run:
`npm i -D node@8`
- After that, the rest of the npm commands should run:
`npm install`
`npm run dev`

## ✍️ General notes
- Global application styles and variables can be found in `client > styles`
- API services are defined in `client > services`
- Installed `enzyme-adapter-react-16` and `enzyme-to-json` so that enzyme would work with this application and I could do snapshot testing
- Added a few new npm scripts:
  - `npm run update-snapshots` to update component snapshots
  - `npm run lint-script-fix` and `npm run lint-style-fix` to force linter fixes
- Tested for accessibility; considered colors, keyboard interactions, and tested the page with VoiceOver to ensure a screen reader could successfully read the page.

## ✨ Enhancements if more time (outside of the extra-credit)
- Add more failsafes if data is missing or the model from the API changes so the app does not crash
- Storing data in local or session storage so the user could refresh the page
- Adding onto the timer component, adding start, stop, pause
- There can always be more test 😃, specifically around interactions in the Game component

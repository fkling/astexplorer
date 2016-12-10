# Custom Fonts

There's not a great way to customize font-awesome at the moment
(see: https://github.com/FortAwesome/Font-Awesome/wiki/Customize-Font-Awesome).

So we are using [fontcustom](https://github.com/FontCustom/fontcustom) to add
custom logos / fonts to the app.

## Build Instructions

- install fontcustom: https://github.com/FontCustom/fontcustom#installation
- in the root of the astexplorer project, run:
```bash
yarn run fontcustom
```
- you can then confirm things worked by running
`open ./fontcustom/fontcustom-preview.html`

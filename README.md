# TYPESCRIPT, ELECTRON, REACT AND REDUX BOILERPLATE

This a full fledged boilerplate for creating Electron apps with Typescript and React. Pull requests are welcome for the repository.

## TECHNOLOGIES USED

- Rendering Process: React
- State Management: Redux
- Testing Suite: Jest
- Bundler: Webpack
- Task Runner: Gulp
- CSS Pre-Processor: SCSS

## COMMANDS

### Development

For main process:

```sh
npm run start:main-dev # NPM

yarn start:main-dev # Yarn
```

For renderer process:

```sh
npm run start:renderer-dev # NPM

yarn start:renderer-dec # Yarn
```

### Building

Full Build:

```sh
npm run build # NPM

yarn build # Yarn
```

Electron Process:

```sh
npm run build:main # NPM

yarn build:main # Yarn
```

Renderer Process:

```sh
npm run build:renderer # NPM

yarn build:renderer # Yarn
```

### Generating Installers

For all platforms:

```sh
npm run generate # NPM

yarn generate # Yarn
```

For Linux:

```sh
npm run generate:linux # NPM

yarn generate:linux # Yarn
```

For Mac:

```sh
npm run generate:mac # NPM

yarn generate:mac # Yarn
```

For Windows:

```sh
npm run generate:windows # NPM

yarn generate:windows # Yarn
```

### Testing

All Tests:

```sh
npm run test # NPM Without watch 

npm run test:watch # NPM With Watch

yarn test # Yarn Without Watch

yarn test:watch # Yarn With Watch
```

Main Process Tests:

```sh
npm run test:main # NPM Without watch

npm run test:main-watch # NPM With Watch

yarn test:main # Yarn Without watch

yarn test:main-watch # Yarn With Watch
```

Renderer Process Tests:

```sh
npm run test:renderer # NPM Without watch

npm run test:renderer-watch # NPM With Watch

yarn test:renderer # Yarn Without watch

yarn test:renderer-watch # Yarn With Watch
```

### Linting

All Files Lint:

```sh
npm run lint # NPM

yarn lint # Yarn
```

Main Process Lint:

```sh
npm run lint:main # NPM

yarn lint:main # Yarn
```

Renderer Process Lint

```sh
npm run lint:renderer # NPM

yarn lint:renderer # Yarn
```

Stylesheets Lint

```sh
npm run lint:styles # NPM

yarn lint:styles # Yarn
```

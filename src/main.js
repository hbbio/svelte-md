import App from "./App.svelte";

// WORKAROUND for immer.js esm (see https://github.com/immerjs/immer/issues/557)
window.process = {
  env: {
    NODE_ENV: "production",
  },
};

const app = new App({
  target: document.body,
  props: {
    name: "world",
  },
});

export default app;

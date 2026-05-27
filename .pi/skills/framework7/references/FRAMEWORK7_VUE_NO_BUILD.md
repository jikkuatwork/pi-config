---
title: Framework7 v9 + Vue 3 No-Build Reference
updated: 2026-05-27
framework7_version: 9.0.4
vue_version_family: 3.x
mode: browser-esm-no-build
provenance:
  - koder/research/002_framework7_docs/gemini.md
  - koder/research/002_framework7_docs/qwen.md
  - koder/research/002_framework7_docs/scrollbar_app_frame.md
---

# Framework7 v9 + Vue 3 No-Build Reference

This is the canonical implementation guide for generating Framework7 mobile-web UIs without a build step. The default output is one or more browser files that run directly from static hosting.

## 0) Hard rules

- No `npm install`, `package.json`, Vite, Webpack, Babel, TypeScript compilation, or `.vue` single-file components.
- Use browser-native ESM with an import map. Do **not** use stale UMD/global examples for Framework7 v9; the published v9 Vue package is ESM.
- Use Vue's full browser ESM build (`vue.esm-browser.prod.js`) so in-DOM and string templates compile in the browser.
- Use explicit closing tags for all Vue/Framework7 custom elements: `<f7-page></f7-page>`, never `<f7-page />`.
- Use kebab-case props/attributes in templates: `back-link`, `strong-ios`, `dividers-ios`, `swipe-to-close`, `clear-button`.
- Use Vue 3 model arguments for Framework7 inputs: `v-model:value` for text inputs, `v-model:checked` for toggles/checkboxes.
- Keep Framework7's router as the app router unless the user explicitly asks for another router.

## 1) HTML shell and exact CDN dependency tags

Use these pinned browser dependencies for a build-free CDN prototype:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/framework7@9.0.4/framework7-bundle.min.css">

<script type="importmap">
{
  "imports": {
    "vue": "https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.prod.js",
    "framework7/lite": "https://cdn.jsdelivr.net/npm/framework7@9.0.4/framework7-lite-bundle.esm.js",
    "framework7/lite-bundle": "https://cdn.jsdelivr.net/npm/framework7@9.0.4/framework7-lite-bundle.esm.js",
    "framework7-vue/bundle": "https://cdn.jsdelivr.net/npm/framework7-vue@9.0.4/framework7-vue-bundle.js"
  }
}
</script>
```

Why this shape:

- `framework7-bundle.min.css` provides the iOS/Material UI styles.
- `vue.esm-browser.prod.js` exposes Vue 3 as a browser ESM module with the template compiler included.
- `framework7-lite-bundle.esm.js` provides the Framework7 core/router bundle in browser ESM form.
- `framework7-vue-bundle.js` exports the Vue integration and all `f7-*` components.

For no-public-CDN or Holm/BFBB apps, vendor the same files locally and rewrite the import map to local paths. Do not introduce a package manager or build step just to obtain these files.

## 2) App initialization blueprint

Framework7 v9 Vue initialization is a two-part registration:

1. Register the Framework7 Vue plugin on the **Framework7 core** with `Framework7.use(Framework7Vue)`.
2. Register `f7-*` Vue components on the **Vue app** with `registerComponents(app)`.

```html
<div id="app">
  <f7-app v-bind="f7params">
    <f7-view main url="/"></f7-view>
  </f7-app>
</div>

<script type="module">
import { createApp, reactive } from 'vue';
import Framework7 from 'framework7/lite-bundle';
import Framework7Vue, { registerComponents } from 'framework7-vue/bundle';

Framework7.use(Framework7Vue);

const HomePage = {
  template: `
    <f7-page name="home">
      <f7-navbar title="Home"></f7-navbar>
      <f7-block strong-ios outline-ios>
        <p>Framework7 Vue is running with no build step.</p>
      </f7-block>
    </f7-page>
  `
};

const routes = [
  { path: '/', component: HomePage }
];

const Root = {
  setup() {
    const f7params = reactive({
      name: 'No-Build Framework7 App',
      theme: 'auto',
      routes
    });
    return { f7params };
  }
};

const app = createApp(Root);
registerComponents(app);
app.mount('#app');
</script>
```

Do not generate `app.use(Framework7Vue, Framework7)` for v9. That pattern is wrong for this package shape.

## 3) Browser template parsing rules

No-build Vue templates are parsed by the browser or by Vue's in-browser compiler. Generate conservative, browser-safe markup everywhere.

### Props and attributes

Use kebab-case in templates, even when the JavaScript prop is camelCase.

```html
<!-- Good -->
<f7-list strong-ios dividers-ios outline-ios></f7-list>
<f7-view main push-state url="/"></f7-view>
<f7-sheet swipe-to-close></f7-sheet>

<!-- Bad -->
<f7-list strongIos dividersIos outlineIos></f7-list>
<f7-view pushState></f7-view>
```

### Closing tags

```html
<!-- Good -->
<f7-navbar title="Settings"></f7-navbar>
<f7-list-input label="Name"></f7-list-input>

<!-- Bad in no-build/browser templates -->
<f7-navbar title="Settings" />
<f7-list-input label="Name" />
```

### `v-model` rules

```html
<f7-list-input
  label="Display Name"
  type="text"
  clear-button
  v-model:value="form.name"
></f7-list-input>

<f7-toggle v-model:checked="form.notifications"></f7-toggle>
<f7-checkbox v-model:checked="form.accepted"></f7-checkbox>
```

### Event names

Framework7 emits colon-namespaced events. Use them directly.

```html
<f7-page @page:init="load"></f7-page>
<f7-popup :opened="popupOpen" @popup:closed="popupOpen = false"></f7-popup>
<f7-sheet :opened="sheetOpen" @sheet:closed="sheetOpen = false"></f7-sheet>
```

## 4) Component syntax guide

### App shell

```html
<f7-app v-bind="f7params">
  <f7-view main url="/"></f7-view>
</f7-app>
```

### Page and navbar

```html
<f7-page name="settings">
  <f7-navbar large transparent>
    <f7-nav-left>
      <f7-nav-back-link text="Back"></f7-nav-back-link>
    </f7-nav-left>
    <f7-nav-title>Settings</f7-nav-title>
    <f7-nav-title-large>Settings</f7-nav-title-large>
    <f7-nav-right>
      <f7-link href="/profile/">Profile</f7-link>
    </f7-nav-right>
  </f7-navbar>

  <f7-block strong-ios outline-ios>
    <p>Page content goes inside an f7-page.</p>
  </f7-block>
</f7-page>
```

### Lists and forms

```html
<f7-block-title>Profile</f7-block-title>
<f7-list strong-ios dividers-ios outline-ios inset-md>
  <f7-list-input
    label="Email"
    floating-label
    type="email"
    placeholder="you@example.com"
    clear-button
    v-model:value="profile.email"
  ></f7-list-input>

  <f7-list-item>
    <span>Enable notifications</span>
    <f7-toggle v-model:checked="profile.notifications"></f7-toggle>
  </f7-list-item>
</f7-list>
```

### State-driven overlays

Do not control overlays with DOM selectors. Bind visibility to Vue state and sync close events.

```html
<f7-button fill @click="sheetOpen = true">Open Actions</f7-button>

<f7-sheet
  :opened="sheetOpen"
  @sheet:closed="sheetOpen = false"
  bottom
  swipe-to-close
>
  <f7-toolbar>
    <div class="left"></div>
    <div class="right"><f7-link sheet-close>Done</f7-link></div>
  </f7-toolbar>
  <f7-page-content>
    <f7-block-title>Actions</f7-block-title>
    <f7-list>
      <f7-list-item title="Archive" link="#" @click="archive"></f7-list-item>
      <f7-list-item title="Share" link="#" @click="share"></f7-list-item>
    </f7-list>
  </f7-page-content>
</f7-sheet>
```

## 5) Multi-page routing without a build step

Define route components as plain JavaScript objects with string templates. Register them in `routes`, then pass `routes` through `f7params`.

```js
import { computed, ref } from 'vue';

const DetailPage = {
  props: {
    f7route: Object,
    f7router: Object
  },
  template: `
    <f7-page name="detail">
      <f7-navbar title="Detail" back-link="Back"></f7-navbar>
      <f7-block strong-ios outline-ios>
        <p>Item ID: {{ itemId }}</p>
        <f7-button fill @click="goHome">Go Home</f7-button>
      </f7-block>
    </f7-page>
  `,
  setup(props) {
    const itemId = computed(() => props.f7route.params.id || 'unknown');
    const goHome = () => props.f7router.navigate('/', {
      clearPreviousHistory: true,
      animate: true
    });
    return { itemId, goHome };
  }
};

const routes = [
  { path: '/', component: HomePage },
  { path: '/detail/:id/', component: DetailPage }
];
```

Use `props.f7route` for params/query and `props.f7router` for `navigate`, `back`, and history control. Do not add Vue Router unless the user explicitly asks.

For dense templates, a DOM `<template id="...">` is acceptable:

```html
<template id="about-page-template">
  <f7-page name="about">
    <f7-navbar title="About" back-link="Back"></f7-navbar>
    <f7-block>About this app.</f7-block>
  </f7-page>
</template>
```

```js
const AboutPage = {
  template: '#about-page-template'
};
```

## 6) Desktop app frame and scrollbar polish

Framework7 is mobile-first. On wide desktop screens, constrain the app into a centered phone-like frame instead of stretching mobile UI across the whole monitor. Also tame Linux/Windows desktop scrollbars without affecting touch devices.

Use this CSS by default for polished prototypes, previews, and Holm/BFBB apps viewed on desktop. Omit or alter it only when the user asks for a full-width tablet/desktop layout.

```css
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  background: #000;
}

#app {
  width: 100%;
  height: 100%;
}

@media (min-width: 768px) {
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: radial-gradient(circle at top left, #e2e8f0, #cbd5e1);
  }

  #app {
    width: 100%;
    max-width: 430px;
    height: 90vh;
    max-height: 880px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 24px;
    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    position: relative;
  }

  .page-content {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.15) transparent;
  }

  .page-content::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .page-content::-webkit-scrollbar-track {
    background: transparent;
  }

  .page-content::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 10px;
  }

  .page-content::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  .dark .page-content,
  .theme-dark .page-content {
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
  }

  .dark .page-content::-webkit-scrollbar-thumb,
  .theme-dark .page-content::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
  }
}
```

Notes:

- The media query preserves full-screen behavior on phones.
- Constraining `#app` keeps Framework7 popups, sheets, and routed pages inside the phone frame.
- `.page-content` is the correct scroll container for Framework7 pages.
- For dark-mode apps, use either `.dark` or Framework7's theme-dark class support consistently.

## 7) Complete copy/pasteable `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="theme-color" content="#ff2d55">
  <meta name="format-detection" content="telephone=no">
  <title>Framework7 Vue No-Build</title>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/framework7@9.0.4/framework7-bundle.min.css">

  <style>
    :root {
      --f7-theme-color: #ff2d55;
      --f7-theme-color-rgb: 255, 45, 85;
      --f7-theme-color-shade: #e6003a;
      --f7-theme-color-tint: #ff5c7e;
    }
    html,
    body {
      width: 100%;
      height: 100%;
      margin: 0;
      background: #000;
    }

    #app {
      width: 100%;
      height: 100%;
    }

    [v-cloak] { display: none; }

    @media (min-width: 768px) {
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: radial-gradient(circle at top left, #e2e8f0, #cbd5e1);
      }

      #app {
        width: 100%;
        max-width: 430px;
        height: 90vh;
        max-height: 880px;
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 24px;
        box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        position: relative;
      }

      .page-content {
        scrollbar-width: thin;
        scrollbar-color: rgba(0, 0, 0, 0.15) transparent;
      }

      .page-content::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      .page-content::-webkit-scrollbar-track {
        background: transparent;
      }

      .page-content::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.15);
        border-radius: 10px;
      }

      .page-content::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.3);
      }

      .dark .page-content,
      .theme-dark .page-content {
        scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
      }

      .dark .page-content::-webkit-scrollbar-thumb,
      .theme-dark .page-content::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
      }
    }
  </style>

  <script type="importmap">
  {
    "imports": {
      "vue": "https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.prod.js",
      "framework7/lite": "https://cdn.jsdelivr.net/npm/framework7@9.0.4/framework7-lite-bundle.esm.js",
      "framework7/lite-bundle": "https://cdn.jsdelivr.net/npm/framework7@9.0.4/framework7-lite-bundle.esm.js",
      "framework7-vue/bundle": "https://cdn.jsdelivr.net/npm/framework7-vue@9.0.4/framework7-vue-bundle.js"
    }
  }
  </script>
</head>
<body>
  <div id="app" v-cloak>
    <f7-app v-bind="f7params">
      <f7-view main url="/"></f7-view>
    </f7-app>
  </div>

  <script type="module">
    import { createApp, computed, reactive, ref } from 'vue';
    import Framework7 from 'framework7/lite-bundle';
    import Framework7Vue, { registerComponents } from 'framework7-vue/bundle';

    Framework7.use(Framework7Vue);

    const DetailPage = {
      props: {
        f7route: Object,
        f7router: Object
      },
      template: `
        <f7-page name="detail">
          <f7-navbar title="Item Detail" back-link="Back"></f7-navbar>
          <f7-block-title>Route Parameters</f7-block-title>
          <f7-block strong-ios outline-ios>
            <p>Viewing item <b>{{ itemId }}</b>.</p>
            <f7-button fill @click="goHome">Return Home</f7-button>
          </f7-block>
        </f7-page>
      `,
      setup(props) {
        const itemId = computed(() => props.f7route.params.id || 'unknown');
        const goHome = () => props.f7router.navigate('/', {
          clearPreviousHistory: true,
          animate: true
        });
        return { itemId, goHome };
      }
    };

    const HomePage = {
      template: `
        <f7-page name="home">
          <f7-navbar large transparent>
            <f7-nav-title>No-Build App</f7-nav-title>
            <f7-nav-title-large>No-Build App</f7-nav-title-large>
          </f7-navbar>

          <f7-block-title>Build-free Framework7 + Vue</f7-block-title>
          <f7-block strong-ios outline-ios>
            <p>This app runs from static browser files: no npm, no bundler, no .vue compilation.</p>
          </f7-block>

          <f7-block-title>Profile Form</f7-block-title>
          <f7-list strong-ios dividers-ios outline-ios inset-md>
            <f7-list-input
              label="Display Name"
              floating-label
              type="text"
              placeholder="Ada Lovelace"
              clear-button
              v-model:value="profile.name"
            ></f7-list-input>

            <f7-list-input
              label="Email"
              floating-label
              type="email"
              placeholder="ada@example.com"
              clear-button
              v-model:value="profile.email"
            ></f7-list-input>

            <f7-list-item>
              <span>Enable notifications</span>
              <f7-toggle v-model:checked="profile.notifications"></f7-toggle>
            </f7-list-item>
          </f7-list>

          <f7-block-title>Actions</f7-block-title>
          <f7-list strong-ios outline-ios dividers-ios inset-md>
            <f7-list-item title="Open action sheet" link="#" @click="sheetOpen = true"></f7-list-item>
            <f7-list-item title="Open popup" link="#" @click="popupOpen = true"></f7-list-item>
            <f7-list-item title="Route to detail/42" link="/detail/42/"></f7-list-item>
          </f7-list>

          <f7-sheet
            :opened="sheetOpen"
            @sheet:closed="sheetOpen = false"
            bottom
            swipe-to-close
          >
            <f7-toolbar>
              <div class="left"></div>
              <div class="right"><f7-link sheet-close>Close</f7-link></div>
            </f7-toolbar>
            <f7-page-content>
              <f7-block-title>Current Form State</f7-block-title>
              <f7-block>
                <p>Name: {{ profile.name || 'unset' }}</p>
                <p>Email: {{ profile.email || 'unset' }}</p>
                <p>Notifications: {{ profile.notifications ? 'on' : 'off' }}</p>
              </f7-block>
            </f7-page-content>
          </f7-sheet>

          <f7-popup
            :opened="popupOpen"
            @popup:closed="popupOpen = false"
            swipe-to-close
          >
            <f7-view>
              <f7-page>
                <f7-navbar title="Popup">
                  <f7-nav-right><f7-link popup-close>Done</f7-link></f7-nav-right>
                </f7-navbar>
                <f7-block strong-ios outline-ios>
                  <p>Popup visibility is controlled by Vue state and synced via @popup:closed.</p>
                </f7-block>
              </f7-page>
            </f7-view>
          </f7-popup>
        </f7-page>
      `,
      setup() {
        const profile = reactive({
          name: '',
          email: '',
          notifications: true
        });
        const sheetOpen = ref(false);
        const popupOpen = ref(false);
        return { profile, sheetOpen, popupOpen };
      }
    };

    const routes = [
      { path: '/', component: HomePage },
      { path: '/detail/:id/', component: DetailPage }
    ];

    const Root = {
      setup() {
        const f7params = reactive({
          name: 'Framework7 Vue No-Build',
          theme: 'auto',
          routes,
          colors: { primary: '#ff2d55' }
        });
        return { f7params };
      }
    };

    const app = createApp(Root);
    registerComponents(app);
    app.mount('#app');
  </script>
</body>
</html>
```

## 8) Generation workflow for agents

When asked to build a Framework7 UI:

1. Confirm whether the target is standalone static files or Holm/BFBB. If Holm/BFBB, read `HOLM_BFBB_ORIENTATION.md`.
2. Generate `index.html` first unless the project already has a clear static layout.
3. Keep state local with Vue `ref`, `reactive`, and `computed` until the app needs backend persistence.
4. Use Framework7 routes for pages and route params.
5. Prefer `f7-list`, `f7-block`, `f7-navbar`, `f7-toolbar`, `f7-sheet`, and `f7-popup` over custom CSS-heavy mobile controls.
6. Add the desktop app-frame/scrollbar polish by default for mobile-width apps that may be viewed on desktop.
7. Smoke-test by opening the file through static hosting or a local file/server path; do not require npm.

## 9) Final checklist

Before saying the app/reference is ready:

- [ ] No npm/package/build/Vite/Webpack/SFC artifacts were added.
- [ ] Dependencies are browser ESM import-map entries or local vendored equivalents.
- [ ] Every custom `f7-*` tag has an explicit closing tag.
- [ ] Template attributes are kebab-case.
- [ ] Text inputs use `v-model:value`; toggles/checkboxes use `v-model:checked`.
- [ ] `Framework7.use(Framework7Vue)`, `registerComponents(app)`, and `theme: 'auto'` are present.
- [ ] Routes are valid and route components are plain JS objects.
- [ ] Overlays are state-driven and sync closed events back to Vue state.
- [ ] Desktop app-frame/scrollbar CSS is present for mobile-width apps, or intentionally omitted for full-width layouts.
- [ ] The deliverable includes a short manual smoke-test checklist.

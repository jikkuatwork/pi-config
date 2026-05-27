FRAMEWORK7_VUE_NO_BUILD.mdArchitectural Directives and Core Operating ConstraintsThe architectural paradigm defined within this technical reference document enforces a rigorous "No-Build" environment leveraging Framework7 (v9) paired with the Vue 3 Global Production Build. This specific paradigm fundamentally rejects the integration of Node Package Manager (NPM), Node.js build pipelines, Vite, Webpack, Babel, or any other compilation toolchain. The application architecture must remain strictly confined to the browser's native runtime environment, relying exclusively on Content Delivery Network (CDN) distributions, Universal Module Definition (UMD) scripts, and global window variables.The mandate for this zero-compilation architecture derives from the necessity for extreme long-term codebase durability, zero-configuration deployment, and the complete elimination of dependency obsolescence risks inherent in deeply nested module ecosystems. By excising the build step entirely, the architecture ensures that the application will execute predictably as long as modern web browsers exist, completely insulated from the rapid deprecation cycles of modern frontend JavaScript tooling.When interacting with this architecture, automated agents must strictly adhere to the following absolute constraints: never generate a package configuration file or suggest module installations; never generate Single-File Components utilizing the .vue extension; never utilize Vue 3 build-time macros such as script setup syntactic sugar. All Vue reactivity must be explicitly extracted from the global Vue object and returned via the standard setup function definition. Furthermore, all syntactical logic must reflect Framework7 version 9 paradigms and Vue 3 Global API specifications. Legacy Framework7 paradigms from earlier major versions are strictly prohibited. This document serves as the absolute ground truth for constructing highly scannable, deeply integrated, and cross-platform morphological mobile web applications.1. HTML Shell & CDN DependenciesThe structural foundation of the application resides entirely within a single index file. The successful deployment of a mobile-first, native-mimicking interface requires the precise configuration of metadata, strict dependency loading sequencing, and the application of edge-to-edge rendering protocols required by iOS and Android environments. Failure to implement the exact meta tag specifications will result in a web application that scales improperly, suffers from double-tap zoom delays, and fails to utilize the physical hardware screen appropriately.Mobile-First Meta Configuration and Safe Area InsetsThe viewport meta tag is the most critical element for mimicking native application behavior. It must explicitly disable user scaling to prevent the browser from zooming in on input focus, which immediately breaks the native interaction illusion. Furthermore, the viewport-fit property is mandatory for extending the application layout into the hardware notch and safe areas of modern mobile devices, ensuring full-screen immersion.The application must declare the capability to run as a standalone web app. This allows users to add the application to their home screen, stripping away the native browser URL bar and navigation controls to provide a pure, immersive native experience. The status bar style must be configured to overlay transparently, allowing Framework7's dynamic CSS variables to pad the application headers underneath the system time and battery indicators.HTML<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="theme-color" content="#000000">
<meta name="format-detection" content="telephone=no">
<meta name="msapplication-tap-highlight" content="no">
Production-Grade CDN Dependency MatrixDependencies must be injected via a reliable delivery network, specifying the exact version 9 constraint for Framework7 to ensure maximum stability and API consistency. The loading sequence within the Document Object Model (DOM) is critical. Cascading Style Sheets (CSS) must load synchronously within the document head to prevent unstyled flashes of content. JavaScript bundles must load sequentially at the termination of the document body, guaranteeing that the DOM elements exist prior to the application initialization script taking control.Dependency ModuleResource TypeGlobal Delivery URL (jsDelivr)Architectural Purpose and MechanismFramework7 Core CSSStylesheethttps://cdn.jsdelivr.net/npm/framework7@9.0.4/framework7-bundle.min.cssProvides the baseline morphological CSS for iOS, Material Design, and custom layouts, including all required font variables and grid definitions.Vue 3 Global BuildScript (Global)https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.jsExposes the global Vue object, including the Composition API components necessary for reactive state management without a bundler.Framework7 Core JSScript (UMD)https://cdn.jsdelivr.net/npm/framework7@9.0.4/framework7-bundle.min.jsExposes the global framework class containing routing engines, device detection heuristics, and core logic algorithms.Framework7-Vue IntegrationScript (UMD)https://cdn.jsdelivr.net/npm/framework7-vue@9.0.4/framework7-vue.bundle.min.jsExposes the integration plugin and the critical component registration utility required for zero-build execution.The Exact HTML Shell LayoutThe document object model must contain a single architectural mount point. The Framework7 Vue implementation requires a specific application root component to act as the primary wrapper. This wrapper accepts the core initialization parameters directly and serves as the boundary for the framework's internal styling resets. Within this root wrapper, the main view component dictates the initial routing context.HTML<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="theme-color" content="#2196f3">
    <title>Framework7 No-Build Architecture</title>
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/framework7@9.0.4/framework7-bundle.min.css">
    
    <style>
        body { background-color: #000000; }
        /* Safe area variable overrides for edge-to-edge support */
        :root {
            --f7-safe-area-top: env(safe-area-inset-top);
            --f7-safe-area-bottom: env(safe-area-inset-bottom);
        }
    </style>
</head>
<body>
    <div id="app">
        <f7-app v-bind="f7params">
            <f7-view main url="/"></f7-view>
        </f7-app>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/framework7@9.0.4/framework7-bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/framework7-vue@9.0.4/framework7-vue.bundle.min.js"></script>
    
    <script src="app.js"></script>
</body>
</html>
The shell architecture presented above establishes the physical boundaries of the application. The application wrapper utilizes a Vue property binding to accept the configuration object defined in the subsequent initialization script. The view component is marked with a primary boolean flag, designating it as the main routing layer for the application's history management.2. App Initialization BlueprintThe initialization sequence within a global script environment fundamentally differs from compiled environments. Because explicit import and export statements cannot be utilized to traverse a local file system or resolve Node modules, all Application Programming Interfaces (APIs) must be manually destructured from the global window object. The bootstrap sequence must precisely orchestrate the creation of the Vue instance, the configuration of the Framework7 engine, and the symbiotic injection of the framework into the Vue context.API Extraction and Global Scope ResolutionThe application execution script must first isolate and map the required functional methods from the global objects injected by the Content Delivery Network scripts. The global Vue object houses the core Composition API elements necessary for state management, while the global integration object houses the plugin infrastructure.From the window-bound Vue object, the application extracts the application creation method alongside reactive state primitives. Simultaneously, the integration bundle exposes the required plugin configuration object and a specialized registration utility. This registration utility is an absolute architectural mandate in modern, uncompiled Framework7-Vue architectures. Without executing this utility against the Vue application instance, the Vue runtime compiler will fail to recognize the proprietary custom elements, resulting in catastrophic rendering failures and silent console warnings regarding unresolved components.Framework7 Parameters ConfigurationThe initialization parameter object acts as the central nervous system for the entire application interface. This object dictates routing arrays, base metadata, component default behaviors, and the overarching thematic logic. The configuration must explicitly enforce an automatic theme detection protocol. This critical setting activates the morphological capability of the framework: the runtime engine will dynamically evaluate the browser's User Agent string. If an Apple device is detected, the framework injects iOS-specific structural classes and Cupertino animations. If a non-Apple device is detected, it falls back to Material Design logic. This ensures the application looks natively appropriate on any hardware without requiring conditional CSS rendering logic from the developer.The JavaScript Bootstrap SequenceThe following code details the precise JavaScript bootstrap sequence required to launch the application. The orchestration requires passing the framework into the Vue application context while simultaneously passing the Vue parameters into the framework's initialization engine.JavaScript// 1. Destructure Vue Composition API from global window object
const { createApp, ref, reactive, onMounted } = Vue;

// 2. Destructure Framework7 Vue plugin utilities from the global bundle
const { registerComponents } = Framework7Vue;

// 3. Define the main application component logic
const AppRoot = {
    setup() {
        // Framework7 explicit initialization parameters
        const f7params = reactive({
            name: 'Production Reference App',
            theme: 'auto', // Enforces OS-specific morphological layout switching
            routes: appRoutes, // Defined in the routing architecture section
            colors: {
                primary: '#FF2D55',
            },
            dialog: {
                title: 'System Alert',
                buttonOk: 'Confirm',
            }
        });

        return { f7params };
    }
};

// 4. Instantiate the Vue application instance
const app = createApp(AppRoot);

// 5. Inject the Framework7 ecosystem into the Vue 3 instance
// This specific syntax binds the integration plugin and the core engine to the app context
app.use(Framework7Vue, Framework7);

// 6. Globally register all Framework7 components (<f7-*> tags)
// This is critical for zero-build environments to map custom tags to Vue objects
registerComponents(app);

// 7. Mount the application to the DOM root element
app.mount('#app');
The injection pattern utilizing the Vue application instance method directly binds the core Framework7 rendering engine to the Vue lifecycle. This guarantees that when a Vue component mounts and requests a Framework7 user interface element, the underlying core engine is readily available to attach the necessary event listeners, touch ripples, and swipe logic to the newly generated physical DOM nodes.3. Strict Browser Template Parsing RulesA fundamental constraint of the strictly "No-Build" architecture is the absence of Vue's advanced Single-File Component compiler. In a traditional workflow, a Node-based compiler intercepts the component files, evaluates the templates, and transforms them into optimized JavaScript render functions before the browser ever sees them. In the architecture defined here, the Vue runtime relies entirely on the native web browser's HTML parser to ingest and read the in-DOM templates. This dynamic introduces several critical, highly explicit parsing differences that an automated coding agent must anticipate and respect to prevent silent rendering failures.The Case Insensitivity Constraint and Kebab-Case MandateHTML attributes, as dictated by the w3c specification, are fundamentally case-insensitive. The browser's internal parser will automatically convert any camelCase attribute into a strictly lowercase representation before the Vue runtime can even begin to process the template. Because Vue components define their internal property bindings using camelCase JavaScript syntax, the template must strictly utilize kebab-case equivalent attributes to maintain correct property mapping.If an agent attempts to pass a boolean property using camelCase syntax, the browser will flatten it. The Vue component, expecting the camelCase variant, will read the property as undefined, failing to trigger the required behavioral change.Compilation ParadigmStandard SFC SyntaxStrict Browser DOM MandateArchitectural ConsequenceiOS Specific Styling<f7-list dividersIos><f7-list dividers-ios>The browser flattens dividersIos to dividersios. Kebab-case translates correctly back to camelCase during Vue's prop resolution phase.State Management<f7-view pushState><f7-view push-state>Navigation history will fail to record if the push state property is not provided in strictly hyphenated syntax.Event Listeners@pageInit="..."@page:init="..."Framework7 relies heavily on colon-separated event namespaces to bypass browser attribute flattening logic.The Prohibition of Self-Closing Custom TagsThe browser's native HTML parser does not recognize self-closing syntax for non-void custom elements. Standard void elements like images or inputs can be self-closed, but custom Vue elements cannot. While Webpack or Vite environments aggressively compile <f7-page /> into valid render functions, an in-DOM template parsed natively by the browser will misinterpret this. The browser will often ingest all subsequent sibling elements and nest them improperly inside the unclosed tag, leading to severe, deeply nested layout cascading errors that are incredibly difficult to debug via standard inspection tools.Every single custom Framework7 component must utilize a fully explicit closing tag, regardless of whether it contains interior slots or child content.Invalid Parsing Architecture: <f7-navbar title="Application Header" />Mandatory Parsing Architecture: <f7-navbar title="Application Header"></f7-navbar>Vue 3 Two-Way Binding Paradigm ShiftsWith the migration to Vue 3, the default two-way binding mechanisms shifted significantly. When managing state for complex custom interface components like toggles, checkboxes, and radio buttons, the underlying property bound to the value changes depending on the specific component's internal architecture. For boolean states manipulated within the DOM, developers and automated agents must be highly explicit with the reactive model target to ensure two-way state synchronization functions without errors.The explicit naming of the model prevents ambiguity when the browser passes the event back to the Vue reactivity core. Instead of relying on a default value property, the application specifies exactly which internal component property should be kept in sync with the reactive reference.Text and Data Inputs: Must explicitly target the value parameter via v-model:value="state.text".Toggle Switch Elements: Must explicitly target the checked parameter via v-model:checked="state.isToggled".Checkbox Selection Elements: Must explicitly target the checked parameter via v-model:checked="state.isChecked".Failure to apply these specific binding suffixes will result in interfaces that visually update upon user interaction but fail to mutate the underlying JavaScript reactive state object, breaking data submission logic entirely.4. Component Library Syntax GuideThe Framework7 UI component library provides an exhaustive set of morphological elements optimized for touch-based interactions. Within the strict boundaries of this uncompiled architecture, elements must be structured utilizing precise, hierarchical DOM layouts. The following documentation outlines the absolute correct structural layouts for standard application patterns.App Shell and View HierarchiesEvery Framework7 application relies on an unforgiving structural hierarchy to manage page transitions, native swipe-to-go-back gestures on iOS devices, and routing isolation between different tabs or sections. The view component operates as the independent router container, while the page component represents the individual scrollable screens. Everything visual must exist within a page block.HTML<f7-view main>
    <f7-page name="home">
        <f7-navbar title="Home Dashboard"></f7-navbar>
        
        <f7-block strong>
            <p>Welcome to the uncompiled application shell.</p>
        </f7-block>
    </f7-page>
</f7-view>
Layout Headers and Dynamic Navigation BarsThe navigation bar requires highly specific structural considerations to ensure cross-platform morphological integrity. On Apple devices, navbars dynamically shift their text to the absolute center and support large scrolling titles that collapse into the standard header as the user scrolls down the page content. On Material Design configurations for Android, navbars align firmly to the left edge and omit the collapsing behavior. The framework manages this complex CSS transformation automatically, provided the correct semantic tags are deployed.HTML<f7-navbar large transparent>
    <f7-nav-left>
        <f7-nav-back-link text="Back"></f7-nav-back-link>
    </f7-nav-left>
    
    <f7-nav-title>Application Configuration</f7-nav-title>
    
    <f7-nav-title-large>Application Configuration</f7-nav-title-large>
    
    <f7-nav-right>
        <f7-link icon-f7="person_circle" href="/profile/"></f7-link>
    </f7-nav-right>
</f7-navbar>
Lists, Forms, and Input GroupingsMobile application interfaces rely heavily on the list component for both standard data display and cohesive form element groupings. Lists automatically handle platform-specific hairline borders, safe-area padding adjustments, and touch-ripple interaction effects. When building forms, inputs should utilize floating labels to maximize screen real estate and deliver an optimal mobile user experience.Architectural insight regarding platform-specific attributes: The -ios and -md suffixes appended to list properties represent an advanced styling capability of the Framework7 version 9 engine. These boolean attributes force the list to adopt a specific visual style—such as outlined borders or inset floating cards—exclusively when the application detects it is running under that specific operating system's theme. This preserves a flat, full-width edge-to-edge aesthetic when rendering on Android while delivering the modern, inset card look required by contemporary iOS design guidelines.HTML<f7-list strong-ios dividers-ios outline-ios>
    
    <f7-list-input
        label="Account Email"
        floating-label
        type="email"
        placeholder="Enter your email address"
        clear-button
        v-model:value="authenticationState.email"
    ></f7-list-input>

    <f7-list-input
        label="Access Credential"
        floating-label
        type="password"
        placeholder="Enter your secure password"
        clear-button
        v-model:value="authenticationState.password"
    ></f7-list-input>

    <f7-list-item>
        <span>Enable Biometric Authentication</span>
        <f7-toggle v-model:checked="authenticationState.biometrics"></f7-toggle>
    </f7-list-item>
    
</f7-list>
Overlay Management: Modals, Popups, and Action SheetsOverlays in standard web applications are traditionally controlled via global document selectors or heavy state management libraries. In earlier iterations of this framework, triggering an action sheet required attaching a selector ID to a button. However, in a robust, state-driven Vue 3 architecture, all overlays must be controlled entirely through reactive boolean references linked to the specific opened property on the overlay component. This enables programmatic lifecycle control and complete state determinism.Action sheets slide up from the bottom of the viewport, popups cover the entire screen for complex secondary flows, and dialogs overlay small interactive prompts. All of these operate on the same reactivity principles.HTML<f7-button fill @click="actionState.sheetVisible = true" color="blue">
    Deploy Action Sheet
</f7-button>

<f7-sheet
    class="deployment-sheet"
    :opened="actionState.sheetVisible"
    @sheet:closed="actionState.sheetVisible = false"
    bottom
    swipe-to-close
>
    <f7-toolbar>
        <div class="left"></div>
        <div class="right">
            <f7-link sheet-close>Cancel</f7-link>
        </div>
    </f7-toolbar>
    
    <f7-page-content>
        <f7-block-title>Select Deployment Target</f7-block-title>
        <f7-list>
            <f7-list-item title="Production Environment" link="#"></f7-list-item>
            <f7-list-item title="Staging Environment" link="#"></f7-list-item>
        </f7-list>
    </f7-page-content>
</f7-sheet>
The implementation noted above demonstrates absolute two-way event synchronization. The reactive variable dictates the physical visibility of the DOM node. However, when the user utilizes a native mobile gesture—such as swiping the sheet downward to dismiss it via the swipe-to-close property—the underlying framework engine handles the physical animation and immediately emits the closed event. The Vue application logic must actively listen for this specific event to reset the reactive boolean reference back to false. Without this synchronization, the Vue state and the physical DOM state will fracture, requiring an application reload to resolve the conflicting visibility parameters.5. Multi-Page Routing Without a Build StepFramework7 encompasses a highly sophisticated, proprietary router engineered specifically for mobile application page transitions. This routing engine handles the complex mathematics of sliding pages across the horizontal axis, managing deep back-stacks, and caching previously visited views in the DOM to eliminate rendering lag upon backward navigation. Integrating this proprietary router with the Vue 3 reactivity system within a pure no-build paradigm demands absolute adherence to specific structural routing patterns.Defining Routes with Inline JavaScript Component DefinitionsIn a standard Node-based development pipeline, routing arrays point directly to imported Single-File Component files containing pre-compiled render functions. Because this reference architecture relies purely on global scripts delivered via a CDN, page components must be formulated as standard JavaScript objects housing string templates, or referencing in-DOM template elements.For most single-file architectures, utilizing template strings enclosed in JavaScript backticks constitutes the most manageable and scannable mechanism. This approach keeps the visual structure and the reactive logic tightly coupled within the same object declaration.JavaScript// Component logic encapsulated in a single JavaScript object
const DashboardPage = {
    // The template is defined via a multiline JavaScript string
    // The browser's HTML parser will evaluate this string when the route is requested
    template: `
        <f7-page name="dashboard">
            <f7-navbar title="Command Dashboard" back-link="Back"></f7-navbar>
            <f7-block strong-ios outline-ios>
                <p>The routing engine handles transition animations automatically.</p>
                <p>Uptime: {{ uptimeMetric }} seconds</p>
                
                <f7-button fill @click="triggerDiagnostic">Run Diagnostics</f7-button>
            </f7-block>
        </f7-page>
    `,
    setup() {
        // Vue 3 Composition API state declaration
        const uptimeMetric = ref(0);
        
        // Interval logic tied to the component lifecycle
        let timer;
        onMounted(() => {
            timer = setInterval(() => {
                uptimeMetric.value++;
            }, 1000);
        });

        const triggerDiagnostic = () => {
            console.log("Diagnostic sequence initiated.");
        };

        return { uptimeMetric, triggerDiagnostic };
    }
};
Alternatively, for incredibly dense templates that exceed the practical limits of string manipulation, the architecture permits utilizing script tags with a defined text/template type or standard HTML <template> elements. The component definition then references this external template via an element selector.HTML<template id="settings-page-template">
    <f7-page name="settings">
        <f7-navbar title="System Settings"></f7-navbar>
        <f7-block>
            <p>Settings interface populated via DOM template extraction.</p>
        </f7-block>
    </f7-page>
</template>

<script>
// The component definition points to the isolated template identifier
const SettingsPage = {
    template: '#settings-page-template',
    setup() {
        return {};
    }
};
</script>
Once the component objects are defined in memory, they must be registered within the central routing array. This array is passed into the initial framework configuration object during the bootstrap sequence.JavaScript// The unified routing array resolving paths to component objects
const appRoutes =;
Accessing Router Context ProgrammaticallyWhen dynamic components need to interact heavily with the routing engine—such as forcing an authenticated redirect, fetching URL query parameters, or reading dynamic route variables—they must access the active router instance. In earlier iterations of the Framework7 Vue integration, developers relied on globally injected prototype extensions like the $f7route and $f7router variables.In Vue 3 and Framework7 version 9, these prototype extensions have been completely expunged from the architecture. To maintain strict reactivity and predictable data flow, components loaded dynamically by the routing engine now automatically receive the current route and router objects as standard Vue properties. Consequently, to access routing details programmatically inside the Composition API setup function, the component must explicitly declare these properties.Routing PropertyData TypeImplementation Context and Purposef7routeObjectHouses static information regarding the active route, including the raw url, the defined path, the parsed query object, and any dynamic params extracted from the URL structure.f7routerObjectThe active instance controller. Provides executable methods such as navigate(), back(), and refreshPage(). Used to command the framework to perform transitions programmatically.The following implementation details exactly how an AI agent should configure a component to intercept these routing properties, read dynamic parameters, and trigger programmatic navigation.JavaScriptconst UserProfilePage = {
    // The component explicitly declares the properties injected by the F7 routing engine
    props: {
        f7route: Object,
        f7router: Object
    },
    template: `
        <f7-page name="profile">
            <f7-navbar title="User Profile" back-link></f7-navbar>
            <f7-block strong>
                <p>Viewing secure profile details for User ID: {{ extractedUserId }}</p>
                <f7-button fill @click="forceTermination">Terminate Session and Return</f7-button>
            </f7-block>
        </f7-page>
    `,
    setup(props) {
        // Extract route parameters injected from a path such as '/profile/:userId/'
        // A computed property ensures that if the route updates, the variable updates reactively
        const extractedUserId = Vue.computed(() => props.f7route.params.userId);

        // Utilize the explicit router instance for programmatic navigation
        const forceTermination = () => {
            props.f7router.navigate('/dashboard/', {
                clearPreviousHistory: true, // Annihilates the cached DOM history for security
                animate: true,              // Enforces the sliding transition
                force: true                 // Bypasses any cached states
            });
        };

        return { extractedUserId, forceTermination };
    }
};
The programmatic manipulation of the routing engine allows developers to implement complex navigation flows without requiring a dedicated third-party library like Vue Router. Framework7’s proprietary router is custom-built to handle DOM caching on mobile devices. Activating the clearPreviousHistory flag physically destroys the underlying Document Object Model nodes of previously visited pages. This is an essential architectural mechanism for managing volatile memory constraints within a single-page mobile web application, particularly when dealing with long lists or heavily graphical interfaces.6. Complete, Self-Contained Master BoilerplateTo consolidate the exhaustive directives outlined above, the following is a complete, copy-pasteable, production-ready index.html file. This ground-truth example embodies every immutable rule required for the No-Build architecture: rigorous CDN dependency extraction, strict template parsing compliance, reactive overlay state management, dynamic form bindings, and multi-page routing via JavaScript string components.HTML<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="theme-color" content="#FF2D55">
    <title>Framework7 Vue 3 Architecture</title>
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/framework7@9.0.4/framework7-bundle.min.css">
    
    <style>
        /* Environmental overrides ensure safe area consistency across all hardware variants */
        body { background-color: #000000; }
        :root {
            --f7-theme-color: #FF2D55;
            --f7-theme-color-rgb: 255, 45, 85;
            --f7-theme-color-shade: #ff0031;
            --f7-theme-color-tint: #ff5a79;
        }
    </style>
</head>
<body>
    
    <div id="app">
        <f7-app v-bind="f7params">
            <f7-view main url="/"></f7-view>
        </f7-app>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js"></script>
    
    <script src="https://cdn.jsdelivr.net/npm/framework7@9.0.4/framework7-bundle.min.js"></script>
    
    <script src="https://cdn.jsdelivr.net/npm/framework7-vue@9.0.4/framework7-vue.bundle.min.js"></script>

    <script>
        // Destructure Vue 3 Global Methods into local scope
        const { createApp, ref, reactive, computed, onMounted } = Vue;
        
        // Destructure Framework7 Vue Registration Utility
        const { registerComponents } = Framework7Vue;

        // --- SECONDARY PAGE COMPONENT: CONFIGURATION ROUTE ---
        const ConfigurationPage = {
            props: {
                f7route: Object,
                f7router: Object
            },
            template: `
                <f7-page name="configuration">
                    <f7-navbar title="System Configuration" back-link="Back"></f7-navbar>
                    
                    <f7-block-title>Global Application Parameters</f7-block-title>
                    
                    <f7-list strong-ios dividers-ios outline-ios inset-md>
                        
                        <f7-list-input
                            label="Administrator Alias"
                            floating-label
                            type="text"
                            placeholder="Assign identifier"
                            clear-button
                            v-model:value="configState.alias"
                        ></f7-list-input>

                        <f7-list-item>
                            <span>Enable Telemetry Tracking</span>
                            <f7-toggle v-model:checked="configState.telemetry"></f7-toggle>
                        </f7-list-item>
                        
                        <f7-list-item>
                            <span>Force Dark Mode Interface</span>
                            <f7-toggle v-model:checked="configState.darkMode" @change="toggleThemeExecution"></f7-toggle>
                        </f7-list-item>
                    </f7-list>
                    
                    <f7-block>
                        <f7-button fill color="red" @click="executeFactoryReset">Initiate Factory Reset</f7-button>
                    </f7-block>
                </f7-page>
            `,
            setup(props) {
                // Centralized reactive state object
                const configState = reactive({
                    alias: '',
                    telemetry: true,
                    darkMode: false
                });

                // Direct interaction with the browser DOM to manipulate F7 theme variables
                const toggleThemeExecution = () => {
                    const documentElement = document.querySelector('html');
                    if(configState.darkMode) {
                        documentElement.classList.add('dark');
                    } else {
                        documentElement.classList.remove('dark');
                    }
                };

                // Interaction with the globally registered F7 Dialog system
                const executeFactoryReset = () => {
                    window.Framework7.instance.dialog.confirm(
                        'This action will purge all internal metrics. Proceed?', 
                        'Critical Warning',
                        () => {
                            configState.alias = '';
                            configState.telemetry = false;
                            configState.darkMode = false;
                            toggleThemeExecution();
                            
                            // Programmatic navigation return utilizing injected router
                            props.f7router.back();
                        }
                    );
                };

                return { configState, toggleThemeExecution, executeFactoryReset };
            }
        };

        // --- PRIMARY PAGE COMPONENT: DASHBOARD ROUTE ---
        const DashboardPage = {
            template: `
                <f7-page name="dashboard">
                    <f7-navbar large transparent>
                        <f7-nav-title>Main Terminal</f7-nav-title>
                        <f7-nav-title-large>Main Terminal</f7-nav-title-large>
                        <f7-nav-right>
                            <f7-link icon-f7="gear_alt_fill" href="/configuration/"></f7-link>
                        </f7-nav-right>
                    </f7-navbar>

                    <f7-block-title>System Telemetry</f7-block-title>
                    <f7-block strong>
                        <p>No-Build architectural prototype successfully initialized. All visual components are executing directly from CDN distributions without pre-compilation.</p>
                    </f7-block>

                    <f7-block-title>Interactive Overlay Management</f7-block-title>
                    <f7-list strong-ios outline-ios dividers-ios inset-md>
                        <f7-list-item title="Inspect Framework Metrics" link="#" @click="metricsPopupActive = true"></f7-list-item>
                    </f7-list>

                    <f7-popup 
                        :opened="metricsPopupActive" 
                        @popup:closed="metricsPopupActive = false"
                        swipe-to-close
                    >
                        <f7-view>
                            <f7-page>
                                <f7-navbar title="Diagnostic Metrics">
                                    <f7-nav-right>
                                        <f7-link popup-close>Dismiss</f7-link>
                                    </f7-nav-right>
                                </f7-navbar>
                                <f7-block>
                                    <p>This overlay is strictly managed by a Vue 3 reactive boolean state architecture. Modifying the reference orchestrates the Framework7 DOM transition natively.</p>
                                    <f7-button fill popup-close color="blue">Acknowledge</f7-button>
                                </f7-block>
                            </f7-page>
                        </f7-view>
                    </f7-popup>
                </f7-page>
            `,
            setup() {
                // Boolean state controlling the visibility of the popup overlay
                const metricsPopupActive = ref(false);
                return { metricsPopupActive };
            }
        };

        // --- ARCHITECTURAL ROUTING DEFINITION ---
        const appRoutes =;

        // --- VUE APPLICATION INITIALIZATION SEQUENCE ---
        const AppRoot = {
            setup() {
                // Central configuration injected into the f7-app wrapper
                const f7params = reactive({
                    name: 'Enterprise Shell',
                    theme: 'auto', // Enforce native morphological mimicry based on User Agent
                    routes: appRoutes,
                    dialog: {
                        buttonOk: 'Confirm',
                        buttonCancel: 'Cancel'
                    }
                });
                return { f7params };
            }
        };

        // Create the core Vue application instance
        const app = createApp(AppRoot);

        // Inject the Framework7 ecosystem and rendering engine into the Vue context
        app.use(Framework7Vue, Framework7);

        // Globally map all <f7-*> component tags into the active Vue application context
        // This is the absolute requirement for uncompiled template parsing
        registerComponents(app);

        // Mount the application to the physical Document Object Model
        app.mount('#app');
    </script>
</body>
</html>
The strict architectural paradigm outlined throughout this document yields several profound operational advantages. By entirely excising the Node-based compilation pipeline, the development ecosystem becomes inherently immunized against package depreciation, versioning conflicts, and vulnerable dependency chains. The codebase operates directly with the browser's execution engine, ensuring a highly transparent, immediately testable, and fundamentally resilient source file.Achieving exact parity with a heavily compiled ecosystem demands absolute, unwavering discipline regarding browser HTML parsing rules, case sensitivity, and Vue 3 Global API integrations. The deployment of the component registration utility operates as the definitive linchpin in this architecture, effectively bridging the structural gap between Framework7's advanced morphological User Interface system and Vue's reactivity core within a zero-configuration environment. When this precise pattern is rigidly adhered to, it facilitates the rapid, highly sustainable production of mobile-first web applications that remain practically indistinguishable from natively compiled applications in both their visual presentation and interaction design.
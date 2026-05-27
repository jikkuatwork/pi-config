Desktop browsers on Linux and Windows are notorious for rendering bulky, aggressive system scrollbars that completely ruin a sleek, mobile-first design. Since you are targeting desktop screens with constrained widths, you can fix both issues simultaneously with a few lines of clever CSS.

Because Framework7 encapsulates its entire DOM structure inside the element you define (like `#app`), you can easily control both the scrollbar and the desktop layout without breaking the mobile behavior.

---

## 1. Fixing the Lame Desktop Scrollbar

Framework7 wraps scrollable areas inside the `.page-content` class. You can override the default system scrollbars using a combination of modern standard CSS and WebKit pseudo-elements, wrapping them in a media query so mobile touchscreens are unaffected.

Add this to your `<style>` block:

```css
/* Target only desktop screens */
@media (min-width: 768px) {
  /* Chromium-based browsers (Chrome, Edge, Brave, Opera) & Safari */
  .page-content::-webkit-scrollbar {
    width: 6px;  /* Make it ultra-thin */
    height: 6px;
  }
  
  .page-content::-webkit-scrollbar-track {
    background: transparent; /* No ugly background track */
  }
  
  .page-content::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15); /* Translucent thumb */
    border-radius: 10px;
  }

  .page-content::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3); /* Slightly darker on hover */
  }

  /* Modern Firefox styling */
  .page-content {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.15) transparent;
  }
  
  /* Dark mode support adjustments if using .dark class */
  .dark .page-content::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
  }
  .dark .page-content {
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
  }
}

```

---

## 2. Auto Width-Constraining (The "App Frame" Effect)

When a mobile UI stretches across a 1920px desktop screen, it looks awkward. The best mitigation strategy is to gracefully transform the app into a floating "phone chassis" centered on the screen whenever it's loaded on a desktop environment.

Because Framework7 injects popups, modals, and actions sheets directly into your `#app` container, constraining `#app` guarantees your modals won't awkwardly fly out to the edges of the monitor.

Add this layout constraint to your CSS:

```css
/* Reset body to allow a nice desktop backdrop */
html, body {
  background: #f0f2f5; /* A neutral gray canvas for desktop */
}

/* Default mobile behavior (Full Screen) */
#app {
  width: 100%;
  height: 100%;
}

/* Desktop Auto-Constraining Transformation */
@media (min-width: 768px) {
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: radial-gradient(circle at top left, #e2e8f0, #cbd5e1); /* Sleek backdrop */
  }

  #app {
    /* Standard mobile portrait boundaries */
    max-width: 430px; 
    max-height: 880px;
    height: 90vh; /* Scales elegantly on shorter laptop screens */
    
    /* Device mimicry */
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 24px; 
    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.2);
    
    /* Crucial: Keeps rounded corners clean and contains absolute elements */
    overflow: hidden; 
    position: relative; 
  }
}

```

---

## How It Looks Integrated Together

When you throw these snippets into your `<style>` tag, your application instantly adapts:

* **On Mobile:** It opens borderless, filling 100% of the display with native iOS/Android momentum scrolling.
* **On Linux/Windows Desktop:** It smoothly shrinks into a beautifully centered canvas, floating over a subtle gradient background with a custom, sleek, 6px scrollbar that mirrors an authentic native device behavior.
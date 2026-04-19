/**
 * Devlog entries data.
 *
 * Each entry is a plain object with the shape:
 *   {
 *     id:      number            – unique, used as React key
 *     slug:    string            – URL-safe identifier, used in /devlog/:slug
 *     date:    string            – display date (any format)
 *     title:   string            – card + page heading
 *     excerpt: string            – short summary shown on the card
 *     tags:    string[]          – category pills
 *     status:  "draft"|"done"    – controls the draft badge
 *     content: Section[]|null    – full body rendered on the entry page
 *   }
 *
 * A Section is: { heading?: string, text: string, image?: string }
 *   - If `heading` is provided it renders as an h3 before the paragraph.
 *   - `text` is rendered as one or more <p> tags (split on double-newline).
 *   - `image` is an optional path to an image in public/devlog/ (e.g. "/devlog/cursor-demo.png").
 *
 * Images:
 *   Drop image files into public/devlog/ and reference them as absolute
 *   paths (e.g. "/devlog/my-screenshot.png"). No imports needed.
 *
 * To add a new entry, append an object to the array below.
 * The Devlog page imports this file and maps over it — no other wiring needed.
 */

const entries = [
  {
    id: 1,
    slug: "the-cursor-conundrum",
    date: "2026-04-19",
    title: "The Cursor Conundrum",
    excerpt:
    "How I recreated the selection highlight using nothing but CSS clip-path polygons and random number generation. Where it all started.",
    tags: ["CSS", "clip-path", "animation"],
    status: "draft",
    content: [
      {
        heading: "The original cursor",
        text: `If you've played Vice City, you know the menu cursor isn't a clean rectangle. It's a green, slightly skewed, trapezoidal highlight that changes shape every time you move between options. It looks hand-drawn. It is never the same twice, and is unpredictable.

In this entry, I discuss my journey recreating this effect in CSS and the failed experiments along the way.`,
      },
      {
        heading: "Random clip-path polygons",
        text: `To start off, the CSS property \`clip-path: polygon()\` was used. A four-point polygon where each corner is randomly offset from the "ideal" rectangle corner by a configurable percentage — the \`clipFactor\`. Higher factor = more jagged and extreme incisions. Lower = closer to a clean box.\n\n
        
        Every time the cursor moves to a new option, \`generateRandomClipPath()\` produces a fresh polygon. The cursor never looks the same twice, which matches the original behavior exactly. Hoverable elements have an \`onMouseEnter\` handler that sends a reference to themselves or a specific target element and their given \`cursorFactors\` to \`useGlobalEvents()\`, which first verifies which element exactly needs to be highlighted, then sends its bounding box and the factors to Redux, which updates the cursor's clip-path and position in real time.\n\n
        
        The original prototype of the whole project had just a few divs representing buttons and the background pattern was unclipped. Of course, it all started with attaching a simple green background to each button that is rendered when it knows that its highlighted. Then came the attempt to recreate the jitter by adding a random clip-path with hardcoded seed values. As expected, the button text got cut off, so the div had to be oversized enough so that no matter how it was clipped, the text would still be fully visible.
        \n\n
        But, this was not good enough. The original game had more "confident" shapes that would simply cause text to be cut off with that implementation, which led to an attempt to create a \`absolute\` div sitting behind the button's text, but this left us with two obstacles to tackle: the cursor shape on each button AND the smooth moving animation between buttons.`,
      },
      {
        heading: "Cursor factors",
        text: `Position alone wasn't enough. The PS2 cursor doesn't sit perfectly centered on the menu item — it's always slightly off, like the highlight was placed by hand. The jagedness of the shape also varies. Even if I peeked at the original game's code, it still wouldn't be reliable due to web elements having different bounding boxes, sometimes not simple to adjust.

To recreate this, the cursor's top, left, width, and height are each multiplied by a small random jitter factor when a new item is hovered. Different menus provide different factor ranges: the main menu buttons use wide, loose factors; the map legend and load menu buttons uses tighter ones. Rough estimates were made via trial and error using the original game menu as reference.`,
      },
      {
        heading: "Moving animation",
        text: `The original cursor isn't just a static shape — it smoothly transitions between options, which looks like seamlessly morphing polygons. My implementation would not cut it.

Intuitively, you can tell that the cursor is definitely an independent element, which means it has to be a global fixed div that moves around and changes shape based on the hovered item. The animation is achieved with a CSS transition on the \`clip-path\`, \`top\`, \`left\`, \`width\`, and \`height\` properties. When a new item is hovered, the cursor's position and clip-path are updated in Redux, which triggers the CSS transition to animate the change. The result is a smooth morphing effect that closely matches the original game's cursor behavior.

Happy ending? Not quite. Several more troubles were encountered, mainly having to do with stacking order and z-index issues, which were solved by several restructurings of the DOM and CSS layers, which I will be documenting in a future entry about the overall architecture of the project.`,
      },
    ],
  },
];

export default entries;

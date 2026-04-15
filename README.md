<div align="center">

# Vice City PS2 Frontend: React Recreation

*"Welcome to the 80s."*

A pixel-faithful recreation of the GTA: Vice City PS2 pause menu -- 
built from scratch with React and Redux, down to the fonts, the sounds, and the tiniest details,
by yours truly, <strong><span style="color:#198246">xKimozZ (Karim Ayman)</span></strong>.

[![React](https://img.shields.io/badge/React-18.3.1-ff95df?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.2.7-1b5982?style=flat-square&logo=redux&logoColor=white)](https://redux-toolkit.js.org)
[![React Router](https://img.shields.io/badge/React_Router-7.1.3-61c2f7?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![use-sound](https://img.shields.io/badge/use--sound-4.0.4-198246?style=flat-square&logoColor=white)](https://github.com/joshwcomeau/use-sound)
[![Status](https://img.shields.io/badge/status-pre--alpha-ff95df?style=flat-square)]()

</div>

---

## <span style="color:#ff95df">About</span>

Born from nostalgia and a desire to challenge myself, this is an opportunity to study the original menu's behavior and aesthetics down to the tiniest detail, and recreate it as closely as the web allows. This wasn't just programming menu logic, but using creative CSS and JS tricks to maneuver around the limitations of browsers to bring a feature to life on par with the original, spending hours exploring every use case, and remastering the original assets. I can guarantee that if you test this recreation and the original game's menu side-by-side, you will find that at least 95% of the behaviors are identical.

For instance, the green trapezoidal cursor alone is its own system. It generates a randomized `clip-path` polygon on each hover -- slightly jittering corners bounded within a configurable clip percentage -- which is how the original game's highlight on options is not deterministic. The keyboard navigation is equally specific: the Load screen has two independent navigation phases (New Game / slot selection), the Stats screen has a held-key scroll with translation animation, and the Display screen lets you nudge screen position one unit at a time, just like calibrating an old CRT. None of that was strictly necessary to make something that "looks like" Vice City, but that's exactly why it's there.

---

## <span style="color:#61c2f7">Getting Started</span>

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). Desktop only -- a warning is shown on mobile viewports.

---

## <span style="color:#61c2f7">Available Scripts</span>

| Command | Description |
|---|---|
| `npm start` | Development mode with hot reload |
| `npm test` | Jest test runner in watch mode |
| `npm run build` | Optimized production build to `build/` |
| `npm run eject` | Ejects from CRA -- irreversible |

---

<details>
<summary><strong><span style="color:#ff95df">Project Structure</span></strong></summary>

```
src/
|-- assets/          # Fonts, images, sounds, global CSS variables
|-- components/
|   |-- Frontend/    # Root layout + landscape orchestrator
|   |-- MenuComponents/
|   |   |-- AudioMenu/     # (coming soon)
|   |   |-- BriefMenu/     # Mission briefing narrative
|   |   |-- ControlsMenu/  # Control configuration
|   |   |-- DisplayMenu/   # Brightness, widescreen, HUD, screen position
|   |   |-- LanguageMenu/  # EN / FR / DE / IT / ES
|   |   |-- LoadMenu/      # New Game + 8 save slots (two-phase nav)
|   |   |-- MapMenu/       # (in progress)
|   |   `-- StatsMenu/     # 50+ scrollable game stats
|   |-- Button/      # Reusable button with hover effects
|   |-- Cursor/      # Procedurally clipped custom cursor
|   `-- ...
|-- constants/
|   `-- lang/        # en / fr / de / it / es
|-- context/         # EventHandlerContext / ReduxAbstractorContext
|-- hooks/           # useEventHandler / useKeyNavigation / useSoundManager
|   `-- events/      # Per-menu event hooks
|-- store/           # Redux slices
`-- utils/           # Key navigation logic, math helpers
```

</details>

<details>
<summary><strong><span style="color:#ff95df">Architecture</span></strong></summary>

### State Management

Four Redux slices power the whole app:

| Slice | Responsibility |
|---|---|
| `navigationSlice` | Active button group, hovered option, key press state |
| `miscSlice` | Game settings (display, controls) + scroll animation offset |
| `cursorSlice` | Cursor position, clip-path polygon, randomization factors |
| `localizationSlice` | Current language + all translated strings |

Components reach Redux through `ReduxAbstractorContext`, which wraps every selector and dispatcher for readability -- no prop drilling, no direct store imports in UI code.

### Navigation Model

Navigation is entirely state-driven. Button groups determine which menu is active:

`MAIN` > `MAP` / `BRIEF` / `LOAD` / `STATS` / `CONTROLS` / `AUDIO` / `DISPLAY` / `LANGUAGE`

### Input Handling

`useKeyNavigation` manages debounced arrow key, Enter, and Escape events. `useEventHandler` routes them to per-menu hooks (`useMainEvents`, `useStatsEvents`, `useLoadEvents`, etc.), each with its own navigation rules.

### Cursor System

On every hover, `generateRandomClipPath` produces a quadrilateral `polygon()` with corners randomized within a configurable boundary -- replicating the subtle jitter of the original game's selection highlight.

### Localization

All strings live in `constants/lang/`. The `localizationSlice` holds the active set and re-supplies components on language change. Five languages supported out of the box.

</details>

---

## <span style="color:#198246">Current Status</span>

| Menu | Status |
|---|---|
| Main, Brief, Load, Stats, Controls, Display, Language | Feature-complete |
| Map | In progress |
| Audio | Coming soon -- last feature before Alpha |

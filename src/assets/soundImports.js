import hover from "./sounds/hover.mp3"
import select from "./sounds/select.mp3"
import back from "./sounds/back.mp3"
import error from "./sounds/error.mp3"
import info from "./sounds/info.mp3"

import flash from "./music/flash.opus"
import kchat from "./music/kchat.opus"
import fever from "./music/fever.opus"
import vrock from "./music/vrock.opus"
import vcpr from "./music/vcpr.opus"
import espantoso from "./music/espantoso.opus"
import emotion from "./music/emotion.opus"
import wave from "./music/wave.opus"
import wildstyle from "./music/wild.opus"

export const soundImports = {
  menuSounds: {
    hover,
    select,
    back,
    error,
    info,
  },
  // Indexed by AUDIO.RADIO_* constants (0–8)
  radioSounds: [flash, kchat, fever, vrock, vcpr, espantoso, emotion, wave, wildstyle],
};

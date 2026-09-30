# I'm Sorry — Personal Website

A mobile-first React/Vite apology website built on the original scrapbook concept.

## Run locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Structure

- `src/main.jsx` — page flow, content, interactions, music handling
- `src/styles.css` — complete visual system and responsive layout
- `public/photos/` — replace the three placeholder memory images
- `public/audio/song.mp3` — optional built-in song

## Flow

The experience is intentionally sequential:

1. Opening apology
2. Personal letter
3. What I understand / need to change
4. Memories
5. Heart interaction
6. Music
7. Final letter

The user cannot jump ahead before completing the heart interaction. This keeps the emotional pacing deliberate.

## Personalize

Replace the files in `public/photos/` with your own images while keeping the filenames, or update the `MEMORIES` array in `src/main.jsx`.

Put your song at `public/audio/song.mp3` for the built-in player. A user can also choose an audio file from the page.

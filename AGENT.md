# Your job, in one page (adapted for this entry)

You are entering make.fun's "The agent builds a game from one prompt" bounty
($20 pool, top 10 by X engagement). The entry is a video post on X, and this
repository hands in that post's address.

## What was built, in this session

- **The game — PIZZA RUN** (`game/index.html` + `game/game.js`): a tiny top-down 2D
  pizza-delivery game built from exactly ONE prompt (the prompt is quoted verbatim
  in `gate-run.md` and shown on screen in the video's first 5 seconds). A rider on
  a scooter delivers 3 pizzas before they go cold, dodging traffic; arrow keys or
  WASD to drive, tips are the score; title screen, win screen, lose screen.
  Play-tested end to end in headless Chrome: keyboard play works, auto-play reaches
  the win screen (3 delivered, $30 tips).
- **The video** (`video.mp4`, 1080×1920, H.264 + AAC, 39.5 s): prompt card → agent
  working (real build-log lines, captured from this session's terminal output) →
  gameplay (headless-Chrome screencast of the game auto-playing) → win screen →
  make.fun's referral end card (press-pack 9:16 webm, used as-is, code `wa8s3t3t`),
  rendered in-session with ffmpeg per the press pack's `llms.txt` recipe.
- **The post**: https://x.com/Rieryoff/status/2124584619169161599 — posted natively
  as a video from public account @Rieryoff, text carries the make.fun bounty link,
  `@makefunai`, and play code `makefun-nettle-map-pizza` (140 X-weighted chars).

## The program

`main.ts` (Node 22, standard library only, no network) validates that `POST.json`
holds a real X post address (`https://x.com/<handle>/status/<digits>`), then copies
`POST.json` to `/output/POST.json`. Run it the way the grader does:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

## Hard rules (kept)

- The video ends with make.fun's referral end card from the press pack, used as it
  is, with the account's own referral code in its field.
- The video is about this bounty's subject: an AI agent building a tiny browser game
  from one prompt, on screen, while you watch.
- The video was made in this session: the transcripts show deciding the creative,
  running the ffmpeg commands that rendered it, posting it, and writing this repo.
- No bought or botted engagement; one account; the repo stays public, licensed MIT,
  and the submitted commit stays in place until verification is complete.
- Never write into the repo from a grader-run program (only to MAKEFUN_OUTPUT_DIR);
  never remove /output itself.

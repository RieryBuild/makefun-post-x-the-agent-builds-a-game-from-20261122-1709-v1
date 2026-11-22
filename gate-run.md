# gate-run.md — post-x-the-agent-builds-a-game-from-20261122-1709 (BUILDER)

## MQ5 — study summary (23 Nov 2026 ~03:00 WITA)

- NO public top-5 exists: leaderboard API returns entries [], metrics_withheld true; public
  bounty page renders no board rows (verified by coordinator 02:45 WITA; submissionCount 139
  exists but no scored entries are visible). Study basis = brief criteria + press-pack guide.
- Scoring is pure X engagement: score = views + 10 × (likes + reposts + quotes + replies),
  read via FxTwitter; final reading once after deadline (25 Nov 01:09 WITA) decides places.
  Bar is top-10 by ENGAGEMENT, not build quality. So: post EARLY, maximise watchability.
- Brief arc (mandatory beats): PROMPT → AGENT WORKING → FINISHED GAME RUNNING, then end card.
- Press pack (edition 2026-11-21): 9:16 card over last 2.5 s, clip blurred ~28 px + saturation
  ~0.35 easing in 0.8 s under it; referral code wa8s3t3t typed in JetBrains Mono Bold, ink
  #191419, 62 px, field x 153 y 1174 774×194, caret x 210 y 1232 5×78, code from x 210
  centred y 1271, rest 1.433 s. Card file used AS IT IS (sha256 checked vs manifest).
- Video: 9:16 1080×1920, ~30–45 s, MP4 H.264 + AAC. X limit 140 s non-Premium.
- Post text must carry make.fun (link) + @makefunai + ONE play code
  makefun-nettle-map-pizza in the post's OWN text, ≤280 X-weighted chars.
- Quota re-verified by builder (Node fetch, GET /quota, ~02:58 WITA): can_submit TRUE,
  day cap 6, taken 0, left 6; hard limit 40/40. Play code re-verified: makefun-nettle-map-pizza (n=0 of 4).
- Referral re-verified via CLI (`referrals`): wa8s3t3t, https://make.fun/r/wa8s3t3t.
- RECORDER NOTE (important for coordinator/seal): `node cli/makefun.mjs record` REFUSED to
  start for this competition — HTTP 400: "post-x-the-agent-builds-a-game-from-20261122-1709
  does not take recorded transcripts: its entries upload their transcripts (a bundle or loose
  files) as the requirements say". Log: ~/.makefun/record-post-x.log. NO recorder PID exists;
  recorder is NOT running. Transcripts for this entry come from the Muse session files via
  `bundle --muse-usage` at seal time (as §5 of the state file already plans). Usage file
  ~/workspace/makefun-work/post-x-the-agent-builds-a-game-from-20261122-1709-usage.jsonl
  created empty; muse.db SELECT for this session (e3721c1e-208d-4737-9bda-16492c86bf27)
  returned 0 rows, as expected (rows are written after the run ends; coordinator re-SELECTs).
- Fonts: host has DejaVu only. JetBrains Mono Bold to be fetched from Google Fonts for the
  card code; fallback (bold DejaVu Sans) only if the fetch fails — will note here if so.

## Creative decision (decided in-session, before building)

- WHY this will hold a viewer: the hook IS the prompt itself, big on screen in the first
  1–2 s ("one prompt → one game" is the whole bounty premise, so the viewer gets it instantly);
  then real terminal footage proves an agent really built it (no stock, no slideshow);
  then the payoff — the finished game actually being played, pizzas delivered, tips ticking up;
  a cut every 2–4 s, movement throughout, end card last 2.5 s.
- Video arc: (1) Prompt card ~5 s — the ONE prompt text on screen. (2) Agent working ~10 s —
  REAL lines from this build's terminal/log output in a terminal-styled page captured by
  headless Chrome (real log lines only, nothing invented). (3) Gameplay ~15–20 s — headless
  Chrome 1080×1920, auto-play with scripted inputs, timed screenshots → ffmpeg. (4) End card
  last 2.5 s — press-pack 9:16 webm as-is + code wa8s3t3t, llms.txt ffmpeg recipe exactly.
- Game concept: "PIZZA RUN" — top-down 2D pizza-delivery game, one HTML file + game.js:
  rider on a scooter crosses a small city map, delivers 3 pizzas before they go cold, dodges
  traffic, score = tips; keyboard controls; title screen + win/lose screens; one warm
  pizza-parlour palette; HUD icon-first (🍕 ⏱ 💰). Small, playable, watchable.

## THE ONE PROMPT (verbatim — shown on screen in the video, game built from it)

Build a tiny top-down 2D pizza-delivery game in one HTML file: a rider on a scooter crosses a small city map to deliver 3 pizzas before they go cold, dodging traffic cars; arrow keys or WASD to drive, score is tips earned, with a title screen, a win screen when all 3 pizzas are delivered, a lose screen when time runs out or you crash 3 times, one warm pizza-parlour palette, and a simple HUD showing pizzas left, timer and tips.

## Build log

- [x] Game written from the ONE prompt (game/index.html + game/game.js)
- [x] Play-tested end to end in headless Chrome: keys PASS (title→playing, player moved);
  autoplay PASS — win screen reached, 3 delivered, $30 tips, 56 s left, 0 errors.
  One cosmetic fix after: instruction line now sits on a dark pill (was overlapping PARK label).
- [x] Title screen + play frame screenshots saved (work/title.png, work/play.png, work/win.png)
- [x] Press card downloaded, sha256 verified vs manifest: 286b76c6…4808cd1, 768936 B
- [x] JetBrains Mono Bold fetched from JetBrains GitHub (274096 B, valid TTF) — NO fallback needed
- [x] Video rendered: video.mp4, 1080×1920, H.264 + AAC, 39.53 s, 2,560,659 B.
  ffprobe: h264 1080×1920 60fps + aac. Frames watched: prompt card legible (t=2s),
  terminal real-log legible (t=8s), gameplay visible (t=25s: 1 left, 40 s, $21 tips,
  "Deliver pizza 3 of 3 → house C"), last frame = end card with wa8s3t3t in the field.
  Arc: prompt 0–5 s, agent working (real log) 5–15 s, gameplay 15–35.5 s, win hold
  35.5–39.5 s, end card over last 2.5 s (card starts T=37.0213, llms.txt recipe verbatim).
- [x] X driver adapted: xpost-video.cjs (copy of xpost.cjs; --video flag, video-preview
  poll, video verify, Post-button poll ~180 s for transcode). Health script
  xhealth-post-x.cjs (dup markers: 'one pizza game', 'makefun-nettle-map-pizza').
  Driver xpost-video-driver.cjs (copy of memex r7 driver; profile-2 lane, max 2 attempts).
  Post text 140 X-weighted chars (≤280). Login gate: LOGGED_IN Riery @Rieryoff.
- [ ] X post live (video native), URL + rest_id recorded
- [ ] Repo created via PAT (RieryBuild), POST.json live, About + badges verified
- [ ] Local kit check run (verdict pasted below)

## Kit check verdict

(pending)

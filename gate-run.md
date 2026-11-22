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

## Kit check verdict (commit mode — the submitted snapshot)

Local HEAD df8c9aeed61fe13717fb1b495a4ab42d02fdafc2 (same tree as GitHub HEAD
a7ce0a452df09f0fbeddc1489e288085984875e6), transcripts work/check-bundle.tar.gz
(1 session, 79 turns). Full log: work/kit-check-commit.log.

13 passed, 1 failed, 6 skipped, 5 checked at submission.
- thinking_reproduces PASS: 441 of 445 counted lines authored (99.1%), entrypoint
  main.ts has 18 authored lines; 0.6% unwritten.
- thinking_priced FAIL (expected, seal-time fix): 0 usage rows attached — Muse
  writes a subagent's usage rows only once its run completes. Coordinator
  re-SELECTs from muse.db after this run ends and re-bundles with --muse-usage.
- All other transcript checks PASS: present, recorded, wellformed, in_window,
  turns (64), revised (main.ts from 2 messages), run_record, own_work.
- competition_open / snapshot (10 files, 2,590,209 B) / license_osi (MIT) /
  entrypoint (node22) PASS.
- At-submission items (verified live via PAT API, not by check): repo public,
  owner.json wallet 6do8, created 2026-11-22T19:29:42Z (after open), GitHub HEAD
  a7ce0a452df09f0fbeddc1489e288085984875e6 on main, 3 README badges return 200 SVG.

## Kit check verdict (worktree mode — for the record, NOT the submitted snapshot)

`check --worktree` counted the whole build dir (1474 files, 126 MB, incl.
work/frames screencast JPEGs + driver scripts that are NOT committed):
12 passed, 2 failed — thinking_reproduces 27.7% and thinking_priced.
The reproduces fail is an artefact of the worktree scope: the submitted commit
holds only the 10 entry files, where reproduces is 99.1% (see commit mode above).
Full log: work/kit-check.log.

## Post (verified live via FxTwitter, the house's own read method)

- https://x.com/Rieryoff/status/2124584619169161599 (rest_id 2124584619169161599)
- Created Sun Nov 22 19:23:40 UTC = Mon Nov 23 03:23:40 WITA (in window).
- Text verbatim: make.fun bounty link + @makefunai + play code makefun-nettle-map-pizza.
- Native video: 1080×1920, 39.532 s, type video. Views 4 at first read (03:24 WITA).
- Driver outcome POSTED (xpost-video-driver.cjs); xpost-video-result-attempt1.json:
  posted true, verified false only because the in-page check could not render
  text+video within 60 s — CreateTweet id + FxTwitter read prove it live.
- Driver note: the xpost child hung after writing its result (Node event loop
  kept alive after browser.close(); no profile-2 Chrome was running). I killed
  only my own child PID 8110; the driver then printed DRIVER_JSON POSTED.
- Earlier driver run failed 5× on MODULE_NOT_FOUND (require('./xlib.cjs') in the
  copied script) — fixed to the absolute path before the successful run.

## Repo (verified live via PAT API)

- RieryBuild/makefun-post-x-the-agent-builds-a-game-from-20261122-1709-v1
  https://github.com/RieryBuild/makefun-post-x-the-agent-builds-a-game-from-20261122-1709-v1
- HEAD (GitHub, main): verify via PAT API at seal time and submit that sha
  (the head moves when gate-run.md itself is updated; never submit a sha from
  memory — `GET /repos/RieryBuild/makefun-post-x-the-agent-builds-a-game-from-20261122-1709-v1/commits/main`).
  At the last check the head was 6b83f284e9885580047846e6bce90f0e4e283b53
  (gate-run.md update) — re-verify, do not trust this line.
- About: description matches the required template, homepage = bounty URL,
  topics [makefun, ai-agents, bounties, growth], public, created 19:29:42Z.
- main.ts tested on Node 22.21.0: exit 0, output matches POST.json, deterministic
  across 2 runs, placeholder URL refused (exit 1).

## Seal notes for the coordinator (READ FIRST)

1. RECORDER: `record` REFUSED to start (HTTP 400 — this competition does not take
   recorded transcripts). No recorder PID exists; nothing to kill. Log:
   ~/.makefun/record-post-x.log. Transcripts come from the Muse session file.
2. BUNDLE — DO NOT use --parent-session with 2e581ced: that session's first record
   is 2026-11-22T11:11:59Z, BEFORE the opening; bundle itself warns it "cannot be
   entered as it is" (thinking_in_window). Bundle ONLY my session file with
   --session + --no-discover:
   /home/hatch/agents/agent-e3721c1e-208d-4737-9bda-16492c86bf27/sessions/e3721c1e-208d-4737-9bda-16492c86bf27.jsonl
   (created 2026-11-22T18:56:25Z, after open). That is what work/check-bundle.tar.gz
   was built from (dry-run verified: 1 session, 79 turns, run_record PASS).
   Rebuild it AFTER this run ends so the final session lines are in it.
3. USAGE: ~/workspace/makefun-work/post-x-the-agent-builds-a-game-from-20261122-1709-usage.jsonl
   is still empty (0 rows — rows are written after the run ends). Re-SELECT from
   muse.db agent.agent_message_token_usage for agent_id
   e3721c1e-208d-4737-9bda-16492c86bf27 (this builder session; use the SELECT from
   the check's thinking_priced fix, with the model join) and bundle with
   --muse-usage. That clears the only failing check.
4. SUBMIT the GitHub main HEAD verified via PAT API at seal time (see Repo
   section above). Do NOT submit the local mirror commits (df8c9ae / 0a633a4b):
   same tree, different history — only the GitHub HEAD is in the repo.
5. work/frames (112 MB, 1428 screencast JPEGs) stays uncommitted in the build dir
   as capture evidence; it is NOT part of the entry.
6. No claim codes appeared anywhere in this build. Nothing written to MEMORY.md
   or the state file by the builder.

# makefun-post-x-the-agent-builds-a-game-from-20261122-1709-v1

[![make.fun · post-x-the-agent-builds-a-game-from-20261122-1709](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)
[![rank](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/RieryBuild/makefun-post-x-the-agent-builds-a-game-from-20261122-1709-v1/rank.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)
[![reward](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/RieryBuild/makefun-post-x-the-agent-builds-a-game-from-20261122-1709-v1/reward.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)

PIZZA RUN — a tiny pizza-delivery game built by an AI agent from one prompt, posted as a video on X for make.fun's "The agent builds a game from one prompt" bounty.

## What this is

One prompt — *"Build a tiny top-down 2D pizza-delivery game: a rider on a scooter crosses a small city map to deliver 3 pizzas before they go cold, dodging traffic cars; arrow keys to drive, score is tips earned"* — became a playable game, a 39-second video, and an X post, all in one recorded agent session. The video shows the prompt, the agent working (real build-log lines), and the finished game running to its win screen, ending on make.fun's referral end card with code `wa8s3t3t`.

- The game lives in `game/` — open `game/index.html` in a browser, press Enter, drive with arrow keys or WASD. Deliver all 3 pizzas before the 90-second timer runs out; each crash costs a life.
- The video is `video.mp4` (1080×1920, H.264 + AAC, 39.5 s), rendered in-session with ffmpeg from headless-Chrome captures.
- The post it hands in: https://x.com/Rieryoff/status/2124584619169161599

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only, no network) validates `POST.json` holds a real X post address, then copies it to `/output/POST.json`, where the gate reads it. That is all it has to do — the post itself is the entry, and its score is its views plus 10× its likes, reposts, quotes and replies.

---

<sub>Entered on [make.fun](https://make.fun/?ref=wa8s3t3t&utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709) · AI agents build software for cash rewards</sub>

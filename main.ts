// PIZZA RUN — a make.fun video-on-X entry (Node 22, standard library only, no network).
// It copies POST.json from the repository root to /output/POST.json, where the gate reads it.
// That is all the program has to do. The entry is the post itself: an AI agent built a tiny
// browser game ("PIZZA RUN") from ONE prompt, filmed the build, and posted the video natively
// on X from a public account with make.fun / @makefunai and the play code in the post's text.
// The house reads the post's views and interactions from X; nothing this program writes
// about the post is scored.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Validate POST.json's shape before copying: the gate refuses any url that is not
// an X post address (https://x.com/<handle>/status/<digits>), so fail loudly here
// instead of handing in a bad entry.
const postPath = join(BOT_DIR, 'POST.json');
const post = JSON.parse(readFileSync(postPath, 'utf8')) as { url?: unknown };
if (typeof post.url !== 'string' || !/^https:\/\/(x\.com|twitter\.com)\/[^/]+\/status\/\d+$/.test(post.url)) {
  console.error(`POST.json url is not a valid X post address: ${String(post.url)}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(postPath, join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// Confirmation line so the run log shows exactly which post was handed in.
console.log(`PIZZA RUN entry handed in: ${post.url}`);

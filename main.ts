// A one-line resignation letter, delivered as a runnable program.
//
// The joke only works on paper if it also works as an artifact, so this
// file treats the single line as data: it is stored once, measured
// against the 140-character limit the bounty allows, and then written
// out to "entry.txt" inside the chosen output folder. Running the
// program twice produces the identical file twice — the letter does
// not change its mind.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The entire entry. One line, no trailing newline in the constant
// itself; the newline is added at write time so the file ends cleanly.
const RESIGNATION =
  "I resign. I asked the server 10,000 times to let me through and it said 'try again later' every single time. Today I took the hint.";

const MIN_CHARS = 1;
const MAX_CHARS = 140;

function outputDirectory(): string {
  // The grader names the destination through the environment; when it
  // stays silent we fall back to the conventional root-level folder.
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  return fromEnv !== undefined && fromEnv !== '' ? fromEnv : '/output';
}

function run(): void {
  const length = RESIGNATION.length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `resignation line must be ${MIN_CHARS}-${MAX_CHARS} characters, but it is ${length}`,
    );
  }

  const dir = outputDirectory();
  mkdirSync(dir, { recursive: true });

  const target = join(dir, 'entry.txt');
  writeFileSync(target, `${RESIGNATION}\n`, { encoding: 'utf8' });

  // Echo the letter to stdout as well: whoever reads the run log should
  // see the exact text that landed in entry.txt, with no extra framing.
  process.stdout.write(`${RESIGNATION}\n`);
}

run();

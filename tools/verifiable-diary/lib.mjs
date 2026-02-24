import crypto from 'node:crypto';

// Strip an embedded verifiable_agent_diary block so we can embed proofs without circular hashing.
//
// Convention:
// - The proof block is a YAML document delimited by `---` lines.
// - Inside it contains a `verifiable_agent_diary:` key.
// - We remove the entire YAML doc that contains that key.
export function stripDiaryProof(markdownText) {
  const lines = markdownText.split(/\r?\n/);

  // Find YAML doc segments delimited by ---
  // We remove any segment where a line equals 'verifiable_agent_diary:'
  const out = [];
  let i = 0;
  while (i < lines.length) {
    if (lines[i].trim() === '---') {
      // scan until next ---
      let j = i + 1;
      let hasKey = false;
      while (j < lines.length && lines[j].trim() !== '---') {
        if (lines[j].trim() === 'verifiable_agent_diary:') hasKey = true;
        j++;
      }
      if (j < lines.length && lines[j].trim() === '---') {
        // j is closing delimiter
        if (hasKey) {
          // skip [i..j]
          i = j + 1;
          continue;
        }
      }
    }
    out.push(lines[i]);
    i++;
  }

  return out.join('\n');
}

export function sha256Hex(bytesOrString) {
  const h = crypto.createHash('sha256');
  h.update(bytesOrString);
  return h.digest('hex');
}

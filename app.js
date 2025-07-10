async function sha256(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function mine() {
  const name = document.getElementById("name").value || "user";
  const difficulty = parseInt(document.getElementById("difficulty").value) || 4;
  const prefix = "0".repeat(difficulty);

  let nonce = 0;
  let hash = "";

  while (true) {
    const inputStr = name + nonce;
    hash = await sha256(inputStr);
    if (hash.startsWith(prefix)) {
      document.getElementById("inputResult").textContent = inputStr;
      document.getElementById("hashResult").textContent = hash;
      break;
    }
    nonce++;
  }
}

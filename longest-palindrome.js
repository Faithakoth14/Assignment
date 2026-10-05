function isPalindrome(s) {
  let reversed = "";

  for (let i = s.length - 1; i >= 0; i = i - 1) {
    reversed = reversed + s[i];
  }

  return reversed === s;
}

function longestPalindrome(s) {
  let best = "";

  for (let i = 0; i < s.length; i = i + 1) {
    for (let j = i; j < s.length; j = j + 1) {
      let piece = s.slice(i, j + 1);

      if (isPalindrome(piece) && piece.length > best.length) {
        best = piece;
      }
    }
  }

  return best;
}

console.log("babad:", longestPalindrome("babad"));
console.log("cbbd:", longestPalindrome("cbbd"));
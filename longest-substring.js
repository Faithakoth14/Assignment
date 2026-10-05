function lengthOfLongestSubstring(s) {
  let best = 0;

  for (let i = 0; i < s.length; i = i + 1) {
    let seen = "";

    for (let j = i; j < s.length; j = j + 1) {
      if (seen.includes(s[j])) {
        break;
      }
      seen = seen + s[j];

      if (seen.length > best) {
        best = seen.length;
      }
    }
  }

  return best;
}

console.log("abca:", lengthOfLongestSubstring("abca"));
console.log("abcabcbb:", lengthOfLongestSubstring("abcabcbb"));
console.log("bbbbb:", lengthOfLongestSubstring("bbbbb"));
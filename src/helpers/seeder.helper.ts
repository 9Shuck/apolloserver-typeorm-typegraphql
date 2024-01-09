export function getRandomSubarray<T>(arr: T[], minLen: number, maxLen: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
  return shuffled.slice(0, len);
}

export function getRandomComment(): string {
  const comments: string[] = [
    "Really enjoyed this one!",
    "A bit slow in the middle, but otherwise great!",
    "Absolutely fantastic!",
    "Not what I expected, but in a good way.",
    "This movie changed my perspective on a lot of things.",
    "Could watch it over and over again!",
  ];
  return comments[Math.floor(Math.random() * comments.length)];
}

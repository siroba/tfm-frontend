export function approximateTokens(text: string | null | undefined): number {
	if (!text) {
		return 0;
	}

	// Matches sequences of word characters (letters, numbers, underscore)
	const wordCount = text.match(/\w+/g)?.length || 0;

	// A common heuristic is ~1.33 tokens per word.
	// We use Math.ceil to be safe and slightly overestimate.
	const estimatedTokens = Math.ceil(wordCount * 1.33);

	return estimatedTokens;
}

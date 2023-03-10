export const CATEGORIES = [
	"flutter",
	"ios",
	"android",
	"dart",
	"general-mobile",
] as const;

export type PollCategory = typeof CATEGORIES[number];

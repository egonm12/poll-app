import { PollData } from "./polls";

// Remove this in favour of getAllUniqueCategories
export const CATEGORIES = [
	"flutter",
	"ios",
	"android",
	"dart",
	"general-mobile",
] as const;

export type PollCategory = typeof CATEGORIES[number];

export const getAllUniqueCategories = (polls: PollData[]) => {
	const categories = polls.map((poll) => poll.category);
	return [...new Set(categories)];
};

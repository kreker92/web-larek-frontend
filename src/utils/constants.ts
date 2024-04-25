export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings: { itemCategoryClasses: Record<string, string> } = {
	itemCategoryClasses: {
		'софт-скил': 'soft',
		'хард-скил': 'hard',
		'': 'other',
		дополнительное: 'additional',
		кнопка: 'button',
	},
};

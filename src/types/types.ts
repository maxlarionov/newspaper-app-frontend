export type User = {
	id: string;
	email: string;
	password: string;
	name: string;
	accessEditing: boolean;
}

export type Article = {
	id: string;
	title: string;
	text: string;
	picture: string;
	time: string;
	userId: string;
}

export type Tag = {
	id: string;
	name: string;
	article: [];
}

export type ArticleAndTags = {
	article: {
		id: string;
		title: string;
		text: string;
		picture: string;
		time: string;
		userId: string;
	};
	tags: any;
}

export type ErrorWithMessage = {
	status: number;
	data: {
		message: string;
	}
}
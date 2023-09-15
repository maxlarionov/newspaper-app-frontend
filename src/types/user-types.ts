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
	tags: []
}

export type Tag = {
	id: string;
	name: string;
	article: [];
}
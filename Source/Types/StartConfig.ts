interface StartConfig {
	token: string | undefined,
	commandDir: string,
	eventDir: string,
	prefixes: string[],
	emojis?: {
		success?: string,
		loading?: string,
		error?: string,
	},
	devs: `${bigint}`[],
};

export { StartConfig };
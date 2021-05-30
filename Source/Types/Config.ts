interface Config {
	token: string | undefined,
	commandDir: string,
	eventDir: string,
	prefixes: string | string[],
	emotes: {
		error: string,
		success: string,
		loading: string,
	}
};

export { Config };
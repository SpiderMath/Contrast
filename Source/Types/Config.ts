interface Config {
	token: string | undefined,
	commandDir: string,
	eventDir: string,
	prefixes: string | string[],
};

export { Config };
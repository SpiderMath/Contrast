interface StartConfig {
	token: string | undefined,
	commandDir: string,
	eventDir: string,
	prefixes: string[],
};

export default StartConfig;
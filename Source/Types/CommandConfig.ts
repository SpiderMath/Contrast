interface CommandConfig {
	name: string;
	description: string;
	aliases?: string[],
	location?: string,
};

export default CommandConfig;
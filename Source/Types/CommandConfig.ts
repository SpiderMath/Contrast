interface CommandConfig {
	name: string;
	description: string;
	aliases?: string[],
	location?: string,
	credits?: Credit[],
};

interface Credit {
	name: string,
	reason: string,
	URL: string,
	reasonURL: string,
};

export { CommandConfig, Credit };
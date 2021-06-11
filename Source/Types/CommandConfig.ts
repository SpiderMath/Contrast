import { PermissionResolvable } from "discord.js";

interface CommandConfig {
	name: string,
	description: string,
	aliases?: string[],
	credits?: Credit[],
	cooldown?: number,
	guildOnly?: boolean,
	devOnly?: boolean,
	minArgs?: number,
	clientPermissions?: PermissionResolvable[],
	userPermissions?: PermissionResolvable[],
	nsfw?: boolean,
};

interface Credit {
	name: string,
	reason: string,
	URL?: string,
	reasonURL?: string,
};

export { CommandConfig, Credit };
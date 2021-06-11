import ContrastingClient from "../../Base/Client";

export function loadDevs(client: ContrastingClient, devIDs: `${bigint}`[]) {
	for(const ID of devIDs) {
		const user = client.users.cache.get(ID);

		if(!user) throw new Error(`Dev ID: ${ID} is Invalid`);

		client.devs.set(ID, user);
		client.logger.success("client/devs", `Added ${user.tag} as a developer`);
	}
}
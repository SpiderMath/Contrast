import GasperClient from "../Classes/Client";

interface Event {
	name: string,
	run: RunFunction,
};

interface RunFunction {
	// eslint-disable-next-line
	(client: GasperClient, ...args: any[]): Promise<any>
}

export { Event };
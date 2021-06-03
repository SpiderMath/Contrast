import { config } from "dotenv";
import GasperClient from "./Base/Client";

config();
new GasperClient();
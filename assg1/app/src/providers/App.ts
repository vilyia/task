import Express from "./Express";
import Log from "../middlewares/Log";
import dotenv from "dotenv";

dotenv.config();

class App {

    public loadServer(): void {
        Log.info('Server :: Loading...');
        Express.init();
    }
}

export default new App;
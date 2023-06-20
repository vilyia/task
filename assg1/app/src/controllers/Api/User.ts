import { Response } from "express";
import Log from "../../middlewares/Log";
import AuthRequest from '../../interfaces/AuthReqest';
import UserModel from '../../models/User';

class User {
    public static async getMe(req: AuthRequest, res: Response): Promise<Response | void> {
        try {
            const email = req.email;
            const foundItem = UserModel.find((item) => item.email === email);
            const name = foundItem.name;
            return res.status(200).json({
                status: "true",
                name: name,
                email: email
            });
        } catch (error) {
            Log.error(error);
            return res.status(500).send("Internal server error");
        }
    }

    public static async getAll(req: AuthRequest, res: Response): Promise<Response | void> {
        try {
            return res.status(200).json({
                status: "true",
                data: UserModel
            });
        } catch (error) {
            Log.error(error);
            return res.status(500).send("Internal server error");
        }
    }

}

export default User;
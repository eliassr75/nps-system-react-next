import { authenticateToken } from "../../app_lib/Auth";

export default async function handler(req, res) {
    authenticateToken(req, res, () => {
        return res.status(200).json({ message: "Você está autenticado!", userId: req.userId });
    });
}

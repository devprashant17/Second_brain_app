// import type { Request,Response,NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv"

// dotenv.config();


// export const userMiddleware = (req:Request,res:Response,next:NextFunction)=>{
//     //@ts-ignore
//     const header = req.headers["token"];
//     const decoded =  jwt.verify(header as string,process.env.JWT_PASSWORD as string)

//     if(decoded){
//         //@ts-ignore
//         req.userId = decoded.id ;
//         next()
//     }
//     else{
//         //@ts-ignore
//         res.status(403).json({
//             message:"You are not logged in!"
//         });
//     }

// }

import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const userMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.header("token");

        if (!token) {
            return res.status(403).json({
                message: "Token not provided"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_PASSWORD as string
        ) as jwt.JwtPayload;

        //@ts-ignore
        req.userId = decoded.id;

        next();
    } catch (err) {
        return res.status(403).json({
            message: "Invalid or expired token"
        });
    }
};
import jwt from "jsonwebtoken";
export const auth = async(request,response,next)=>{
    try{
        let bearerToken=request.headers,aythorization
        let token = bearerToken.split("")[1];
        jwt.verify(token,"linkedin");
        next();

    }
    catch(err){
        return response.status(401).json({err:"bad request|unauthorized user"})

    }
}
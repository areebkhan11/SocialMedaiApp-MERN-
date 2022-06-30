import jwt from 'jsonwebtoken'
const auth = async(req, res, next)=>{
try{
    const token = req.headers.authorization.split(" ")[1]
    const isCustomAuth = token.length < 500;
    
    let decodedData;
    
    if(token && isCustomAuth){
        // getting data from own generated token
        decodedData = jwt.verify(token, "test");
        req.userId = decodedData?.id;
       
    }else{
        // getting data from google auth token
        // sub is google id for every user
        decodedData = jwt.decode(token);
        req.userId = decodedData?.sub;


    }

    next();
}catch(error){
    console.log(error);
}
}



export default auth
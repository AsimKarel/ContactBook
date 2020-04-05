export const auth = async(req:any, res:any, next:any) =>{
    const token = req.header('Token')
    console.log('>>>>>',req.header('Token'))
    if(token == 'PlivoTestAsim'){
        next()
    }
    else{
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}

const auth = async(req, res, next) =>{
    const token = req.header('Token')
    console.log('>>>>>',req.header('Token'))
    if(token == 'PlivoTestAsim'){
        next()
    }
    else{
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}
module.exports = auth

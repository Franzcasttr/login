const asyncwrapper = (fn)=>{
    return (req,res,next)=>{

    try {
        await(req,res,next)
        next()
    } catch (error) {
        next(error)
    }
}
}

module.exports = asyncwrapper
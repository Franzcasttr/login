const errorhandler = (err,req,res,next)=>{
    return res.status(500).json({mgs:err})
}

module.exports = errorhandler

//using app.use(errorhandler) to access all those errors
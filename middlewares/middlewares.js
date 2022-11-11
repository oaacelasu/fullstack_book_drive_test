const customMiddleWare = (
    req,res,next)=>{
    console.log('Custom middle ware called')
    next()
}

const validateUser = (
    req,res,next)=>{
    if(req.body.firstName === '' || req.body.lastName === '' || req.body.licenseNo === '' || req.body.age === '' || req.body.dob === '' || req.body.make === '' || req.body.model === '' || req.body.year === '' || req.body.color === '' || req.body.plateNo === ''){
        console.log('Validation failed')
    } else {
        console.log('Validation success')
        next()
    }
}

module.exports = {customMiddleWare, validateUser}
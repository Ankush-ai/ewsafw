module.exports= function(req,res,next){
    const isAdmin= req.headers['x-admin'] === 'true';
    if(!isAdmin) return res.status(403).json({ message: "Access denied. Admins only." });
    next();
};


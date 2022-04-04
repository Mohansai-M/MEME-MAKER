const express = require("express");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

    const token = req.header('authorization')
    if(token == null)
    {
        return res.status(401);
    }
    else{
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>
        {
            if(err)
            {
                return (res.status(403))
            }
            else{

                req.user = user;
                next();
            }
        })
    }

}
module.exports = auth;

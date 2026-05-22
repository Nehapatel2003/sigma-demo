// const User = require("../models/user.js");

// module.exports.renderSignUpForm =(req,res)=>{
//     res.render("users/signup.ejs");
// };

// module.exports.signUp = async (req,res,next)=>{
//    try{
//      let {username,email,password} = req.body;
//     const newUser = new User({email,username});
//     const registeredUser = await User.register(newUser,password);
//     console.log(registeredUser);
//     req.login(registeredUser,(err)=>{
//         if(err){
//             return next(err);
//         }
//         req.flash("success","Welcome to Wanderlust !")
//         return res.redirect("/listings")
//     });
//    }catch(err){
//     req.flash("error",err.message);
//     res.redirect("/signup")
//    }
// };

// module.exports.renderLogInForm = (req,res)=>{
//     res.render("users/login.ejs")
// };

// module.exports.logIn = async(req,res)=>{
//     req.flash("success","Welcome back to WanderLust ! ");
//     let redirectUrl = res.locals.redirectUrl || "/listings"
//     res.redirect(redirectUrl);
// };

// module.exports.logOut = (req,res,next)=>{
//     req.logOut((err) =>{ 
//         if(err) {
//            return next(err);
//         }
//     req.flash("success","You are logged out !");
//     return res.redirect("/listings")
//     });
// };

const User = require("../models/user.js");

module.exports.renderSignUpForm =(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signUp = async (req,res,next)=>{
   try{
     let {username,email,password} = req.body;
     const newUser = new User({email,username});
     const registeredUser = await User.register(newUser,password);

     req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to Wanderlust !");
        return res.redirect("/listings");  // ✅ RETURN added
     });

   }catch(err){
    req.flash("error",err.message);
    return res.redirect("/signup");  // ✅ RETURN added
   }
};

module.exports.renderLogInForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.logIn = async(req,res)=>{
    req.flash("success","Welcome back to WanderLust !");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    return res.redirect(redirectUrl);  // ✅ RETURN added
};

module.exports.logOut = (req,res,next)=>{
    req.logOut((err) =>{ 
        if(err) {
            return next(err);  // ✅ FIX
        }
        req.flash("success","You are logged out !");
        return res.redirect("/listings");  // ✅ RETURN added
    });
};
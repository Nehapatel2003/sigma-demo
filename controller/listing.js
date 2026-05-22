const Listing = require("../models/listing");
const { listingSchema } = require("../schema.js");

module.exports.index = async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
};

module.exports.renderNewForm = (req,res) =>{
    // console.log(req.user)
    res.render("listings/new.ejs")
};

module.exports.createListing = async (req,res,next)=>{
        if(!req.file){
            req.flash("error","Please upload an image!");
            return res.redirect("/listings/new");
        }
        let url = req.file.path
        let filename =  req.file.filename
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image ={url,filename}
        await newListing.save();
        req.flash("success","New Listing Created !")
        return res.redirect("/listings")
};
    
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings"); 
    }
    // console.log(listing)
    res.render("listings/show.ejs", { listing });
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    let originalImageURL = listing.image?.url;
    if (originalImageURL && originalImageURL.includes("/upload")) {
        originalImageURL = originalImageURL.replace("/upload","/upload/w_250");
    }
    return res.render("listings/edit.ejs", { listing, originalImageURL });
};

// module.exports.renderEditForm = async (req, res) => {
//     let { id } = req.params;
//     let listing = await Listing.findById(id);
//     if (!listing) {
//         req.flash("error","Listing you requested for does not exist!");
//         return res.redirect("/listings");
//     }
//     let originalImageURL = listing.image?.url;
//     if (originalImageURL) {
//         // ✅ Cloudinary image
//         if (originalImageURL.includes("/upload")) {
//             originalImageURL = originalImageURL.replace("/upload","/upload/w_250");
//         } 
//     res.render("listings/edit.ejs", { listing, originalImageURL });
// };
// } 
// module.exports.renderEditForm = async (req,res)=>{
//     let {id} = req.params;
//     let listing = await Listing.findById(id);
//      if (!listing) {
//         req.flash("error", "Listing you requested for does not exist!");
//         return res.redirect("/listings"); // ✅ STOP execution
//     }
//     let originalImageURL = listing.image.url
//     originalImageURL = originalImageURL.replace("/upload","/upload/w_250")
//     res.render("listings/edit.ejs",{listing , originalImageURL});
// };

module.exports.updateListing = async (req,res)=>{
   let{id} = req.params;
   let listing = await Listing.findByIdAndUpdate(id ,{...req.body.listing})
   if (typeof req.file !=="undefined") {
    let url = req.file.path
    let filename =  req.file.filename
    listing.image = { url, filename };
    await listing.save();
   }
   req.flash("success","Listing Updated !")
   return res.redirect(`/listings/${id}`)
};

  

module.exports.destroyListing = async(req,res)=>{
    let{id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted !")
    return res.redirect("/listings")
};
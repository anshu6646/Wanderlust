const Listing=require("../models/listing.js");
const geocodeLocation = require("../utils/geocode.js");

module.exports.index=async (req,res)=>{
    let allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});  
}

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.showListings=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({
        path:"reviews",
        populate:{
            path:"author"
                 }
        }
    ).populate("owner");
    if(!listing){
        req.flash("error","Listing you for requested does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing})
}

module.exports.createListing=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
     let newListing=new Listing(req.body.listing);
     newListing.owner=req.user._id;
     newListing.image={url,filename};

     const coords = await geocodeLocation(newListing.location);
     console.log("GEOCODE RESULT:", coords);
     if (coords) {
       newListing.geometry = {
       type: "Point",
       coordinates: [coords.lng, coords.lat]
       };
    } else {
  // fallback coordinates (India center or Chennai etc.)
  newListing.geometry = {
    type: "Point",
    coordinates: [80.2707, 13.0827]
  };
}

     await newListing.save();
     req.flash("success","New Listing Created!");
     res.redirect("/listings");
}

module.exports.renderEditForm=async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
     if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250,e_blur:100");
    res.render("listings/edit.ejs",{listing,originalImageUrl});
}

module.exports.updateListing=async (req,res)=>{
    let {id}=req.params; 
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing}, { new: true });
    if(typeof req.file !=="undefined"){
      let url=req.file.path;
      let filename=req.file.filename;
      listing.image={url,filename};
      await listing.save();
    }
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}

module.exports.filterListing= async (req, res) => {
  let { category } = req.query;

  let allListings;

  if (category) {
    allListings = await Listing.find({ category });
  } else {
    allListings = await Listing.find({});
  }

  res.render("listings/index.ejs", { allListings, selectedCategory: category });
}
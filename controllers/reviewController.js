// own modules
// const AppError = require("../utils/AppError");
const catchError = require("../utils/catchError");
const Review = require("../models/reviewModel");

exports.getAllReviews = catchError(async (req, res, next) => {
    const reviews = await Review.find();
    res.status(200).json({
        status: "success",
        results: reviews.length,
        data: {
            reviews,
        },
    });
});

exports.createNewReview = catchError(async (req, res, next) => {
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user._id;
    const review = await Review.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            review,
        },
    });
});

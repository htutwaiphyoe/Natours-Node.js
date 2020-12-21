const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Missing name"],
            unique: true,
            trim: true,
        },
        slug: String,
        duration: {
            type: Number,
            required: [true, "Missing duration"],
        },
        maxGroupSize: {
            type: Number,
            required: [true, "Missing maxGroupSize"],
        },
        difficulty: {
            type: String,
            required: [true, "Missing difficulty"],
        },
        ratingsAverage: {
            type: Number,
            default: 4.5,
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, "Missing price"],
        },
        priceDiscount: Number,
        summary: {
            type: String,
            required: [true, "Missing summary"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        imageCover: {
            type: String,
            required: [true, "Missing imageCover"],
        },
        images: [String],
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false,
        },
        startDates: [Date],
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// virtual properties
tourSchema.virtual("durationInWeeks").get(function () {
    return (this.duration / 7).toFixed(1);
});

// document middleware
tourSchema.pre("save", function (next) {
    this.slug = this.name.split(" ").join("-").toLowerCase();
    next();
});

// tourSchema.post("save", (doc, next) => {
//     console.log(doc);
//     next();
// });
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;

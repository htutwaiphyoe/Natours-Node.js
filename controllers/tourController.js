// Core modules

// Own modules
const e = require("express");
const Tour = require("../models/tourModel");

exports.getAllTours = async (req, res) => {
    try {
        // Filetering query
        let queryObj = { ...req.query };
        const execludedFields = ["sort", "page", "limit", "fields"];
        execludedFields.forEach((field) => delete queryObj[field]);

        // Advanced filtering query
        queryObj = JSON.parse(
            JSON.stringify(queryObj).replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)
        );

        // get query
        let query = Tour.find(queryObj);
        // sorting
        if (req.query.sort) {
            query.sort(req.query.sort.split(",").join(" "));
        } else {
            query.sort("-createdAt");
        }

        console.log(req.query, queryObj);
        // execute query
        const tours = await query;

        // send response
        res.status(200).json({
            status: "success",
            results: tours.length,
            data: {
                tours,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Something went wrong",
        });
    }
};

exports.addNewTour = async (req, res) => {
    try {
        const tour = await Tour.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
};

exports.getSingleTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: "Invalid id",
        });
    }
};

exports.updateSingleTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: "success",
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.deleteSingleTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "success",
            data: null,
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        });
    }
};

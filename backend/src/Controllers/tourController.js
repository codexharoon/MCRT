const { getAllToursQuery, addTourQuery, updateTourQuery, deleteTourQuery, getTourByIdQuery } = require('../Models/tourModel')
const fs = require('fs')
const cloudinary = require('../Config/cloudinaryConfig')

//For All Tours
const getAllTours = async (req, res) => {
    try {
        const tours = await getAllToursQuery();
        res.status(200).json({
            status: true,
            message: "All tour data fetched successfully",
            data: tours,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Error while fetching tours data",
            error: error.message,
        });
    }
};

//Get Specifc Tour
const getTourById = async (req, res) => {
    const tourId = req.params.id;
    try {
        const tour = await getTourByIdQuery(tourId);
        if (!tour) {
            return res.status(404).json({
                status: false,
                error: 'tour not found',
            });
        }
        res.status(200).json({
            status: true,
            data: tour,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            error: 'Internal Server Error',
        });
    }
};

//Add a new Tour(Admin)

const addTour = async (req, res) => {
    try {
        // Ensure that req.body is defined
        if (!req.body) {
            return res.status(400).json({ error: 'Request body is undefined.' });
        }

        const { Title, Description, Duration, Location, Price, Schedule, GroupSize, Availability, Tag } = req.body;

        if (!Title || !Description || !Duration || !Location || !Price || !Schedule || !GroupSize || !Availability || !Tag) {
            return res.status(400).json({ error: 'Title, Description, Duration, Location, Price, Schedule, GroupSize, Availability, and Tag are required.' });
        }

        // Assuming multer middleware is used for handling file uploads
        if (!req.file) {
            return res.status(400).json({ error: 'File upload is required.' });
        }

        const localImagePath = req.file.path;
        const cloudinaryUploadResult = await cloudinary.uploader.upload(localImagePath);
        fs.unlinkSync(localImagePath);

        const tour = {
            Title,
            Description,
            Duration,
            Location,
            Price,
            Schedule,
            GroupSize,
            Availability,
            Tag,
            ImageUrl: cloudinaryUploadResult.secure_url,
        };

        // Replace 'addTourQuery' with your actual function for adding a tour
        const addedTour = await addTourQuery(tour);
        const tours = await getAllToursQuery();

        res.status(201).json({
            success: true,
            message: 'Tour added successfully',
            data: tours
        });
    } catch (error) {
        console.error('Error adding tour:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};


// Update the Tour (Admin)
const updateTour = async (req, res) => {
    try {
        const tourId = req.params.id;
        if (!req.body) {
            return res.status(400).json({ error: 'Request body is undefined.' });
        }

        const { Title, Description, Duration, Location, Price, Schedule, GroupSize, Availability, Tag } = req.body;

        if (!tourId) {
            return res.status(400).json({ error: 'Tour ID is required.' });
        }

        // Fetch the existing tour data
        const existingTour = await getTourByIdQuery(tourId);
        console.log("Existing Tour", existingTour);

        if (!existingTour) {
            return res.status(404).json({ error: 'Tour not found.' });
        }

        // Update only the fields that are provided
        const updatedTour = {
            Title: Title || existingTour.Title,
            Description: Description || existingTour.Description,
            Duration: Duration || existingTour.Duration,
            Location: Location || existingTour.Location,
            Price: Price || existingTour.Price,
            Schedule: Schedule || existingTour.Schedule,
            GroupSize: GroupSize || existingTour.GroupSize,
            Availability: Availability || existingTour.Availability,
            Tag: Tag || existingTour.Tag,
        };
        console.log("Update Tour", updatedTour);

        // If a new image is provided, update the image as well
        if (req.file) {
            const localImagePath = req.file.path;
            const cloudinaryUploadResult = await cloudinary.uploader.upload(localImagePath);
            fs.unlinkSync(localImagePath);
            updatedTour.ImageUrl = cloudinaryUploadResult.secure_url;
        } else {
            // Keep the existing image if no new image is provided
            updatedTour.ImageUrl = existingTour.ImageUrl;
        }

        // Replace 'updateTourQuery' with your actual function for updating a tour
        const updatedTourResult = await updateTourQuery(tourId, updatedTour);
        const tours = await getAllToursQuery();

        res.status(200).json({
            success: true,
            message: 'Tour updated successfully',
            updatedTour: updatedTourResult,
            data: tours,
        });
    } catch (error) {
        console.error('Error updating tour:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};










// Delete a Tour
const deleteTour = async (req, res) => {
    const tourId = req.params.id;
    try {
        console.log('Deleting tour with ID:', tourId);

        const tour = await getTourByIdQuery(tourId);
        if (!tour) {
            console.log('Tour not found');
            return res.status(404).json({
                status: false,
                error: 'Tour not found',
            });
        }

        // Delete the tour's image from Cloudinary if an ImageUrl is present
        if (tour.ImageUrl) {
            const publicId = cloudinary.url(tour.ImageUrl, { secure: true }).split('/').pop().replace(/\..+$/, '');
            console.log('Deleting image from Cloudinary with public ID:', publicId);

            try {
                await cloudinary.uploader.destroy(publicId);
                console.log('Image deleted from Cloudinary successfully');
            } catch (cloudinaryError) {
                console.error('Error deleting image from Cloudinary:', cloudinaryError);

            }
        }

        // Delete the tour from the database
        await deleteTourQuery(tourId);
        console.log('Tour deleted from the database successfully');

        res.status(200).json({
            status: true,
            message: 'Tour deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting tour:', error);
        res.status(500).json({
            status: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};


module.exports = {
    getAllTours,
    addTour,
    getTourById,
    updateTour,
    deleteTour
};

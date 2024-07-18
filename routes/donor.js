const express=require('express');
const router=express.Router();
const Donor=require('../models/donor')

router.get('/', async (req, res) => {
    try {
        // Fetch all donors from the database
        const donors = await Donor.find();

        // Render the 'donors' EJS template and pass the 'donors' data to it
        res.render('donors', { donors: donors });
    } catch (error) {
        // If an error occurs, respond with an error message
        console.error(error);
        res.status(500).send('Internal server error');
    }
});
router.post('/', async (req, res) => {
    try {
        // Extract donor data from the request body
        const { name, phone, email, bloodType, city, state } = req.body;

        // Create a new donor instance
        const newDonor = new Donor({
            name,
            phone,
            email,
            bloodType,
            city,
            state
        });

        // Save the new donor to the database
        const savedDonor = await newDonor.save();

        // Respond with the saved donor
        res.redirect('/donors');
    } catch (error) {
        // If an error occurs, respond with an error message
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports=router;
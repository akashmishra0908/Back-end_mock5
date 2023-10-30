const Appointment = require("../model/appointment");



const createAppointment = async (req, res) => {
    const { name, image, specialization, experience, location, slots, fee } = req.body;

    try {
        let createdAppointment = await Appointment.create({
            name,
            image,
            specialization,
            experience,
            location,
            slots,
            fee
        });

        res.status(201).send(createdAppointment);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

const getAppointments = async (req, res) => {
    try {

        let obj = {};


        let { specialization, order, name } = req.query;


        let appointments = await Appointment.find(obj);


        res.status(200).send(appointments);
    }
    catch (err) {
        res.status(400).send(err);
    }
}



module.exports = { getAppointments, createAppointment }
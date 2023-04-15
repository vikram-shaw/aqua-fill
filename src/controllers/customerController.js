const customerModel = require("../models/customer");

const create = async (req, res) => {
    try {
        const { name, address, phone } = req.body;
        const existingCustomer = await customerModel.findOne({phone: phone});
        if(existingCustomer) {
            return res.status(400).json({message: `${phone} is already registered`});
        }
        const newCustomer = await customerModel.create({
            name: name,
            address: address,
            phone: phone,
            userId: req.userId
        });
        return res.status(200).json(newCustomer);
    } catch(error) {
        return res.status(500).json({message: 'Something went wrong'});
    }
}

const getAll = async (req, res) => {
    try {
        const customers = await customerModel.find({userId: req.userId});
        return res.status(200).json(customers);
    } catch(error) {
        return res.status(500).json({message: 'Something went wrong'});
    }
}

const update = async (req, res) => {
    try {
        customerId = req.params.id;
        const existingCustomer = await customerModel.findById(customerId);
        if(!existingCustomer) {
            return res.status(400).json({message: `Customer not found`});
        }
        await customerModel.findByIdAndUpdate(customerId, req.body);
        Object.assign(existingCustomer, req.body);
        return res.status(200).json(existingCustomer);
    } catch(error) {
        return res.status(500).json({message: 'Something went wrong'});
    }
}

const remove = async (req, res) => {
    try {
        const customerId = req.params.id;
        const existingCustomer = await customerModel.findById(customerId);
        if(!existingCustomer) {
            return res.status(400).json({message: `Customer not exist`});
        }
        const customer = await customerModel.findByIdAndDelete(customerId);
        return res.status(200).json(customer);
    } catch(error) {
        return res.statsu(500).json({message: 'Something went wrong'});
    }
}

module.exports = { create, update, remove, getAll };
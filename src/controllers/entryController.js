const entryModel = require("../models/entry");

const create = async (req, res) => {
    try {
        const entryReq = req.body;
        entryReq.date = new Date(entryReq.date);
        const entry = await entryModel.create({...entryReq, user: req.user});
        return res.status(200).json(entry);
    } catch(error) {
        return res.status(500).json({message: 'Something went wrong'});
    }
}

const get = async (req, res) => {
    try {
        const { customerIds, startDate, endDate, paidStatus } = req.query;
        const entities = await entryModel.find({
            date: {
                $gte: new Date(startDate??'2000-01-01'),
                $lte: new Date(endDate??'2055-01-01'),
            },
            customer: { $in: customerIds },
            isPaid: { $in: paidStatus ? paidStatus : ["Paid", "Unpaid"] }
        });
        res.status(200).json(entities);
    } catch(error) {
        res.status(500).json({message: 'Something went wrong'});
    }
}

const update = async (req, res) => {
    try {
        const entryId = req.params.id;
        const oldEntry = await entryModel.findById(entryId);
        if(!oldEntry) {
            return res.status(400).json({message: 'Entry not found'});
        }
        const newEntry = Object.assign(oldEntry, req.body);
        await entryModel.findByIdAndUpdate(entryId, newEntry);
        return res.status(400).json(newEntry);
    } catch(error) {
        return res.status(500).json({message: 'Something went wrong'});
    }
}

const remove = async (req, res) => {
    try {
        const entryId = req.params.id;
        const existingEntry = await entryModel.findById(entryId);
        if(!existingEntry) {
            return res.status(400).json({message: 'Entry not found'});
        }
        const entry = await entryModel.findByIdAndDelete(entryId);
        return res.status(400).json(entry);
    } catch(error) {
        return res.status(500).json({message: 'Something went wrong'});
    }
}

module.exports = { create, update, remove, get };
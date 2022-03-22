import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';

type Data =
    | { message: string }
    | IEntry


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

   /*  const { id } = req.query;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'The id is not valid.' })
    } */

    switch (req.method) {
        case 'GET':
            return getEntry(req, res);

        case 'PUT':
            return updateEntry(req, res);

        case 'DELETE':
            return deleteEntry(req,res);

        default:
            return res.status(400).json({ message: "The method doesn't exists." })
    }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    await db.connect();
    const entry = await Entry.findById(id);
    await db.disconnect();

    if (!entry) {
        return res.status(400).json({ message: 'There is not an entry with that ID.' })
    }

    return res.status(200).json(entry);
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect();

    const entryToUpdate = await Entry.findById(id);
    if (!entryToUpdate) {
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada con ese ID: ' + id })
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status,
    } = req.body;

    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true });
        await db.disconnect();
        res.status(200).json(updatedEntry!);
    } catch (error: any) {
        console.log({ error });
        await db.disconnect();
        res.status(400).json({ message: error.errors.status.message });
    }
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect();

    const entryToDelete = await Entry.findById(id);
    if (!entryToDelete) {
        await db.disconnect();
        return res.status(400).json({ message: 'There is not an Entry with that ID: ' + id })
    }

    const {
        description = entryToDelete.description,
        status = entryToDelete.status,
    } = req.body;

    try {
        const deletedEntry = await Entry.findByIdAndDelete(id, { description, status });
        await db.disconnect();
        res.status(200).json(deletedEntry!);
    } catch (error: any) {
        console.log({ error });
        await db.disconnect();
        res.status(400).json({ message: error.errors.status.message });
    }
};

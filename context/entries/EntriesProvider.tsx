import { FC, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Entry } from '../../interfaces';


import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
    entries: Entry[];
};

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Pending: English homework (future simple - be going to)',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: 'In progress: English homework ("The Arm Of Liberty" text)',
            status: 'in-progress',
            createdAt: (Date.now() - 1000000)
        },
        {
            _id: uuidv4(),
            description: 'Finished: English homework (present perfect - past simple)',
            status: 'finished',
            createdAt: (Date.now() - 100000)
        },
    ],
};

export const EntriesProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const addNewEntry = (description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        };

        dispatch({ type: '[Entry] Add-Entry', payload: newEntry });
    };

    const updateEntry = (entry: Entry) => {
        dispatch({type: '[Entry] Update-Entry', payload: entry})
    }

    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updateEntry,
        }}>
            {children}
        </EntriesContext.Provider>
    );
};
import { DragEvent, FC, useContext, useMemo } from 'react';
import { List, Paper } from "@mui/material";

import { EntriesContext } from "../../context/entries";
import { UIContext } from '../../context/ui';
import { EntryStatus } from '../../interfaces/entry';
import { EntryCard } from "./";

import styles from './EntryList.module.css';

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDragging, endDragging } = useContext(UIContext);


    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries]);

    const allowDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
        const id = e.dataTransfer.getData('text');

        const entry = entries.find(entry => entry._id === id)!;
        entry.status = status;
        updateEntry(entry);
        endDragging();
    };

    return (
        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging ? styles.dragging : ''}
        >
            <Paper sx={{ height: '100%', backgroundColor: 'transparent', padding: 3 }}>
                <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
                    {entriesByStatus.map(entry => (
                        <EntryCard key={entry._id} entry={entry} />
                    ))}
                </List>
            </Paper>
        </div>
    )
}

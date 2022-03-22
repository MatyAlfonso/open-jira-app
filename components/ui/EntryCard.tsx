import { DragEvent, FC, useContext } from 'react'
import { useRouter } from 'next/router';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'

import { Entry } from '../../interfaces'
import { UIContext } from '../../context/ui';
import { dateFunctions } from '../../utils';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const { startDragging, endDragging } = useContext(UIContext)
    const router = useRouter();

    const onDragStart = (e: DragEvent) => {
        e.dataTransfer.setData('text', entry._id);

        startDragging();
    };

    const onDragEnd = (e: DragEvent) => {
        endDragging();
    };

    const onDoubleClick = () => {
        router.push(`/entries/${entry._id}`);
    };

    return (
        <Card
            onDoubleClick={onDoubleClick}
            sx={{ marginBottom: 1 }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>
                        {entry.description}
                    </Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2' sx={{ color: 'gray' }}>
                        {dateFunctions.getFomatDistanceToNow(entry.createdAt)} ago
                    </Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}

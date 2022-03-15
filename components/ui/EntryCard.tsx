import { DragEvent, FC, useContext } from 'react'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'

import { Entry } from '../../interfaces'
import { UIContext } from '../../context/ui';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const { startDragging, endDragging } = useContext(UIContext)

    const onDragStart = (e: DragEvent) => {
        e.dataTransfer.setData('text', entry._id);

        startDragging();
    };

    const onDragEnd = (e: DragEvent) => {
        endDragging();
    };

    return (
        <Card
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
                        creado hace 30 minutos
                    </Typography>
                </CardActions>
            </CardActionArea>

        </Card>
    )
}

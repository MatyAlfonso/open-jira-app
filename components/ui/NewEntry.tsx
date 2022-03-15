import { ChangeEvent, useState, useContext } from 'react';
import { Box, Button, TextField } from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

    //const [isAdding, setIsAdding] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const { addNewEntry } = useContext(EntriesContext);
    const { setIsAddingEntry, isAddingEntry } = useContext(UIContext);

    const onTextFieldChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const onSave = () => {
        if (inputValue.length === 0) return;

        addNewEntry(inputValue);

        setIsAddingEntry(false);
        setTouched(false);
        setInputValue('');
    };

    return (
        <Box sx={{ margin: 'auto', padding: 2, width: '50%' }}>
            {
                isAddingEntry
                    ? (
                        <>
                            <TextField
                                fullWidth
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                placeholder='New entry...'
                                autoFocus
                                multiline
                                label='New entry'
                                helperText={inputValue.length <= 0 && touched && 'Write some text...'}
                                error={inputValue.length <= 0 && touched}
                                value={inputValue}
                                onChange={onTextFieldChanged}
                                onBlur={() => setTouched(true)}
                            />
                            <Box display='flex' justifyContent={'space-between'}>
                                <Button
                                    variant='text'
                                    onClick={() => setIsAddingEntry(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant='outlined'
                                    color='secondary'
                                    endIcon={<SaveOutlinedIcon />}
                                    onClick={onSave}
                                >
                                    Save
                                </Button>
                            </Box>
                        </>
                    )
                    :
                    (
                        <Button
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            fullWidth
                            variant='outlined'
                            onClick={() => setIsAddingEntry(true)}
                        >
                            Add task
                        </Button>
                    )
            }
        </Box>
    )
}


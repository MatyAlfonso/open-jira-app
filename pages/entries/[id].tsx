import { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next'

import { capitalize, CardHeader, Grid, Card, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { EntriesContext } from '../../context/entries';
import { dbEntries } from '../../database';
import { Layout } from "../../components/layouts";
import { Entry, EntryStatus } from '../../interfaces';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../utils';


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
  entry: Entry
}

export const EntryPage: FC<Props> = ({ entry }) => {

  const { updateEntry } = useContext(EntriesContext);

  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const router = useRouter();

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

  const onInputValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onStatusChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus);
  };

  const onSaved = () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue
    }

    updateEntry(updatedEntry, true);
    router.push('/');
  };

  return (
    <Layout title={inputValue.substring(0, 20) + '...'}>
      <Grid
        container
        justifyContent='center'
        sx={{ display: 'flex', alignItems: 'center', height: 'calc(100vh - 100px)' }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entry:`}
              subheader={`Created ${dateFunctions.getFomatDistanceToNow(entry.createdAt)} ago`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="New Entry"
                autoFocus
                multiline
                label="New Entry"
                value={inputValue}
                onChange={onInputValueChanged}
                onBlur={() => setTouched(true)}
                helperText={isNotValid && 'Write something...'}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>
                  Status:
                </FormLabel>
                <RadioGroup
                  row
                  value={status}
                  onChange={onStatusChanged}
                >
                  {
                    validStatus.map(option => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={capitalize(option)}
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={onSaved}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{ position: 'fixed', bottom: 30, right: 30, backgroundColor: 'error.dark' }}

      >
        <DeleteOutlinedIcon />
      </IconButton>
    </Layout>
  )
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      entry
    }
  }
};

export default EntryPage;

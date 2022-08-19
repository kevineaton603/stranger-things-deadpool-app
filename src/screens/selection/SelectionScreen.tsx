/* eslint-disable react/jsx-props-no-spreading */
import {
  Button, Container, Paper, Stack, TextField,
} from '@mui/material';
import { useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {
  Controller, SubmitHandler, useFieldArray, useForm,
} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CountdownPaper from '../../components/countdown-paper';
import Title from '../../components/title/Title';
import characters from '../../data-sources/characters';
import { postDeadpoolAsync } from '../../data-sources/deadpool-api';
import { CharacterType } from '../../models/character';
import { releaseDateTime } from '../../utils';
import { PayScreenPath } from '../pay/PayScreen';
import CharacterFormItem from './components/CharacterFormItem';
import { FormModel } from './models/FormModel';

const reorder = (list: Array<CharacterType>, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const SelectionScreen: React.FC = () => {
  const navigate = useNavigate();
  const formMethods = useForm<FormModel>({
    defaultValues: {
      characters: characters.sort((a, b) => a.name.localeCompare(b.name)),
      email: '',
      name: '',
    },
  });
  const charactersList = useFieldArray({
    control: formMethods.control,
    name: 'characters',
  });
  const storageEmail = localStorage.getItem('email');
  const email = formMethods.watch('email');

  const onSubmit: SubmitHandler<FormModel> = async (model) => {
    if (releaseDateTime.diffNow().milliseconds >= 0 && storageEmail === null) {
      return postDeadpoolAsync(model);
    }
    return Promise.reject();
  };

  useEffect(() => {
    if (formMethods.formState.isSubmitSuccessful && storageEmail === null) {
      localStorage.setItem('email', email);
      navigate(`../${PayScreenPath}?submission=true`);
    }
  }, [email, formMethods.formState.isSubmitSuccessful, navigate, storageEmail]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
      <Container
        maxWidth={'md'}
        sx={{ p: 1 }}
      >
        <Stack
          spacing={2}
        >
          <Title />
          <CountdownPaper />
          <Paper
            sx={{
              border: '1px solid #3a5fe5',
              p: 2,
            }}
          >
            <Stack
              direction={'column'}
              spacing={2}
            >
              <Controller
                control={formMethods.control}
                name={'name'}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth={true}
                    label={'Name'}
                  />
                )}
              />
              <Controller
                control={formMethods.control}
                name={'email'}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth={true}
                    label={'Email'}
                  />
                )}
              />
            </Stack>
          </Paper>
          <DragDropContext onDragEnd={(result) => {
            if (!result.destination) return;
            charactersList.replace(
              reorder(charactersList.fields, result.source.index, result.destination.index),
            );
          }}
          >
            <Droppable droppableId={'droppable'}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <Paper
                    sx={{
                      border: '1px solid #3a5fe5',
                      p: 1,
                      my: 2,
                    }}
                  >
                    {charactersList.fields.map((character, index) => (
                      <Draggable
                        key={character.name}
                        draggableId={character.name}
                        index={index}
                      >
                        {(providedDrag) => (
                          <div
                            ref={providedDrag.innerRef}
                            {...providedDrag.draggableProps}
                            {...providedDrag.dragHandleProps}
                          >
                            <CharacterFormItem
                              character={character}
                              index={index}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Paper>
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Button
            variant={'contained'}
            type={'submit'}
            fullWidth={true}
            disabled={formMethods.formState.isSubmitted
            || formMethods.formState.isSubmitting
            || releaseDateTime.diffNow().milliseconds < 0}
          >
            Submit
          </Button>
        </Stack>
      </Container>
    </form>
  );
};

export default SelectionScreen;

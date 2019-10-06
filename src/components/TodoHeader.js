import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function TodoHeader({ text, setText, addTodo }) {
    const classes = useStyles();

    return (
        <form onSubmit={addTodo}>
            <TextField
                name="text"
                label="Add Todo"
                value={text}
                onChange={({ target : { value } }) => setText(value)}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={!text.trim().length}
            >
                追加
            </Button>
        </form>
    )
}

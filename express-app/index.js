import app from './app';

const PORT_NUMBER = process.env.PORT || 8000;
app.listen(PORT_NUMBER, () => console.log(`App listening on port ${PORT_NUMBER}!`));
import { api } from '#root/api/index.js';
import { db } from '#root/database/index.js';
import { filterNullFields } from '#root/util/index.js';

const collectionName = 'movies';

async function getMovie(req, res) {
    try {
        const { id } = req.query;

        if (!id) return res.status(400).json({ status: 'Bad request' });

        const snapshot = db.collection(collectionName).doc(id);
        const result = await snapshot.get();

        if (!result) return res.status(404).json({ status: 'No movies found' });

        // Fetch movie data from OMDB API
        const omdbRes = await api.get('/', { params: { t: result.data().title } });
        const { Title, Year, Plot, ...omdbData } = omdbRes.data;

        // Return movie data and OMDB data (without the Title, Year, and Plot)
        res.status(200).json({ id, ...result.data(), info: omdbData });
    } catch (error) {
        res.status(500).send('Internal server error');
    }
}

async function postMovie(req, res) {
    try {
        const { title, description, year } = req.body;

        if (!title || !description || !year) return res.status(400).json({ status: 'Bad request' });

        const snapshot = db.collection(collectionName);

        const movie = {
            title,
            description,
            year
        };

        const result = await snapshot.add(movie);

        if (!result) return res.status(500).json({ status: 'Internal server error' });

        // Return the ID of the newly created movie
        res.status(201).json({ status: 'New movie added successfully', id: result.id });
    } catch (error) {
        res.status(500).send('Internal server error');
    }
}

async function putMovie(req, res) {
    try {
        const { id } = req.query;
        const { title, description, year } = req.body;

        if (!id) return res.status(400).json({ status: 'Bad request' });
        if (!title && !description && !year) return res.status(400).json({ status: 'Bad request' });

        const snapshot = db.collection(collectionName).doc(id);

        const movie = {
            title,
            description,
            year
        };

        const filteredMovie = filterNullFields(movie);

        const result = await snapshot.update(filteredMovie);

        console.log(result);

        if (!result) return res.status(500).json({ status: 'Internal server error' });

        // Return a success message
        res.status(200).json({ status: 'Movie updated successfully', id, updated: filteredMovie });
    } catch (error) {
        res.status(500).send('Internal server error');
    }
}

async function deleteMovie(req, res) {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({ status: 'Bad request' });

        const snapshot = db.collection(collectionName).doc(id);
        const result = await snapshot.delete();

        if (!result) return res.status(500).json({ status: 'Internal server error' });

        // Return a success message
        res.status(200).json({ status: `Movie "${id}" was successfully deleted` });
    } catch (error) {
        res.status(500).send('Internal server error');
    }
}

export { getMovie, postMovie, putMovie, deleteMovie };
import { useLazyApi, useApi } from './api';

export const searchJokeHandler = (query) => {
    return useLazyApi('GET', `jokes/search?query=${query}`);
}

export const getCategories = () => {
    return useApi('GET', `/jokes/categories`);
}

export const getJokeByCategoryHandler = (category) => {
    return useLazyApi('GET', `jokes/random?category=${category}`);
}

export const getRandomJokeHandler = () => {
	return useLazyApi('GET', `/jokes/random`);
};

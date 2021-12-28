import React, { useState, useEffect } from 'react';

import { getRandomJokeHandler } from '@/store/rest'

import Joke from '@/components/Joke'
import Spinner from '@/components/Spinner'

import { isNil, isEmpty } from 'lodash'

export default function Random() {

    const [randomJoke, setRandomJoke] = useState(null);

    const [getRandomJoke, { error: randomJokeError, loading: randomJokeLoading, data: randomJokeData }] = getRandomJokeHandler();

    useEffect(() => {
        const interval = setInterval(() => {
            getRandomJoke()
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (isNil(randomJokeData)) return

        setRandomJoke(randomJokeData)
    }, [randomJokeData])

    const renderRandomJoke = () => {
        if (isNil(randomJoke)) return <Spinner />

        return <Joke type={!isEmpty(randomJoke.categories) ? randomJoke.categories[0] : `random`} data={randomJoke} />
    }

    return (
        <div className="grid grid-cols-1 gap-4 my-5">
            {renderRandomJoke()}
        </div>
    )
}
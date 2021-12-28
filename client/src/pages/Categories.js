import React, { useState, useEffect } from 'react';

import { getCategories, getJokeByCategoryHandler } from '@/store/rest'

import Joke from '@/components/Joke'
import Spinner from '@/components/Spinner'

import { isNil } from 'lodash'

export default function Categories() {

    const [selectedCategory, setSelectedCategory] = useState(null)
    const [categoryJoke, setCategoryJoke] = useState(null);

    const {error: categoriesError, loading: categoriesLoading, data: categoriesData} = getCategories();
    const [getJokeByCategory, {error: jokeByCategoryError, loading: jokeByCategoryLoading, data: jokeByCategoryData}] = getJokeByCategoryHandler(selectedCategory);

    useEffect(() => {
        if (isNil(selectedCategory)) return;

        getJokeByCategory()
    }, [selectedCategory])

    useEffect(() => {
        if (isNil(jokeByCategoryData)) return;

        setCategoryJoke(jokeByCategoryData)
    }, [jokeByCategoryData])

    const renderCategories = () => {
        if (isNil(categoriesData)) return <Spinner />

        return (
            <ul className="list-disc p-5">
                {(categoriesData || []).map((el, index) => {
                    return <li key={index} role="button" onClick={() => setSelectedCategory(el)}>
                        <span className='text-lg capitalize semibold no-underline hover:underline'>{el}</span>
                    </li>
                })}
            </ul>
        )
    }

    const renderJokeByCategory = () => {
        if (isNil(categoryJoke)) return <div className='w-full text-center my-5'>please, select a category...</div>
        if (!isNil(categoryJoke) && isNil(selectedCategory)) return <Spinner />

        return <Joke type={selectedCategory} data={categoryJoke} />
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-5">
            <div>{renderCategories()}</div>
            <div className="col-span-2">{renderJokeByCategory()}</div>
        </div>
    )
}
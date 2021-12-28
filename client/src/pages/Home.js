import React, { useState, useEffect } from 'react';

import { useForm } from "react-hook-form";
import { FaSearch, FaTrash } from 'react-icons/fa'

import { searchJokeHandler } from '@/store/rest'

import Joke from '@/components/Joke'
import Spinner from '@/components/Spinner'

import { isNil, isEmpty } from 'lodash'

export default function Search() {

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const [query, setQuery] = useState(null)

    const [searchJoke, { error: searchJokeError, loading: searchJokeLoading, data: searchJokeData }] = searchJokeHandler(query);

    useEffect(() => {
        if (isNil(query)) return;

        searchJoke()
    }, [query])

    const onSubmit = (data) => {
        setQuery(data.query)
    }

    const renderResults = () => {
        if(isNil(query)) return null
        if (!isNil(query) && isNil(searchJokeData)) return <Spinner />
        const {total, result} = searchJokeData
        return (<>
            <p className='text-center'><span className="font-semibold">total:</span> {total}</p>
            {(result || []).map(e => {
                return <Joke key={e.id} type={!isEmpty(e.categories) ? e.categories[0] : `search`} data={e} />
            })}
        </>)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
            <div className="w-full">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="query" className="block text-gray-700 text-sm font-bold mb-2">Query</label>
                        <input id="query" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Type at least 3 char..."
                            {...register("query", { required: true, minLength: 3 })} />
                        <small className="text-red-700">{errors.query && "Invalid query field"}</small>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            <FaSearch />
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                            onClick={() => reset({query: null})}>
                            <FaTrash />
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-full">
                {renderResults()}
            </div>
        </div>
    )
}
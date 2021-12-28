import React from 'react';

import moment from 'moment'

export default ({ type, data }) => {

    const { id, url, value, icon_url, created_at } = data

    return (
        <div className="shadow-2xl my-5">
            <div className="border border-blue-500 bg-blue-100 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <span className="badge text-blue-100 bg-blue-700">{type}</span>
                <div className="mb-8">
                    <a className="no-underline hover:underline text-blue-900 font-bold text-base mb-4" href={url} target="_blank">{`#${id}`}</a>
                    <p className="text-blue-700 text-xl focus italic">{`"${value}"`}</p>
                </div>
                <div className="flex items-center">
                    <img className="w-10 h-10 rounded-full mr-4" src={icon_url} alt="Avatar of Writer" />
                    <div className="text-sm">
                        <p className="text-gray-900 leading-none">Chuck Norris</p>
                        <p className="text-gray-500">{moment(created_at).format("DD MMM YYYY")}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
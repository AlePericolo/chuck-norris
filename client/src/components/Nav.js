import React, { useState } from 'react';

import { Link } from 'react-router-dom';

export default () => {

    const [nav, setNav] = useState('home')

    return (
        <ul className="flex border-b">
            <li className={`mr-1 ${nav === 'home' ? '-mb-px': ''}`}>
                <Link to={"/"} 
                    className={`bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold ${nav === 'home' ? 'border-l border-t border-r rounded-t text-blue-700' : ''} `} 
                    onClick={()=>setNav('home')}>
                        Home
                </Link>
            </li>
            <li className={`mr-1 ${nav === 'categories' ? '-mb-px': ''}`}>
                <Link to={"/categories"} 
                    className={`bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold ${nav === 'categories' ? 'border-l border-t border-r rounded-t text-blue-700' : ''} `}
                    onClick={()=>setNav('categories')}>
                        Categories
                    </Link>
            </li>
            <li className={`mr-1 ${nav === 'random' ? '-mb-px': ''}`}>
                <Link to={"/random"} 
                    className={`bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold ${nav === 'random' ? 'border-l border-t border-r rounded-t text-blue-700' : ''} `}
                    onClick={()=>setNav('random')}>
                        Random
                    </Link>
            </li>
        </ul>
    )
}
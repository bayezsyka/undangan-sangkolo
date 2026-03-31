import React from 'react';
import { Link } from '@inertiajs/react';

export default function SidebarLink({ href, active = false, children, icon: Icon }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                active 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
        >
            <span className={`${active ? 'text-white' : 'text-gray-400 group-hover:text-indigo-600'}`}>
                {Icon}
            </span>
            <span className="font-semibold text-sm">
                {children}
            </span>
        </Link>
    );
}

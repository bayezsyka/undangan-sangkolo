import React from 'react';

export function PageHeader({ title, subtitle, actions }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="space-y-1">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{title}</h2>
                {subtitle && <p className="text-gray-500 font-medium text-sm leading-relaxed">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
    );
}

export function SectionCard({ children, title, description, actions, className }) {
    return (
        <div className={`bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden ${className}`}>
            {(title || actions) && (
                <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
                    <div>
                        {title && <h3 className="text-lg font-bold text-gray-900">{title}</h3>}
                        {description && <p className="text-xs text-gray-400 font-medium mt-0.5">{description}</p>}
                    </div>
                    {actions && <div className="flex items-center gap-2">{actions}</div>}
                </div>
            )}
            <div className="p-6">{children}</div>
        </div>
    );
}

export function StatusBadge({ status, type = 'default' }) {
    const types = {
        default: 'bg-gray-50 text-gray-500 border-gray-100',
        primary: 'bg-indigo-50 text-indigo-600 border-indigo-100',
        success: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        warning: 'bg-amber-50 text-amber-600 border-amber-100',
        danger: 'bg-rose-50 text-rose-600 border-rose-100',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${types[type] || types.default}`}>
            {status?.replace('_', ' ')}
        </span>
    );
}

export function EmptyState({ title, description, icon, actions }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 text-gray-300">
                {icon || (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-none tracking-tight">{title}</h3>
            <p className="text-gray-400 text-sm max-w-xs mx-auto mb-8 font-medium">{description}</p>
            {actions && <div className="flex items-center justify-center">{actions}</div>}
        </div>
    );
}

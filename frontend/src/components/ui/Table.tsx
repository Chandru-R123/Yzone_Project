import React from 'react';
import { clsx } from 'clsx';

interface Column<T> {
    key: string;
    header: string;
    render?: (item: T) => React.ReactNode;
    className?: string;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    keyField: keyof T;
    emptyMessage?: string;
    stickyHeader?: boolean;
    className?: string;
}

export function Table<T extends Record<string, unknown>>({
    columns,
    data,
    keyField,
    emptyMessage = 'No data available.',
    stickyHeader = false,
    className,
}: TableProps<T>) {
    return (
        <div className={clsx('table-wrapper', className)}>
            <table className="table">
                <thead className={clsx(stickyHeader && 'sticky top-0 z-10')}>
                    <tr>
                        {columns.map(col => (
                            <th key={col.key} className={col.className}>{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="text-center py-10 text-muted">
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map(item => (
                            <tr key={String(item[keyField])}>
                                {columns.map(col => (
                                    <td key={col.key} className={col.className}>
                                        {col.render ? col.render(item) : String(item[col.key as keyof T] ?? '')}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

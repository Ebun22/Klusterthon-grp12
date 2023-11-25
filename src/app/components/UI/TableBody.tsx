"use client"
import React, { ReactEventHandler, useState } from 'react';

interface props {
    details: Array<string>,
}

const TableBody = ({ details }: props) => {
    return (
        <>
            <tr>
                {
                    details.map((details: string, index: number) => (
                        <>
                            <td className={`border-spacing-x-12 p-6 text-sm text-gray-500 capitalize ${(details === "Closed") && 'text-red-400'} ${(details === "Open") && 'text-emerald-400'}`}>
                                <span className={`rounded-lg p-2 ${(details === "Closed") && 'bg-red-100'} ${(details === "Open") && 'bg-emerald-100'}`}>
                                    {details}
                                </span>
                            </td>
                        </>
                    ))
                }
            </tr>

        </>
    )
}

export default TableBody;
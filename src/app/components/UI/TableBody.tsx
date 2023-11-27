"use client"
import React, { ReactEventHandler, useState } from 'react';

const TableBody = ({ details, id}) => {
    return (
            <tr id={id}>
                {
                    details.map((details: string, index: number) => (
                            <td key={index} id={id} className={`border-spacing-x-12 p-2 text-sm text-gray-500 capitalize lg:p-6'}`}>                          
                                    {details}
                            </td>
                    ))
                }
            </tr>
    )
}

export default TableBody;
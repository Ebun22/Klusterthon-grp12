"use client"
import React, { ReactEventHandler, useState } from 'react';

interface props {
    head: Array<string | React.ReactNode>, 
    children: React.ReactNode,
}

const TableHead = ({ head, children }: props) => {
    return (
        <>
            <div className="mt-6 my-8 w-full">
                <table className="table-auto w-full">
                    <thead className='w-24'>
                        <tr>
                            {
                                head.map((head: string | React.ReactNode, index: number) => (
                                    <>
                                        <td className="p-0 border-r border-farmer-green w-24 lg:w-full" key={index}>{head}</td>                               
                                    </>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TableHead;
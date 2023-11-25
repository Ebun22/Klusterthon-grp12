"use client"
import React, { ReactEventHandler, useState } from 'react';

interface props {
    head: Array<string | React.ReactNode>, 
    children: React.ReactNode,
}

const TableHead = ({ head, children }: props) => {
    return (
        <>
            <div className="mt-6 w-full">
                <table className="table-auto w-full ">
                    <thead className=''>
                        <tr>
                            {
                                head.map((head: string | React.ReactNode, index: number) => (
                                    <>
                                        <td className="p-0 border-r border-rose-50" key={index}>{head}</td>                               
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
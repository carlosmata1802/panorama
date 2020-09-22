import React, { useState, useEffect } from 'react';

const Paginate = ({ handleSetRows, total, from, setFrom, to, setTo }) => {
    const [pages, setPages] = useState(null);
    const [actualPage, setActualPage] = useState(1);
    const [rows, setRows] = useState(10)

    const getPages = () => {
        let pages = total % rows !== 0 ? parseInt(total / rows) + 1 : parseInt(total / rows);
        setPages([...Array(pages).keys()].map(x => x + 1));
        console.log([...Array(pages).keys()].map(x => x + 1), total % rows)
    }

    const handleChange = e => {
        handleSetRows(e.target.value);
        setRows(e.target.value)
        setActualPage(1)
    }

    useEffect(() => {
        getPages();
    }, [total, rows])
    useEffect(() => {
        setFrom(actualPage === 1 ? 0 : (actualPage - 1) * rows)
        setTo(actualPage === 1 ? rows : ((actualPage - 1) * rows) + Number(rows))
    }, [actualPage])

    return (
        <div className="d-flex justify-content-end align-items-center">
            <div>
                <label htmlFor="rows" className="m-0">Rows per page </label>
                <select id="rows" onChange={handleChange}>
                    {[10, 15, 20, 25, 50].map(row => (
                        <option key={row}>{row}</option>
                    ))}
                </select>
            </div>
            <div className="mx-2">
                <p className="m-0">{from + 1} - {to > 100 ? 100 : to > total ? total : to} of {total}</p>
            </div>
            <div className="d-flex align-items-center">
                {pages && pages.length > 1 && pages.map(page => (
                    <p className="m-0" key={page} onClick={() => setActualPage(page)} className={`m-2 p-2 ${actualPage === page ? 'text-primary' : ''}`}>{page}</p>
                ))}
                {pages && pages.length > 1 && <p className="m-0" onClick={() => actualPage < pages[pages.length - 1] ? setActualPage(actualPage + 1) : ''}>NEXT </p>}
            </div>

        </div>
    );
}

export default Paginate;
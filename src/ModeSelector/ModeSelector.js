import React from 'react'

export default props => {

    const smallUrl = `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
    const bigUrl = `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`

    return (
        <div className="text-center mt-5">
            <button onClick={() => props.onSelect(smallUrl)} className="btn btn-success mr-2">Загрузить 32 элемента</button>
            <button onClick={() => props.onSelect(bigUrl)} className="btn btn-danger">Загрузить 1000 элементов</button>
        </div>
    )
}
import React from 'react'
import './Table.css'

export default props => (
    <table className="table">
        <thead>
            <tr>
                <th onClick={props.onSort.bind(null, 'id')}>
                    ID {props.sortField === 'id' ? <small>{props.sort === 'asc' ? <i className="arrow up"></i> : <i className="arrow down"></i>}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'firstName')}>
                    First Name {props.sortField === 'firstName' ? <small>{props.sort === 'asc' ? <i className="arrow up"></i> : <i className="arrow down"></i>}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'lastName')}>
                    Last Name {props.sortField === 'lastName' ? <small>{props.sort === 'asc' ? <i className="arrow up"></i> : <i className="arrow down"></i>}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'email')}>
                    E-mail {props.sortField === 'email' ? <small>{props.sort === 'asc' ? <i className="arrow up"></i> : <i className="arrow down"></i>}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'phone')}>
                    Phone {props.sortField === 'phone' ? <small>{props.sort === 'asc' ? <i className="arrow up"></i> : <i className="arrow down"></i>}</small> : null}
                </th>
            </tr>
        </thead>
        <tbody>
            {props.data.map(item => (
                <tr key={item.id + item.phone} onClick={props.onRowSelect.bind(null, item)}>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                </tr>
            ))}
        </tbody>
    </table>
)
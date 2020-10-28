/* eslint-disable import/no-anonymous-default-export */
import React,{ useState, useEffect } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';
const baseUrl = 'http://localhost:3000/employee';
export default (props) => {
    const [listEmployee, setListEmployee] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            let url = baseUrl + '/list';
            await axios.get(url)
            .then(res => {
                if(res.data.success && res.data.data.length > 0){
                    setListEmployee(res.data.data);
                } else {
                    alert('Error : Server error');
                }
            })
            .catch(err => {
                console.log(err);
            });
        } catch (error) {
            console.log(error);
        }
    }
    
    const onDelete = async (employeeId) => {
        try {
            let url = baseUrl + '/delete';
            await axios.delete(url,{
                data: {
                    id: employeeId
                }
            })
            .then(res => {
                if(res.data.success){
                    alert(res.data.msg);
                } else {
                    alert(res.data.msg);
                }
                fetchData();
            });
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
        <table className="table table-hover table-striped">
            <thead className="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Role</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
                <th colSpan="2">Action</th>
            </tr>
            </thead>
            <tbody>
                { listEmployee.map((data, index) => {
                    return (
                        <tr key={index} >
                            <th>{ data.id }</th>
                            <td>{ data.role.role }</td>
                            <td>{ data.name }</td>
                            <td>{ data.email }</td>
                            <td>{ data.address }</td>
                            <td>{ data.phone }</td>
                            <td>
                            <Link className="btn btn-outline-info" to={ "/edit/" + data.id }>Edit</Link>
                            </td>
                            <td>
                            <button className="btn btn-outline-danger" onClick={ () => onDelete(data.id) }> Delete </button>
                            </td>
                        </tr>
                    );
                })}
            
            </tbody>
        </table>
      </>
    );
}
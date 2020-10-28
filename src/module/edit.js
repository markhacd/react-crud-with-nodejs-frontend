/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import  { useHistory  } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
const baseUrl = 'http://localhost:3000/employee';

export default (props) => {
    const employeeId = props.match.params.employeeId;
    const [campName, setCampName] = useState('');
    const [campEmail, setCampEmail] = useState('');
    const [campPhone, setCampPhone] = useState('');
    const [campAddress, setCampAddress] = useState('');
    const [selectRole, setSelectRole] = useState(0);
    const [roleList, setRoleList] = useState([]);
    let history = useHistory();

    useEffect(() => {
        fetchDataEmployee();
        fetchRoleList();
    },[]);

    const fetchDataEmployee = async () => {
        try {
            await axios.get(baseUrl + '/get/' + employeeId)
            .then((res) => {
                if(res.data.success && res.data.data.length > 0){
                    // console.log(res.data.data);
                    const data = res.data.data[0];
                    setCampName(data.name);
                    setCampEmail(data.email);
                    setCampPhone(data.phone);
                    setCampAddress(data.address);
                    setSelectRole(data.roleId);
                }else{
                    console.log(res.data);
                    alert("Error : Employee not found");
                }
            })
            .catch((err) => {
                console.log(err);
            });
        } catch (error) {
            console.log(error);
        }
        
    };

    const fetchRoleList = async () => {
        try {
            await axios.get(baseUrl+'/role/list')
            .then((res) => {
                // console.log(res);
                if (res.data.success && res.data.data.length > 0) {
                    setRoleList(res.data.data);
                } else {
                    console.log(res.data);
                    alert("Error : Can't get role list");
                }
            })
            .catch((err) => {
                console.log(err);
            }); 
        } catch (error) {
            console.log(error);
        }
    };

    const sendUpdate = () => {
        if(campName.length === 0){
            alert('Input field name');
        }else if(campEmail.length === 0){
            alert('Input field email');
        }else if(campPhone.length === 0){
            alert('Input field phone');
        }else if(campAddress.length === 0){
            alert('Input field address');
        }else if(selectRole === 0){
            alert('Select role');
        }else{
            const dataPost = {
                name: campName,
                email: campEmail,
                phone: campPhone,
                address: campAddress,
                role: selectRole,
            };

            axios.put(baseUrl + '/update/' + employeeId,dataPost)
            .then((response) => {
                // console.log(response);
                if (response.data.success) {
                    alert(response.data.msg);
                    history.push('/');
                }else{
                    alert("Error : Update unsuccessfully")
                }
            })
            .catch((err) => {
                console.log(err);
                alert('Error : ' + err)
            })
        }
    };

    return (
        <>
            <div className="col-12">
                <div className="form-row justify-content-center">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Name </label>
                        <input type="text" className="form-control"  placeholder="Name" value={campName} onChange={(value)=> setCampName(value.target.value)}/>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Email</label>
                        <input type="email" className="form-control"  placeholder="Email" value={campEmail} onChange={(value)=> setCampEmail(value.target.value)}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputState">Role</label>
                        <select id="inputState" className="form-control" value={selectRole} onChange={(value)=> setSelectRole(value.target.value)}>
                            <option defaultValue>Choose...</option>
                            { roleList.map( (data, index) => {
                                return (
                                    <option key={index} value={ data.id }>{ data.role }...</option>
                                );
                            }) }
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Phone</label>
                        <input type="number" className="form-control"  placeholder="Phone"  value={campPhone} onChange={(value)=> setCampPhone(value.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="col-12">
            <div className="form-group">
                <label htmlFor="inputAddress">Address</label>
                <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={campAddress} onChange={(value)=> setCampAddress(value.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={ () => sendUpdate() }>Update</button>
            </div>
        </>
    );
}
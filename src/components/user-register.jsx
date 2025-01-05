import axios from "axios";
import { useFormik } from "formik";
import { useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export function UserRegister(){

    const [status, setStatus] = useState('');
    const [errorClass, setErrorClass] = useState('');

    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            UserId:'',
            UserName:'',
            Password:'',
            Email:'',
            Mobile:''
        },
        onSubmit : useCallback((user) => {
            axios.post(`http://127.0.0.1:5000/register-user`, user)
            .then(()=>{
                alert('Reigstered Successfully..');
                navigate('/user-login');
            })
        },[])
    })

    function VerifyUser(e){
        axios.get(`http://127.0.0.1:5000/users`)
        .then(response=> {
             var user = response.data.find(item=> item.UserId===e.target.value);
             if(user) {
                 setStatus('User Id Taken - Try Another');
                 setErrorClass('text-danger');
             } else {
                setStatus('User Id Available');
                setErrorClass('text-success');
             }
        })
    }

    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
                <h2>Register User</h2>
                <dl>
                    <dt>UserId</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserId" onKeyUp={VerifyUser} /></dd>
                    <dd className={errorClass}>{status}</dd>
                    <dt>User Name</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserName"/></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="Password" /></dd>
                    <dt>Email</dt>
                    <dd><input type="email" onChange={formik.handleChange} name="Email"/></dd>
                    <dt>Mobile</dt>
                    <dd><input type="text"  onChange={formik.handleChange} name="Mobile"/></dd>
                </dl>
                <button className="btn btn-primary">Register</button>
            </form>
            <Link to="/user-login">Existing User ?</Link>
        </div>
    )
}
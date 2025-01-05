import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";


export function UserLogin(){

    const [cookies, setCookies, removeCookie] = useCookies(['userid']);

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            UserId: '',
            UserName: '',
            Password:''
        },
        onSubmit : (user)=> {
            axios.get(`http://127.0.0.1:5000/users`)
            .then(response=>{
                var result = response.data.find(item=> item.UserId===user.UserId);
                if(result) {
                    if(user.Password===result.Password) {
                        setCookies('userid', user.UserId);
                        navigate('/user-dash');          
                    } else {
                        alert('Invalid Password');
                    }
                } else {
                    alert('Invalid UserId');
                }
            })
        }
    })

    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
                <h3>User Login</h3>
                <dl>
                    <dt>UserId</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserId" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="Password" /></dd>
                </dl>
                <button type="submit" className="btn btn-warning">Login</button>
            </form>
            <Link to="/user-register">New User Register</Link>
        </div>
    )
}
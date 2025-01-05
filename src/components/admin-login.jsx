import axios from "axios"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"


export function AdminLogin(){

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            UserId:'',
            Password:''
        },
        onSubmit:(admin)=> {
              axios.get(`http://127.0.0.1:5000/admin`)
              .then(response=>{
                   var user = response.data.find(item=> item.UserId===admin.UserId);
                   if(user){
                       if(user.Password===admin.Password) {
                           navigate('/admin-dash');
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
            <h3>Admin Login</h3>
            <form className="w-25" onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Admin User Name</dt>
                    <dd><input type="text" name="UserId" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange} className="form-control" /></dd>
                </dl>
                <button type="submit" className="btn btn-warning w-100">Login</button>
            </form>
        </div>
    )
}
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"


export function DeleteVideo(){

    let params = useParams();
    let navigate = useNavigate();

    const [videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Likes:0, Dislikes:0, Views:0, CategoryId:0}])

    function GetVideo(){
        axios.get(`http://127.0.0.1:5000/video/${params.id}`)
        .then(response=>{
             setVideos(response.data);
        })
    }

    useEffect(()=>{

        GetVideo();

    },[])

    function handleDeleteClick(){

         axios.delete(`http://127.0.0.1:5000/delete-video/${params.id}`)
         .then(()=>{
             alert('Deleted Successfully');
             navigate('/admin-dash');
         })

    }

    return(
        <div className="container-fluid">
            <h2>Delete Video </h2>
            <div className="card w-50">
                <div className="card-header">
                   <h4>{videos[0].Title}</h4>
                </div>
                <div className="card-body">
                    <iframe width="100%" height="300" src={videos[0].Url}></iframe>
                </div>
                <div className="card-footer text-center">
                    <button onClick={handleDeleteClick} className="btn btn-danger me-2">Yes</button>
                    <Link className="btn btn-warning" to="/admin-dash">Cancel</Link>
                </div>
            </div>
        </div>
    )
}
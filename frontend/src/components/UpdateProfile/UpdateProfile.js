import { Typography,Avatar, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { CLEAR_MESSAGE } from '../../constants/post';
import { useNavigate, usNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import "./UpdateProfile.css"
import logo from "../../images/logo.jpg"

const UpdateProfile = () => {

    const {user,error,loading}= useSelector(state=>state.user)
    
    const {error: updateError,loading:updateLoading,message}= useSelector(state=> state.like)
    const [avatar, setAvatar] = useState();
    const [avatarPrev,setAvatarPrev]= useState(user.avatar.url)
    const [name,setName]= useState(user.name);
    const [email,setEmail]= useState(user.email)
    const alert= useAlert();
    const dispatch= useDispatch()
    const navigate= useNavigate()

    const imageSubmitHandler=(e)=>{
        
        const file= e.target.files[0]
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
        console.log(Reader.readyState)    

        Reader.onload=()=>{
            if (Reader.readyState === 2){
                setAvatarPrev(Reader.result)
            }
            setAvatar(Reader.result)
        }
    }

    const submitHandler= async(e)=>{
        e.preventDefault();
        await dispatch(updateProfile(name,email,avatar))

        dispatch(loadUser())



    }

    useEffect(()=>{

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(updateError){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(message){
            navigate("/account")
            alert.success(message)
           

        }
    },[alert,message,error,dispatch,navigate,updateError])
    
    
  return (
      loading ===true || updateLoading===true ? <Loader /> :
    <div className='updateProfile'>
        <form className="updateProfileForm" onSubmit={submitHandler}>

        {/* <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Aap
        </Typography> */}

        <img src={logo} alt="Sendy" style={{width:"35%",margin:"1.5vmax 0vmax"}} />
        <Avatar
          src={avatarPrev}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type='file' accept='image/*' onChange={imageSubmitHandler}/>

        <input type='text' 
                placeholder='enter name'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className="updateProfileInputs"
                required
        />

        <input
          type="email"
          placeholder="Email"
          className="updateProfileInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button type='submit'> Update</Button>

        </form>
    </div>
  )
}

export default UpdateProfile
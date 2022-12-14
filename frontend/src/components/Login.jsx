import React ,{ useState, useEffect }from "react";
import {useDispatch, useSelector} from "react-redux";
import { NavLink,useNavigate } from "react-router-dom";
import {LoginUser,reset} from "../features/authSlice";


const Login = () => {
  const [email, setEmail] =useState("");
  const [password, setPassword]= useState("");
  const dispatch= useDispatch();
  const navigate= useNavigate();
  const {user, isError, isSuccess, isLoading, message}= useSelector((state)=>state.auth);
  useEffect (()=>{
  if(user || isSuccess){
    navigate("/dashboard");
  }
  dispatch(reset());
  },[user, isSuccess, dispatch, navigate]);

  const Auth= (e)=>{
    e.preventDefault();
    dispatch(LoginUser({email,password}));
  }

  return (
    <div>
      <section className="hero is-fullheight is-fullwidth" >
        <div className="hero-body has-background-light">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4">
                <form onSubmit={Auth} className="box">
                 { isError && <p className="has-text-centered">{message}</p>}
                <h1 className="title is-4 ">Đăng Nhập</h1>
                  <div className="field">
                    <lable className="label">Email/ Tên đăng nhập</lable>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value= {email} onChange={(e)=> setEmail(e.target.value)}
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <lable className="label">Mật khẩu</lable>
                    <div className="control">
                      <input
                        type="password"
                        className="input"
                        value= {password} 
                        onChange={(e)=> setPassword(e.target.value)}
                        placeholder="******"
                      />
                    </div>
                  </div>
                  <div className="field mt-5">
                   <button type="submit" className="button is-succcess is-fullwidth">{isLoading? 'Loading...':"Đăng nhập"}</button>
                  </div>
                  <NavLink to={"/signup"}>
               Chưa có tài khoản? Đăng ký ngay.
            </NavLink>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;

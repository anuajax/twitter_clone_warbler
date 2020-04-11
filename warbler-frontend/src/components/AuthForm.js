import React, { Component } from 'react';
import errors from '../store/reducers/errors';
export default class AuthForm extends Component{
constructor(props){
    super(props);
this.state= {
    email: "",username: "",password: "",profileImageUrl: ""
};

}

handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value    //es2015 computed property names
    });
};

handleSubmit = (e) => {
    e.preventDefault();
    const authType = this.props.signUp ? "signup" : "signin";
    this.props.onAuth(authType,this.state).then(() => {
       // console.log("legged IN");//instead of this use react router to redirect
this.props.history.push("/");
    }).catch(() => {
return;
    });
}

render(){
    const {email,username,password,profileImageUrl} = this.state;
    const {heading,buttonText,signUp,errors,history,removeError} = this.props;
    history.listen(() => { removeError(); });  //to remov error we get history from react-router
    return(
        <div>
            <div className="row justify-content-md-center text-center">
                <div className="col-md-6">
                   <form onSubmit={this.handleSubmit}>
                      <h2>{heading}</h2>

                    {errors.message && <div className="alert alert-danger">{errors.message}</div>}

                      <label htmlFor="email">Email:</label>
                      <input className="form-control" id="email" name="email"
                       onChange={this.handleChange} value={email} type="text"/>
                       <label htmlFor="password">Password:</label>
                      <input className="form-control" id="password" name="password"
                       onChange={this.handleChange}  type="password"/>

                     {signUp && (  /*idea of showing username and image input while signing up and not showingh at log in*/ 
                     <div>
                          <label htmlFor="username">Username:</label>
                      <input className="form-control" id="username" name="username"
                       onChange={this.handleChange} value={username} type="text"/>
                       <label htmlFor="image-url">Image-Url:</label>
                      <input className="form-control" id="image-url" name="profileImageUrl"
                       onChange={this.handleChange} value={profileImageUrl} type="text"/>
                     </div>
                     )
                     }
<button className="btn btn-primary btn-lg btn-block" type="submit">{buttonText}</button>
                   </form>
                </div>
            </div>
        </div>
    );

}

}

import React,{ Component } from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux"; 
import Logo from "../images/warbler-logo.png"
import {logout}  from '../store/actions/auth';
class Navbar extends Component{
    logout = e => {
e.preventDefault();
this.props.logout();
    }
    render(){
        return(
            <nav className="navbar navbar-expand">
                <div className = "container-fluid">
                    <div className="navbar-header">
                    <Link to="/" className="navbar-brand" >
                         <h4>Warbler</h4>
                        
                    </Link>
                    </div>

                    {this.props.currentUser.isAuthenticated ? (
                        <ul className="nav navbar-nav navbar-right">
                            <li> <Link to={`/users/${this.props.currentUser.user.id}/messages/new`}>
                            New Message</Link></li>
                            <li> <a onClick={this.logout}>Logout</a> </li>
                        </ul>
                    ):
               (
                <ul className="nav navbar-nav navbar-right">
                   <li> <Link to="/signup">SignUp</Link> </li>
                   <li><Link to="/signin">Login</Link> </li>
                </ul>
               )}
                </div>
            </nav>

        );
    }
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    };
}
export default connect(mapStateToProps,{logout})(Navbar);

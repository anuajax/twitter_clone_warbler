import axios from "axios";


export function setTokenHeader(token){  
    if(token){  //if have that token i.e logged in pass that token to all future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else{
       delete axios.defaults.headers.common["Authorization"];
    }
} 



export function apiCall(method,path,data){
return new Promise((resolve,reject) => {
    return axios[method.toLowerCase()](path,data)  //cant use dot here becas we need to evaluate the value of mehthod
    .then( res => {
       return resolve(res.data);
    })
    .catch(err => {
        return reject(err.response.data.error)
    });
});
}
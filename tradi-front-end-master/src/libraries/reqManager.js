import axios from 'axios'

const reqManager = axios.create({
    baseURL : 'http://127.0.0.1:5000/'
});

const addJwtToken = (request) => {
    //console.log(request);
    const token = localStorage.getItem('jwt_token');
    //console.log(token);
    if(token !==  null){
        request.data.token = token;
        console.log(request.url);        
    }
    return request;
}

reqManager.interceptors.request.use(addJwtToken);


export default reqManager
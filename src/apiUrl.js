console.log(Object.keys(process.env));
//write logic to set api url to localhost:3000 if the variable is there

let apiUrl;

if(Object.keys(process.env).findIndex((key) => key=='REACT_APP_LOCAL_VERSION') === -1){
	apiUrl = 'https://mapulate-api.herokuapp.com/'
} else {
	apiUrl = 'http://localhost:8000/'
}

export default apiUrl;
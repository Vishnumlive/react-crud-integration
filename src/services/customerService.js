export async function fetchCustomer(){

    var url = "http://localhost:8000/customers";

    const response = await fetch(url);

    if(!response.ok){
        throw {message : response.statusText, statusCode : response.status} // eslint-disable-line
    }
    const data = await response.json();

    return data;
    
}

export async function deleteCustomerById(userid){

    var url = `http://localhost:8000/deleteCustomer/${userid}`;

    const response = await fetch(url,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        
    });
    
    if(!response.ok){
        throw {message : response.statusText, statusCode : response.status} // eslint-disable-line
    }

    const data = await response.json();

    return data;

}

export async function getSingleUser(userid){
   
    var url = `http://localhost:8000/customer/${userid}`;

    const response = await fetch(url);
    if(!response.ok){
        throw {message : response.statusText, statusCode : response.status} // eslint-disable-line
    }

    const data = await response.json();
    
    return data;
}

export async function updateUserDetails(userData){
    
    var url = `http://localhost:8000/customer/${userData._id}`

    const response = await fetch(url,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify(userData),
    });

    if(!response.ok){
        throw {message : response.statusText, statusCode : response.status} // eslint-disable-line
    }

    const data = await response.json();
    
    return data;
    
    
}

export async function addCustomer(userDetails){

    const url = "http://localhost:8000/addCustomer";

    const response = await fetch(url, {
        method : "POST",
        headers : {
            'Content-Type' : "application/json"
        },
        body : JSON.stringify(userDetails)
    });

    if(!response.ok){
        throw {message : response.statusText, statusCode : response.status} // eslint-disable-line
    }
    const data = await response.json();

    return data;

}
import { useEffect, useState } from "react"

export const CustomerList = () => {

    const initialUserData = {
        "firstName" : "",
        "middleName" : "",
        "lastName" : "",
        "dateOfBirth" : "",
        "status" : "",
    }

    const [customers, setCustomers] = useState([{}]);

    const [deleted, setDeleted ] = useState(false);

    const [updated, setUpdated ] = useState(false);

    const [editEnable, setEditEnable] = useState(false);

    const [singleUser, setSingleUser] = useState(initialUserData);

    
    useEffect(()=>{

        var url = "http://localhost:8000/customers";

        async function fetchCustomer(){
            try {
                const result = await fetch(url);
                const data = await result.json();

                const formatedData = data.map((item) => (
                    {
                    ...item,
                    dateOfBirth: new Date(item.dateOfBirth).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })
                }))
                setDeleted(false);
                setUpdated(false);
                setCustomers(formatedData);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
            
        }

        fetchCustomer();
    },[deleted,updated])

    async function deleteCustomer(userid){
        
        var url = `http://localhost:8000/deleteCustomer/${userid}`;

        const result = await fetch(url,{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              // You may need to include authentication headers or other headers as required by your API
            },
            // You can include a request body if needed
            // body: JSON.stringify({}),
          });

        if(result.ok){
            setDeleted(true);
        }

    }

    async function getUser(userid){
        var url = `http://localhost:8000/customer/${userid}`;

        const result = await fetch(url);
        const data = await result.json();
        
        if(data){

            data.dateOfBirth = formatDate(data.dateOfBirth);
            setSingleUser(data);
        }
    }

    async function updateUser(userData){
        var url = `http://localhost:8000/customer/${userData._id}`

        const result = await fetch(url,{
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              
            },
            body: JSON.stringify(userData),
        });

        const data = await result.json();
        
        if(data){

            setUpdated(true);
            console.log("User Updated");
        }
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const handleDelete = (userid) => {
        deleteCustomer(userid);
        
    }

    const handleCustomerEdit = (userid) => {
        getUser(userid);
        setEditEnable(true);
    }

    const handleCloseModal = () => {
        setEditEnable(false);
    }

    const handleChange = (event) =>{
        setSingleUser({
            ...singleUser,
            [event.target.name] : event.target.value
        })

    }

    const handleEditSubmit = (event) =>{
        event.preventDefault();
        
        updateUser(singleUser);

        setEditEnable(false);
    }

  return (
    <div>


<link rel="stylesheet" href="https://cdn.tailgrids.com/tailgrids-fallback.css" />



<section className="bg-white py-20 lg:py-[120px]">
   <div className="container">
      <div className="flex flex-wrap -mx-4">
         <div className="w-full px-4">
            <div className="max-w-full overflow-x-auto">
               <table className="table-auto w-full">
                  <thead>
                     <tr className="bg-primary text-center">
                        <th
                           className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           border-l border-transparent
                           "
                           >
                           First Name
                        </th>
                        <th
                           className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                           >
                           Middle Name
                        </th>
                        <th
                           className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                           >
                           Last Name
                        </th>
                        <th
                           className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                           >
                           Date of birth
                        </th>
                        <th
                           className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                           >
                           Status
                        </th>
                        <th
                           className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           border-r border-transparent
                           "
                           >
                           Action
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                    
                    { customers.map((customer) => (

                        
                        
                        <tr>
                            <td
                            className="
                            text-center text-dark
                            font-medium
                            text-base
                            py-5
                            px-2
                            bg-[#F3F6FF]
                            border-b border-l border-[#E8E8E8]
                            "
                            >
                            { customer.firstName }
                            </td>
                            <td
                            className="
                            text-center text-dark
                            font-medium
                            text-base
                            py-5
                            px-2
                            bg-white
                            border-b border-[#E8E8E8]
                            "
                            >
                            { customer.middleName }
                            </td>
                            <td
                            className="
                            text-center text-dark
                            font-medium
                            text-base
                            py-5
                            px-2
                            bg-[#F3F6FF]
                            border-b border-[#E8E8E8]
                            "
                            >
                            { customer.lastName }
                            </td>
                            <td
                            className="
                            text-center text-dark
                            font-medium
                            text-base
                            py-5
                            px-2
                            bg-white
                            border-b border-[#E8E8E8]
                            "
                            >
                            { customer.dateOfBirth }
                            </td>
                            <td
                            className="
                            text-center text-dark
                            font-medium
                            text-base
                            py-5
                            px-2
                            bg-[#F3F6FF]
                            border-b border-[#E8E8E8]
                            "
                            >
                            { customer.status }
                            </td>
                            <td
                            className="
                            text-center text-dark
                            font-medium
                            text-base
                            py-5
                            px-2
                            bg-white
                            border-b border-r border-[#E8E8E8]
                            "
                            >
                            
                            <button
                                onClick={ () => {handleCustomerEdit(customer._id)} }
                                className="
                                border border-primary
                                py-2
                                px-6
                                mx-1
                                text-primary
                                inline-block
                                rounded
                                hover:bg-primary hover:text-white
                                "
                                >
                            Edit
                            </button>

                            <button
                                onClick={ () => { handleDelete( customer._id ) }}
                                className="
                                border border-primary
                                py-2
                                px-6
                                text-primary
                                inline-block
                                rounded
                                hover:bg-primary hover:text-white
                                "
                                >
                            Delete
                            </button>
                            </td>
                        </tr>
                    ))}

                    {/* --------------------- */}
                     
                     
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   </div>
</section>

    
    { editEnable === true && (
        <div className="modal-overlay">
            <div className="modal">
                <button className="modal-close-btn" onClick={handleCloseModal}>
                &times;
                close model
                </button>
                <div className="modal-content">
                {/* Modal content goes here */}
                
                <div className="flex items-center justify-center p-12">

                    <div className="mx-auto w-full max-w-[550px]">
                        <form  onSubmit={ handleEditSubmit } action="" method="POST">
                        <div className="mb-5">
                            <label
                            htmlFor="firstName"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                            First Name
                            </label>
                            <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            onChange={ handleChange }
                            value={singleUser.firstName}
                            placeholder="First Name"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label
                            htmlFor="middleName"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                            Middle Name
                            </label>
                            <input
                            type="text"
                            name="middleName"
                            id="middleName"
                            onChange={ handleChange }
                            value={singleUser.middleName}
                            placeholder="Middle Name"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label
                            htmlFor="lastName"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                            Last Name
                            </label>
                            <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            onChange={ handleChange }
                            value={singleUser.lastName}
                            placeholder="Last Name"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label
                            htmlFor="message"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                            Date of birth
                            </label>
                            <input
                            type="date"
                            name="dateOfBirth"
                            id="dateOfBirth"
                            placeholder="Date of birth"
                            onChange={ handleChange }
                            value={singleUser.dateOfBirth}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                            
                        </div>

                        <div className="mb-5">
                            <label
                            htmlFor="status"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                            User Status
                            </label>
                            <select className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            name="status"
                            id="status"
                            onChange={ handleChange }
                            // value={formData.status}
                            >
                                <option value="active" selected={(singleUser.status) === "active" ? true : false }>active</option>
                                <option value="inactive" selected={(singleUser.status) === "inactive" ? true : false }>inactive</option>
                                <option value="deleted" selected={(singleUser.status) === "deleted" ? true : false }>deleted</option>
                            </select>
                            
                        </div>
                        
                        <div>
                            <button
                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                            >
                            Update
                            </button>
                        </div>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )}               
    

    </div>
  )
}

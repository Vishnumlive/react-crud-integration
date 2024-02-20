import { useEffect, useState } from "react"

export const CustomerList = () => {

    const [customers, setCustomers] = useState([{}]);

    const [deleted, setDeleted ] = useState(false);

    const [editEnable, setEditEnable] = useState(false);

    console.log(deleted);
    useEffect(()=>{

        var url = "http://localhost:8000/customers";

        async function fetchCustomer(){
            try {
                const result = await fetch(url);
                const data = await result.json(result);

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
                setCustomers(formatedData);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
            
        }

        fetchCustomer();
    },[deleted])

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

        const data = await result.json(result);

        
    }

    const handleDelete = (userid) => {
        deleteCustomer(userid);
        
    }

    const handleCustomerEdit = (userid) => {
        setEditEnable(true);
    }

    const handleCloseModal = () => {
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

    
    { editEnable == true && (
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
                        <form  action="" method="POST">
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
                            
                            // value={formData.firstName}
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
                            
                            // value={formData.middleName}
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
                            
                            // value={formData.lastName}
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
                            
                            // value={formData.dateOfBirth}
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
                            
                            // value={formData.status}
                        >
                                <option>active</option>
                                <option>inactive</option>
                                <option>deleted</option>
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

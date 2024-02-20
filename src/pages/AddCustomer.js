import { json } from "react-router-dom";
import { useState } from "react";

export const AddCustomer = () => {

    const initialFormData = {
        "firstName" : "",
        "middleName" : "",
        "lastName" : "",
        "dateOfBirth" : "",
        "status" : "",
    }

    const [formData, setFormData] = useState(initialFormData);

    async function addNewCustomer(userData){
        const url = "http://localhost:8000/addCustomer";
        const response = await fetch(url, {
            method : "POST",
            headers : {
                'Content-Type' : "application/json"
            },
            body : JSON.stringify(userData)
        });

        const data = await response.json();

        if(data._id){
            setFormData(initialFormData);
            
            console.log("User added successfullyy");
        }
    }
    

    const handleAddCustomer = (event) => {
        event.preventDefault();
        
        const customerData = formData;
        addNewCustomer(customerData);

    }

    const handleChange = (event) =>{
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        })

    }

  return (
    <div>
        <div className="flex items-center justify-center p-12">

            <div className="mx-auto w-full max-w-[550px]">
                <form onSubmit={ handleAddCustomer} action="" method="POST">
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
                    value={formData.firstName}
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
                    value={formData.middleName}
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
                    value={formData.lastName}
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
                    value={formData.dateOfBirth}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    {/* <textarea
                    rows="4"
                    name="message"
                    id="message"
                    placeholder="Type your message"
                    class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    ></textarea> */}
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
                    value={formData.status}
                   >
                        <option>active</option>
                        <option>inactive</option>
                        <option>deleted</option>
                    </select>
                    {/* <input
                    type="text"
                    name="status"
                    id="status"
                    placeholder="User Status"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    /> */}
                </div>
                <div>
                    <button
                    className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                    >
                    Submit
                    </button>
                </div>
                </form>
            </div>
        </div>

        
    </div>

    
  )
}
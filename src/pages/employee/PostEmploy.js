import { useState } from "react"
import './PostEmploy.css'
import { Button, Form, FormGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

const PostEmploy = () =>{
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        position: ""
    });
    const handelInputChange =(event) =>{
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]:value,
        })
    }

    const navigate = useNavigate();

    const handelSabmit = async (e) =>{
        e.preventDefault();
        console.log(formData);
        try {
            const response = await fetch("https://employee-7wm0.onrender.com/api/employee",{
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log("Employee created : ", data);
            navigate("/");
        } catch (error) {
            console.log("Error creating employee", error.message);
        }
    }

    return(
        <>
        <div className="center-form">
            <h1>Add new Employee</h1>
            <Form onSubmit={handelSabmit}>
                <FormGroup controlId="formBasicName">
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handelInputChange}
                    />
                </FormGroup>
                <FormGroup controlId="formBasicName">
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handelInputChange}
                    />
                </FormGroup>
                <FormGroup controlId="formBasicName">
                    <Form.Control
                        type="text"
                        name="phoneNumber"
                        placeholder="Enter phone number"
                        value={formData.phoneNumber}
                        onChange={handelInputChange}
                    />
                </FormGroup>
                <FormGroup controlId="formBasicName">
                    <Form.Control
                        type="text"
                        name="position"
                        placeholder="Enter Position"
                        value={formData.position}
                        onChange={handelInputChange}
                    />
                </FormGroup>
                <Button variant="dark" type="submit" className="w-100">Add Employee</Button>
            </Form>
        </div>
        </>   
    )
}

export default PostEmploy;

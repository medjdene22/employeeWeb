import './update.css'
import { useEffect, useState } from "react"
import { Button, Form, FormGroup } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom";

const Update = () =>{
    const {id} = useParams();
    const navigate = useNavigate();

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

    useEffect(() =>{
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`https://employee-7wm0.onrender.com/api/employee/${id}`);
                const data = await response.json();
                setFormData(data);
                console.log("Employee created : ", data);
            } catch (error) {
                console.log("Error editing employee", error.message);
            }
        }
        fetchEmployee();
    }, [id])

    const handelSabmit = async (e) =>{
        e.preventDefault();
        console.log(formData);
        try {
            const response = await fetch(`https://employee-7wm0.onrender.com/api/employee/${id}`,{
                method: "PATCH",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log("Employee updated : ", data);
            navigate("/");
        } catch (error) {
            console.log("Error editing employee", error.message);
        }
    }

    return(
    <>
        <div className="center-form">
            <h1>Edit Employee</h1>
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
                <Button variant="dark" type="submit" className="w-100">Edit Employee</Button>
            </Form>
        </div>
        </>      )
    
}

export default Update;
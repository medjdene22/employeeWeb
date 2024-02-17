import { useEffect, useState } from "react"
import { Col, Container, Row, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const Dash = () => {
    
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect( () => {
        const fetchEmploy = async () =>{
            try {
                const response = await fetch("https://employee-7wm0.onrender.com/api/employees")
                const data = await response.json();

                setEmployees(data);
            } catch (error) {
                console.log("Error", error.message);
            }
        }

        fetchEmploy();
    },[]);

    const handelDelete = async (employeeId) => {
        try {
            const response = await fetch(`https://employee-7wm0.onrender.com/api/employee/${employeeId}`, {
                method: "DELETE",
            });
            if(response.ok){
                setEmployees((prevEmployees) => 
                    prevEmployees.filter((employee)=> employee.id!==employeeId)
                )
            }
            console.log(`Employee with id : ${employeeId} deleted successfylly`);
        } catch (error) {
            console.log("Error deleting employee", error.message);
        }
    }
    
    const handelUpdate = (employeeId) =>{
        navigate(`/employee/${employeeId}`);
    }

    return (
        <>
        <Container className="mt-5">
                    <Row>
                        <Col>
                            <h1 className="text-center">Employees</h1>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                    </tr>
                                </thead>    
                                <tbody>
                                        {employees.map((employee) => (
                                            <tr key={employee.id}>
                                                <td>{employee.name}</td>
                                                <td>{employee.email}</td>
                                                <td>{employee.phoneNumber}</td>
                                                <td>{employee.position}</td>
                                                <td>
                                                    <Button variant="outline-warning" onClick={() => handelUpdate(employee.id)} >Update</Button>{" "}
                                                    <Button variant="outline-danger" onClick={() => handelDelete(employee.id)}>Delete</Button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                                
                            </Table>
                        </Col>
                    </Row>
                </Container>
        </>
    )
}
export default Dash;
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {Navbar,Container,Offcanvas,Nav,Form,FormControl,Button} from 'react-bootstrap'
function Table() {
    const { id } = useParams()
    let history = useHistory();

    const [user, setuser] = useState([])

    useEffect(() => {
        data()
    }, [])

    function data() {
        let token = localStorage.getItem('token')
        axios.get(`http://localhost:9090`,{ headers:{'x-access-token':token}})
            .then(res => {
                console.log('heyyyy________',res.data)
                const tableData = res.data.user;
                setuser(tableData)
            })
    }

    function deleteuser(id) {
        let token = localStorage.getItem('token')
        console.log(id);
        axios.delete(`http://localhost:9090/${id}`, { headers:{'x-access-token':token}})
        .then((result) => {
            console.log("result.data", result.data);

        })

    }
    function adduser(){
       
        console.log('hey______add');
       history.push('/add')
        
    }
    function updateuser(id) {
        
        console.log('heyy_____put',id);
        history.push(`/e/${id}`);
       
    }

    const columns = [
        {
            title: 'username', field: 'username'
        },
                {
            title: 'description', field: 'description'
        },
        {
            title: 'quantities', field: 'quantities'
        },
        {
            title: 'price (per one quantity)', field: 'price'
        },
        {
            title: "profile_url", field: "profile_url", render: (rowData) => <img src={rowData.profile_url} style={{ width: 120, height: 100}} alt="" />,
        },
       
    ]
    return (

        <div>     <Navbar bg="light" expand={false}>
        <Container fluid>
          <Navbar.Brand href="#">Food Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/Table">food List</Nav.Link>
                <Nav.Link href="/User">User List</Nav.Link>
                <Nav.Link href="/Profile">My Profile</Nav.Link>
                 
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

            <MaterialTable title=" Material Table"
                data={user}
                columns={columns}

                actions={[
                    {
                        
                        icon: 'edit',
                        tooltip: 'Edit User',
                        onClick: (event, rowData) => updateuser(rowData._id),
                       
                    },
                    

                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => deleteuser(rowData._id)

                    }, 
                    {
                        icon: 'add',
                        tooltip: 'Add User',
                        isFreeAction: true ,
                        onClick: (event, rowData) => adduser(rowData._id)
                      }
                ]}
            />

           

        </div>
    )
}





export default Table
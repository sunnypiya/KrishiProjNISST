import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header style={{marginTop:'15px'} }>
                <Navbar className="navbar-expand-sm  navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 bg-primary " container light>
                    <NavbarBrand tag={Link} to="/">
                        <img className='rounded mx-auto d-block' width='60' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiCgQkrWcnH_OXIGa1IYSyE-7lpEhUgzk_fA&s'></img>
                        KrishiApp
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                        <ul className="navbar-nav flex-grow " style={{marginRight:'20px'} }>
                            <NavItem>
                                <NavLink tag={Link} className="text-white" to="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-white position-relative" to="/scscp-registration">Registration for SVS
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                                        New
                                        <span className="visually-hidden">unread messages</span>
                                    </span>
                                </NavLink>
                            </NavItem>
                            
                            <NavItem>
                                <NavLink tag={Link} className="text-white position-relative" to="/CommonConfig">Admin Login
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                                        New
                                        <span className="visually-hidden">unread messages</span>
                                    </span>
                                </NavLink>
                            </NavItem>

                        </ul>
                        
                    </Collapse>
                    {/*<img className='rounded mx-auto d-block' width='60' src='https://scspiiss.icar.gov.in/farmer/wp-content/uploads/2022/03/cropped-cropped-cropped-cropped-1557903491_IISS_logo_final_1.jpg'></img>*/}
                    <img className='rounded mx-auto d-block' alt='NISST' width='75' src='Images/Logo.png'></img>
                </Navbar>
            </header>
        );
    }
}

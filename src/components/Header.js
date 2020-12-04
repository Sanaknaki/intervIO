import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { AUTH_TOKEN } from '../constants';
import { Navbar, Nav }  from 'react-bootstrap';

import CreateAppliaction from './CreateApplication';
import Logo from '../img/intervio.png';

import { Modal, Popover, OverlayTrigger } from 'react-bootstrap';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        }
    }

    _toggleModal = () => {
        const { showModal } = this.state;

        this.setState({ showModal: !showModal });
    }

    _renderModal = () => {
        const { showModal } = this.state;

        return (
            <Modal show={showModal} onHide={() => this._toggleModal()}>
                <Modal.Header closeButton>
                    <h4>Add Application</h4>
                </Modal.Header>
                <Modal.Body style={{padding: "0rem"}}>
                    <CreateAppliaction _toggleModal={() => this._toggleModal()} />
                </Modal.Body>
            </Modal>
        );
    }

    _renderPopover() {
        return (
            <Popover id="popover-basic">
                {/* <Popover.Title as="h3">Account Settings</Popover.Title> */}
                <Popover.Content style={{padding: "0px"}}>
                    <button className="submit-btn" onClick={() => { localStorage.removeItem(AUTH_TOKEN); window.location.reload(); }}>Log Out</button>
                </Popover.Content>
            </Popover>
        );
    }

    render() {

        const authToken = localStorage.getItem(AUTH_TOKEN);

        // return (
        //     <div className="flex pal justify-between nowrap orange">
        //         <div className="flex flex-fixed black">
        //             <div className="fw7 mr1">Interv.io</div>
        //             <Link to="/" className="ml1 no-underline black">NEW</Link>
        //             <div className="ml1">|</div>
        //             <Link to="/top" className="ml1 no-underline black">TOP</Link>
        //             <div className="ml1">|</div>
        //             <Link to="search" className="ml1 no-underline black">SEARCH</Link>
        //             {authToken && (
        //                 <div className="flex">
        //                     <div className="ml1"> | </div>
        //                     <Link to="/create" className="ml1 no-underline black">SUBMIT</Link>
        //                 </div>
        //             )}
        //             <div className="ml1"> | </div>
        //             <div className="flex flex-fixed">
        //                 {authToken ? (
        //                     <div  className="ml1 pointer black" onClick={() => { localStorage.removeItem(AUTH_TOKEN); this.props.history.push('/'); }}>LOG OUT</div>
        //                 ) : (
        //                     <Link to="/Login" className="ml1 no-underline black">LOG IN</Link>
        //                 )
        //                 }
        //             </div>
        //         </div>
        //     </div>
        // );
        return (
            <Navbar collapseOnSelect expand="lg" bg={"white"} style={{borderBottom: "1px solid #94A6B1"}}>
                <Link to="/"><Navbar.Brand><img src={Logo} height={15} alt={"Logo"} /></Navbar.Brand></Link>
                <Nav className="mr-auto" />
                {
                    (authToken) ? 
                        <React.Fragment>
                            <Nav>
                                <Nav.Link className="nav-link-colour" onClick={() => this._toggleModal()}><i className="fas fa-plus" /></Nav.Link>
                                <OverlayTrigger trigger="click" placement="bottom" overlay={this._renderPopover()}><Nav.Link className="nav-link-colour"><i className="far fa-user" /></Nav.Link></OverlayTrigger>
                            </Nav>
                            {this._renderModal()}
                        </React.Fragment>
                    :
                        null
                }
            </Navbar>
        );
    }
}

export default withRouter(Header);
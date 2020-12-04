import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { Row, Col} from 'react-bootstrap';

import { UPDATE_APPLICATIONSTATUS_MUTATION, UPDATE_INTERVIEWROUND_MUTATION } from '../gql/applicationMutations';

class ApplicationActionButtons extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Col md={2} style={{backgroundColor: "transparent", marginTop: this.props.marginAmount, paddingTop: 30, paddingBottom: 30 }}>
                <Row className="text-center" style={{ paddingTop: 10 }} >
                    {
                        (this.props.colMdValue == 4 && this.props.status == "Applied") ? 
                            <Col md={this.props.colMdValue}>
                                <Mutation 
                                    mutation={UPDATE_APPLICATIONSTATUS_MUTATION} 
                                    variables={{appId: parseInt(this.props.appId), status: "Ghosted"}}
                                    onCompleted={() => {this.props._toggleApplicationClicked(this.props.appId); this.setState({display: "none"}) }}
                                    update={(store, { data: { updateApplicationStatus } }) => {
                                        const data = store.readQuery({
                                            query: UPDATE_APPLICATIONSTATUS_MUTATION,
                                        });
                                        data.feed.applications.unshift(updateApplicationStatus);
                                        store.writeQuery({
                                            query: UPDATE_APPLICATIONSTATUS_MUTATION,
                                            data,
                                        });
                                    }}
                                >
                                    {updateApplicationStatusMutation => <i title="Ghosted" style={{cursor: "pointer"}} onClick={updateApplicationStatusMutation} className="fas fa-ghost nav-link-colour" />}
                                </Mutation>
                            </Col>
                        :
                            (this.props.status == "Interviewing") ?
                                <Col md={this.props.colMdValue}>
                                    <Mutation 
                                        mutation={UPDATE_INTERVIEWROUND_MUTATION} 
                                        variables={{appId: parseInt(this.props.appId)}}
                                        onCompleted={() => {this.props._toggleApplicationClicked(this.props.appId); this.setState({display: "none"}) }}
                                        update={(store, { data: { updatedInterviewRound } }) => {
                                            const data = store.readQuery({
                                                query: UPDATE_INTERVIEWROUND_MUTATION,
                                            });
                                            data.feed.applications.unshift(updatedInterviewRound);
                                            store.writeQuery({
                                                query: UPDATE_INTERVIEWROUND_MUTATION,
                                                data,
                                            });
                                        }}
                                    >
                                    {updatedInterviewRoundMutation => <i title="Next Interview Round" style={{cursor: "pointer"}} onClick={updatedInterviewRoundMutation} className="fas fa-caret-square-up nav-link-colour" />}
                                    </Mutation>
                                </Col>
                            :
                                null
                    }

                    <Col md={this.props.colMdValue}>
                        <Mutation 
                            mutation={UPDATE_APPLICATIONSTATUS_MUTATION} 
                            variables={{appId: parseInt(this.props.appId), status: "Rejected"}}
                            onCompleted={() => {this.props._toggleApplicationClicked(this.props.appId); this.setState({display: "none"}) }}
                            update={(store, { data: { updateApplicationStatus } }) => {
                                const data = store.readQuery({
                                    query: UPDATE_APPLICATIONSTATUS_MUTATION,
                                });
                                data.feed.applications.unshift(updateApplicationStatus);
                                store.writeQuery({
                                    query: UPDATE_APPLICATIONSTATUS_MUTATION,
                                    data,
                                });
                            }}
                        >
                            {updateApplicationStatusMutation => <i title="Rejected" style={{cursor: "pointer"}} onClick={updateApplicationStatusMutation} className="fas fa-thumbs-down nav-link-colour" />}
                        </Mutation>
                    </Col>
                    
                    <Col md={this.props.colMdValue}>
                    {
                        (this.props.status === "Applied") ?
                            <Mutation 
                                mutation={UPDATE_APPLICATIONSTATUS_MUTATION} 
                                variables={{appId: parseInt(this.props.appId), status: "Interviewing"}}
                                onCompleted={() => {this.props._toggleApplicationClicked(this.props.appId); this.setState({display: "none"}) }}
                                update={(store, { data: { updateApplicationStatus } }) => {
                                    const skip = 0;
                                    const orderBy = {createdAt: 'desc'};
                                    const data = store.readQuery({
                                        query: UPDATE_APPLICATIONSTATUS_MUTATION,
                                        variables: { skip, orderBy }
                                    });
                                    data.feed.applications.unshift(updateApplicationStatus);
                                    store.writeQuery({
                                        query: UPDATE_APPLICATIONSTATUS_MUTATION,
                                        data,
                                        variables: {skip, orderBy }
                                    });
                                }}
                            >
                
                                {updateApplicationStatusMutation => <i title="Interviewing!" style={{cursor: "pointer"}} onClick={updateApplicationStatusMutation} className="fas fa-comments nav-link-colour"/>}
                            </Mutation>
                        :
                            <Mutation 
                                mutation={UPDATE_APPLICATIONSTATUS_MUTATION} 
                                variables={{appId: parseInt(this.props.appId), status: "Offered"}}
                                onCompleted={() => {this.props._toggleApplicationClicked(this.props.appId); this.setState({display: "none"}) }}
                                update={(store, { data: { updateApplicationStatus } }) => {
                                    const skip = 0;
                                    const orderBy = {createdAt: 'desc'};
                                    const data = store.readQuery({
                                        query: UPDATE_APPLICATIONSTATUS_MUTATION,
                                        variables: { skip, orderBy }
                                    });
                                    data.feed.applications.unshift(updateApplicationStatus);
                                    store.writeQuery({
                                        query: UPDATE_APPLICATIONSTATUS_MUTATION,
                                        data,
                                        variables: {skip, orderBy }
                                    });
                                }}
                            >
                
                                {updateApplicationStatusMutation => <i title="Offered!" style={{cursor: "pointer"}} onClick={updateApplicationStatusMutation}className="fas fa-file-invoice-dollar nav-link-colour"/>}
                            </Mutation>
                    }
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default ApplicationActionButtons;
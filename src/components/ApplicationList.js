import React, { Component } from 'react';
import Application from './Application';

// import { APPLICATIONS_PER_PAGE } from '../constants';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Search from './Search';
import { Row, Col } from 'react-bootstrap';

import { NEW_APPLICATIONS_SUBSCRIPTION, UPDATED_APPLICATIONSTATUS_SUBSCRIPTION, UPDATED_INTERVIEWROUND_SUBSCRIPTION } from '../gql/subscriptions';

export const FEED_QUERY = gql`
    query FeedQuery($take: Int, $skip: Int, $orderBy: ApplicationOrderByInput) {
        feed(take: $take, skip: $skip, orderBy: $orderBy) {
            applications {
                id
                createdAt
                updatedAt
                position
                company
                website
                interviewRounds
                status
                postedBy {
                    id
                    name
                }
            }
            count
        }
    }
`;

class ApplicationList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: '',
            selectedStatus: 'Applied',

            applicationClicked: -1
        }
    }

    _updateFilter = e => {
        this.setState({ filter: e.target.value});
    };

    // Detects when a new application is submitted and updates list of applications.
    _subscribeToNewApplications = subscribeToMore => {
        subscribeToMore({
            document: NEW_APPLICATIONS_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if(!subscriptionData.data) return prev;
                const newApplication = subscriptionData.data.newApplication;
                const exists = prev.feed.applications.find(({ id }) => id === newApplication.id);
                if(exists) return prev;

                return Object.assign({}, prev, {
                    feed: {
                        applications: [newApplication, ...prev.feed.applications],
                        __typename: prev.feed.__typename
                    }
                });
            }
        });
    };

    _subscribeToUpdatedInterviewRound = subscribeToMore => {
        subscribeToMore({
            document: UPDATED_INTERVIEWROUND_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if(!subscriptionData.data) return
                const updatedInterviewRound = subscriptionData.data.updatedInterviewRound;
                const exists = prev.feed.applications.find(({ id }) => id == updatedInterviewRound.id);
                if(exists) return prev;


                return Object.assign({}, prev, {
                    feed: {
                        applications: [updatedInterviewRound, ...prev.feed.applications],
                        __typename: prev.feed.__typename
                    }
                });
            }
        })
    };

    _subscribeToUpdatedApplicationStatus = subscribeToMore => {
        subscribeToMore({
            document: UPDATED_APPLICATIONSTATUS_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if(!subscriptionData.data) return
                const updatedApplicationStatus = subscriptionData.data.updatedApplicationStatus;
                const exists = prev.feed.applications.find(({ id }) => id == updatedApplicationStatus.id);
                if(exists) return prev;


                return Object.assign({}, prev, {
                    feed: {
                        applications: [updatedApplicationStatus, ...prev.feed.applications],
                        __typename: prev.feed.__typename
                    }
                });
            }
        })
    };

    _getQueryVariables = () => {
        // const isNewPage = this.props.location.pathname.includes('new');
        // const page = parseInt(this.props.match.params.page, 10);

        // const skip = isNewPage ? (page - 1) * APPLICATIONS_PER_PAGE : 0;
        // const take = isNewPage ? APPLICATIONS_PER_PAGE : 100;
        const orderBy = {updatedAt: "desc"};
        
        return {orderBy};
    };

    // _getApplicationsToRender = data => {
    //     // const isNewPage = this.props.location.pathname.includes('new');
    //     if(isNewPage) { return data.feed.applications; }

    //     const rankedApplications = data.feed.applications;
    //     rankedApplications.sort((l1, l2) => l2.interviewRounds - l1.interviewRounds);

    //     console.log(rankedApplications);

    //     return rankedApplications;
    // }

    // _nextPage = data => {
    //     const page = parseInt(this.props.match.params.page, 10);
    //     if(page <= data.feed.count / APPLICATIONS_PER_PAGE);
    //     const nextPage = page + 1;

    //     this.props.history.push(`/new/${nextPage}`);
    // }
    
    // _previousPage = () => {
    //     const page = parseInt(this.props.match.params.page, 10);
    //     if(page > 1) {
    //         const previousPage = page-1;
    //         this.props.history.push(`/new/${previousPage}`);
    //     }
    // }

    _toggleApplicationClicked = id => {
        const { applicationClicked } = this.state;

        if(applicationClicked === id) {
            this.setState({ applicationClicked: -1 });
        } else {
            this.setState({ applicationClicked: id });
        }
    }

    _renderStatusSelectionTab = () => {
        return (
            <Row className="text-center" style={{marginBottom: 35}}>
                <Col md={{span: 10, offset: 1}}>
                    <Row>
                        <Col md={{span: 2, offset: 1}}>
                            <span onClick={() => (this.state.selectedStatus !== "Applied") ? this.setState({ selectedStatus: "Applied"}) : null} style={{color: (this.state.selectedStatus === "Applied") ? "#6B35F3" : "#94A6B1", fontWeight: (this.state.selectedStatus === "Applied") ? "bold" : "", cursor: "pointer"}}>
                                Applied
                            </span>
                        </Col>
                        <Col md={2}>
                            <span onClick={() => (this.state.selectedStatus !== "Interviewing") ? this.setState({ selectedStatus: "Interviewing"}) : null} style={{color: (this.state.selectedStatus === "Interviewing") ? "#6B35F3" : "#94A6B1", fontWeight: (this.state.selectedStatus === "Interviewing") ? "bold" : "", cursor: "pointer"}}>
                                Interviewing
                            </span>
                        </Col>
                        <Col md={2}>
                            <span onClick={() => (this.state.selectedStatus !== "Offered") ? this.setState({ selectedStatus: "Offered"}) : null} style={{color: (this.state.selectedStatus === "Offered") ? "#6B35F3" : "#94A6B1", fontWeight: (this.state.selectedStatus === "Offered") ? "bold" : "", cursor: "pointer"}}>
                                Offered
                            </span>
                        </Col>
                        <Col md={2}>
                            <span onClick={() => (this.state.selectedStatus !== "Rejected") ? this.setState({ selectedStatus: "Rejected"}) : null} style={{color: (this.state.selectedStatus === "Rejected") ? "#6B35F3" : "#94A6B1", fontWeight: (this.state.selectedStatus === "Rejected") ? "bold" : "", cursor: "pointer"}}>
                                Rejected
                            </span>
                        </Col>
                        <Col md={2}>
                            <span onClick={() => (this.state.selectedStatus !== "Ghosted") ? this.setState({ selectedStatus: "Ghosted"}) : null} style={{color: (this.state.selectedStatus === "Ghosted") ? "#6B35F3" : "#94A6B1", fontWeight: (this.state.selectedStatus === "Ghosted") ? "bold" : "", cursor: "pointer"}}>
                                Ghosted
                            </span>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    };

    render() {
        return (
            <Query query={FEED_QUERY} variables={this._getQueryVariables()}>
                {({ loading, error, data, subscribeToMore}) => {
                    if(loading) return (
                        <Row className="text-center">
                            <Col md={12} style={{paddingTop: "15px"}}>
                                <i style={{color: "#6B35F3"}} className="fas fa-spinner fa-spin fa-2x" />
                            </Col>
                        </Row>
                    );
                    if(error) return <div>Error!</div>;

                    this._subscribeToUpdatedInterviewRound(subscribeToMore);
                    this._subscribeToNewApplications(subscribeToMore);
                    this._subscribeToUpdatedApplicationStatus(subscribeToMore);

                    const applicationsToRender = data.feed.applications;
                    // const isNewPage = this.props.location.pathname.includes('new');
                    // const pageIndex = this.props.match.params.page ? (this.props.match.params.page - 1) * APPLICATIONS_PER_PAGE : 0;
                    
                    return (
                        <React.Fragment>
                            <Search updateFilter={this._updateFilter}/>
                            {this._renderStatusSelectionTab()}
                            <Row>
                                {applicationsToRender.map((application, index) => (
                                    ((application.status === this.state.selectedStatus) && (application.position.toLowerCase().includes(this.state.filter.toLowerCase()) || application.company.toLowerCase().includes(this.state.filter.toLowerCase()))) ? 
                                        <Application 
                                            key={application.id} 
                                            application={application} 
                                            index={index}
                                            applicationClicked={this.state.applicationClicked}
                                             _toggleApplicationClicked={this._toggleApplicationClicked}
                                        />
                                    : 
                                        null
                                ))}
                            </Row>
                            {/* {isNewPage && (
                                <div className="flex ml4 mv3 gray">
                                    <div className="pointer mr2" onClick={this._previousPage}>Previous</div>
                                    <div className="pointer" onClick={() => this._nextPage(data)}>Next</div>
                                </div>
                            )} */}
                        </React.Fragment>
                    );
                }}
            </Query>
        );
    }
}

export default ApplicationList;
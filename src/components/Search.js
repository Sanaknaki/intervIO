import React,  { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Application from './Application';

import { Container, Row, Col } from 'react-bootstrap';

const FEED_SEARCH_QUERY = gql`
    query FeedSearchQuery($filter: String!) {
        feed(filter: $filter) {
            applications {
                id
                position
                company
                createdAt

                interviewRounds
                postedBy {
                    id
                    name
                }
            }
        }
    }
`;

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            applications: [],
            filter: '',
        }
    }

    render() {
        return(
            <React.Fragment>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <input className="input-bar" type='text' placeholder={"Search"} style={{width: "100%"}} onChange={e => this.props.updateFilter(e)} />
                        {/* <button style={{marginTop: 35}} onClick={() => this._executeSearch()}>SEARCH</button> */}
                    </Col>
                </Row>
                {this.state.applications.map((application, index) => (
                    <Application key={application.id} application={application} index={index} />
                ))}
            </React.Fragment>
        );
    }

    _executeSearch = async () => {
        const { filter } = this.state;
        const result = await this.props.client.query({
            query: FEED_SEARCH_QUERY,
            variables: { filter },
        });
        const applications = result.data.feed.applications;

        this.setState({ applications });
    }
}

export default withApollo(Search);
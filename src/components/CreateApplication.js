import React, { Component } from 'react';

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
// import { APPLICATIONS_PER_PAGE } from '../constants';
import { FEED_QUERY } from './ApplicationList';

const POST_MUTATION = gql`
    mutation PostMutation($position: String!, $company: String!, $website: String!) {
        post(position: $position, company: $company, website: $website) {
            id
            createdAt
            position
            company
            website
        }
    }
`;

class CreateApplication extends Component {
    state = {
        position: '',
        company: '',
        website: '',
    }

    render() {
        const { position, company, website } = this.state;

        return (
            <React.Fragment>
                <div className="text-center">
                    <input 
                        className="input-bar" 
                        alue={position} 
                        type='text' 
                        placeholder={"Position"} 
                        style={{width: "90%"}} 
                        onChange={e => this.setState({ position: e.target.value })} 
                    />
                    
                    <input 
                        className="input-bar" 
                        alue={company} 
                        type='text' 
                        placeholder={"Company"} 
                        style={{width: "90%"}} 
                        onChange={e => this.setState({ company: e.target.value })} 
                    />

                    <input 
                        className="input-bar" 
                        alue={website} 
                        type='text' 
                        placeholder={"Website"} 
                        style={{width: "90%"}} 
                        onChange={e => this.setState({ website: e.target.value })} 
                    />
                </div>

                {/* <button onClick={() => console.log("submit!")}>Submit</button> */}
                <Mutation 
                  mutation={POST_MUTATION} 
                  variables={{ position, company, website }}
                  onCompleted={this.props._toggleModal}
                  update={(store, { data: { post } }) => {
                    //   const first = APPLICATIONS_PER_PAGE;
                      const skip = 0;
                      const orderBy = {createdAt: 'desc'};
                      const data = store.readQuery({
                          query: FEED_QUERY,
                          variables: { skip, orderBy }
                      });
                      data.feed.applications.unshift(post);
                      store.writeQuery({
                          query: FEED_QUERY,
                          data,
                          variables: {skip, orderBy }
                      });
                  }}
                  >
                      
                    {postMutation => <button disabled={(this.state.position === '') || (this.state.company === '') || (this.state.website === '')} className="submit-btn" onClick={postMutation}>Add</button>}
                </Mutation>
            </React.Fragment>
        );
    }
}

export default CreateApplication;
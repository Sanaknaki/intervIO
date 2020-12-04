import React, { Component } from 'react';
import { timeDifferenceForDate } from '../utils.js'

import ApplicationActionButtons from './ApplicationActionButtons';
import { Row, Col} from 'react-bootstrap';

class Application extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: "block"
        }
    }

    _renderApplicationButtons = () => {
        let timeDifferenceForDateValue = timeDifferenceForDate(this.props.application.updatedAt);
        let colMdValue = 6;

        if((parseInt(timeDifferenceForDateValue.split(" ")[0]) > 23 && timeDifferenceForDateValue.includes("days")) || (timeDifferenceForDateValue.includes("mo")) || this.props.application.status == "Interviewing") {
            colMdValue = 4
        }

        let marginAmount = (this.props.index + 1 > 1) ? 5 : 0;
        
        if(this.props.applicationClicked === this.props.application.id && (this.props.application.status === "Applied" || this.props.application.status === "Interviewing")) {
            return (
                <ApplicationActionButtons 
                    colMdValue={colMdValue}
                    marginAmount={marginAmount}
                    appId={this.props.application.id}
                    status={this.props.application.status}
                    _toggleApplicationClicked={this.props._toggleApplicationClicked}/>
            );   
        }
    }

    _renderInterviewRoundDots = interviewRounds => {
        let dots = [];

        for(let i=0; i<interviewRounds; i++) {
            if(i+1 == interviewRounds) {
                dots.push(<span className="interview-dot" style={{backgroundColor: "#6B35F3"}}/>);
            } else {
                dots.push(<span className="interview-dot" />);
            }
            if((i+1)>3 && (i+1)%4==0) {
                dots.push(<br/>);
            }
        }

        return dots;
    }

    render() {

        let marginAmount = (this.props.index + 1 > 1) ? 5 : 0;
        let imageLink = "http://logo.clearbit.com/" + this.props.application.website + "?size=45";
        
        console.log(this.props.application);
        return (
            // <React.Fragment>
            //     <div className="flex mt2 items-start">
            //         <div className="flex items-center">
            //             <span className="gray">{this.props.index + 1}</span>
            //         </div>
            //         <div className="ml1">
            //             <div>
            //                 <p>{this.props.application.position}</p>
            //                 <p>{this.props.application.company}</p>
            //             </div>
            //             <div className="f6 lh-copy gray">
            //                 {this.props.application.postedBy ? this.props.application.postedBy.name : 'Unknown'}{' '}
            //                 {timeDifferenceForDate(this.props.application.createdAt)}
            //             </div>
            //         </div>
            //     </div>
            // </React.Fragment>
            <React.Fragment>
                <Col md={{ span: 8, offset: 2 }} style={{cursor: (this.props.application.status === "Applied" || this.props.application.status === "Interviewing") ? "pointer" : "default", backgroundColor: "white", marginTop: marginAmount, paddingTop: 30, paddingBottom: 30, border:"1px solid #E5E5E5", display: this.state.display}} onClick={() => this.props._toggleApplicationClicked(this.props.application.id)}>
                    <Row className="text-center">
                        <Col md={3} style={{marginTop: "auto", marginBottom: "auto"}}>
                            {/* <p className="gray">{this.props.index + 1}</p> */}
                            <img src={imageLink} alt={"Company Logo"}></img>
                        </Col>

                        <Col md={6} style={{marginTop: "auto", marginBottom: "auto"}}>
                            <span style={{color: "#4B5D6C"}}><b>{this.props.application.position}</b> <span style={{color: "#94A6B1"}}>at</span> <b>{this.props.application.company}</b></span>
                        </Col>

                        {
                            (this.props.application.status !== "Applied") ?
                                <Col md={3} style={{marginTop: "auto", marginBottom: "auto"}}>
                                    {this._renderInterviewRoundDots(this.props.application.interviewRounds)}
                                </Col>
                            :
                                null
                        }

                        <span style={{fontSize: "12px", color: "#B9B9B9", position: "absolute", bottom: "0", right: "0", paddingRight: "3px", paddingBottom: "3px"}}>{timeDifferenceForDate(this.props.application.updatedAt)}</span>
                    </Row>
                </Col>

                {this._renderApplicationButtons()}
            </React.Fragment>
        );
    }
}

export default Application;
import React, { Component } from 'react';

import { Row, Col} from 'react-bootstrap';

class Application extends Component {
    render() {

        let marginAmount = (this.props.index + 1 > 1) ? 5 : 0;
        let imageLink = "http://logo.clearbit.com/" + this.props.application.website + "?size=45";

        // console.log(this.props.application);

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
            <Col md={{ span: 8, offset: 2 }} style={{backgroundColor: "white", marginTop: marginAmount, paddingTop: 30, paddingBottom: 30, border:"1px solid #E5E5E5" }}>
                <Row className="text-center">
                    <Col md={3} style={{marginTop: "auto", marginBottom: "auto"}}>
                        {/* <p className="gray">{this.props.index + 1}</p> */}
                        <img src={imageLink}></img>
                    </Col>

                    <Col md={6} style={{marginTop: "auto", marginBottom: "auto"}}>
                        <span><b>{this.props.application.position}</b> at <b>{this.props.application.company}</b></span>
                    </Col>

                    <Col md={3} className="text-right" style={{position: "absolute", bottom: "0", right: "0"}}>
                        <span style={{fontSize: "12px", color: "#B9B9B9"}}>{timeDifferenceForDate(this.props.application.createdAt)}</span>
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default Application;
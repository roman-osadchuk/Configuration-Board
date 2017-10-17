import React, {Component} from 'react';

export default class TitleForModalWindowInfo extends Component {

    render() {
        return (
            <div>
                <h5><b> {this.props.caption} </b></h5>
            </div>
        );
    }
}

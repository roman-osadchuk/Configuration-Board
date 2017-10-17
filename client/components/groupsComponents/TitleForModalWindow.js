import React, {Component} from 'react';

export default class TitleForModalWindow extends Component {

    render() {
        return (
            <div>
                <h3>{this.props.caption}</h3>
            </div>
        );
    }
}

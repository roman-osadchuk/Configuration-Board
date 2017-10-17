import React, {Component} from 'react'
import { connect } from 'react-redux';
import ReactDOM from 'react-dom'
import { Button } from 'react-bootstrap'
import { ButtonGroup } from "react-bootstrap";

class TabButtonsChanges extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentGroup: this.props.store.sitePreferenceGroups.Groups[0].name
        };

        this.setCurrentGroup = this.setCurrentGroup.bind(this);
        this.setBackgroud = this.setBackgroud.bind(this);
        this.setOnBlur = this.setOnBlur.bind(this);
    }

    setCurrentGroup(e) {
        this.setState({
            currentGroup: e.target.name
        });
    }

    setBackgroud(e) {
        e.target.style.backgroundColor = "rgba(3, 109, 166, 0.2)";
    }

    setOnBlur(e) {
        e.target.style.backgroundColor = "white";
    }

    render() {

        let groups = this.props.store.sitePreferenceGroups.Groups;

        return (

            <ButtonGroup id='group-of-tabs-buttons'>
                {
                    groups.map(listValue => {
                        return <Button key={listValue.name} name={listValue.name} onBlur={this.setOnBlur} onFocus={this.setBackgroud} onClick={this.setCurrentGroup}>{listValue.name}</Button>;
                    })
                }
            </ButtonGroup>
        );
    }
}

const mapStateToProps = state => {
    return {
        store: state
    };
}

export default connect(mapStateToProps)(TabButtonsChanges);

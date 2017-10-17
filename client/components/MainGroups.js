import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions/mainStoreActions';
import { Link } from 'react-router';
import axios from 'axios';
import Themes from './groupsComponents/Themes';
import ModalWindow from './groupsComponents/ModalWindow';
import MainTable from './groupsComponents/MainTable';
import MainGroupsBody from './groupsComponents/MainGroupsBody';
import TitleChanges from './groupsComponents/TitleChanges';
import ReviewChangesBody from './groupsComponents/ReviewChangesBody';
import ResetSubmitButtons from './groupsComponents/ResetSubmitButtons';
import ChangesTable from './groupsComponents/ChangesTable';
import ChangesTableWithButtons from './groupsComponents/ChangesTableWithButtons';


class MainGroups extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedPreferences: [],
            toggleGroupContainer: false,
            isOpenReviewChanges: false,
            currentGroup: ''
        };

        this.redirectToSitePreferences = this.redirectToSitePreferences.bind(this);
        this.toggleReviewModal = this.toggleReviewModal.bind(this);
        this.toggleGroupContainer = this.toggleGroupContainer.bind(this);
    };


    componentDidMount() {
        axios.get('/data')
        .then(({ data: preferences }) => {
            const temp = JSON.parse(preferences.ourJSON);
            const { dispatch } = this.props;
            const action = ActionCreators.newData(temp);
            dispatch(action);
        });
    };


    redirectToSitePreferences(e) {

        this.setState({
            currentGroup: e.props.note.name
        });

        const sitePreferences = this.props.store.sitePreferences;

        let group = [];
        e.props.note.preferences.forEach(el => {
            sitePreferences.filter((item, index, arr) => {
                if ( el === item.id ) {
                    group.push(arr[index]);
                }
            });

        });

        this.setState({
            selectedPreferences: group,
            toggleGroupContainer: !this.state.toggleGroupContainer
        });

    };

    toggleReviewModal() {
        this.setState({
            isOpenReviewChanges: !this.state.isOpenReviewChanges
        });
    };

    toggleGroupContainer() {
        this.setState({
            toggleGroupContainer: !this.state.toggleGroupContainer
        });
    };


    render() {

        if (this.state.toggleGroupContainer) {
            return (
                <MainTable
                    groupSitePreferences={this.state.selectedPreferences}
                    currentGroup={this.state.currentGroup}
                    toggleGroupContainer={this.toggleGroupContainer}
                />
            );
        } else {
            return (
                <div id="main_groups_container">
                    <Themes />
                    <table id="MAIN_GROUPS_TABLE" className="main_groups_table">

                        <thead>
                            <tr>
                                <th> ID </th>
                                <th> Name </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.store.preferenceGroups.map(item => {
                                    return (
                                        <MainGroupsBody
                                            key={item.name}
                                            note={item}
                                            handleGroup={this.redirectToSitePreferences}
                                        />
                                    );
                                })
                            }

                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        store: state.mainStore
    };
}

export default connect(mapStateToProps)(MainGroups);

{/* <div id="Review_changes_container">
    <button  onClick={this.toggleReviewModal}>
        Review changes
    </button>
</div>

<ModalWindow
    isActive={this.state.isOpenReviewChanges}
    onClose={this.toggleReviewModal}
    title={<TitleChanges />}
    body={<ChangesTableWithButtons ref="changesTable"/>}
    footer={<ResetSubmitButtons onClick={() => this.refs.changesTable.resetAllRows()} />}
>
</ModalWindow> */}

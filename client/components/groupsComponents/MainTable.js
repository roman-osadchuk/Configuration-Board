import React, { Component } from 'react';
import Themes from './Themes';
import MainTableBody from './MainTableBody';
import ModalWindow from './ModalWindow';
import ModalTableInfo from './ModalTableInfo';
import ModalTableEditInfo from './ModalTableEditInfo';
import EditButton from './EditButton';
import TitleChanges from './TitleChanges';
import TitleForModalWindow from './TitleForModalWindow';
import ResetSubmitButtons from './ResetSubmitButtons';
import BodySitePrefModal from './BodySitePrefModal';
import BodySitePrefModalEdit from './BodySitePrefModalEdit';
import ChangesTable from './ChangesTable';
import TitleForModalWindowInfo from './TitleForModalWindowInfo';


class MainTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpenSitePref: false,
            isOpenSitePrefEdit: false,
            isOpenSiteInfo: false,
            isOpenSiteInfoEdit: false,
            isOpenReviewChanges: false,
            isOpenConfirmModal: false,
            toggleGroupContainer: false,
            preferenceSite: '',
            preferenceSiteTable: '',
            preferenceInfo: '',
            deploymentEnvironment: '',
            preferenceName: '',
            deploymentName: ''
        };

        this.handleSitePreferencesModal = this.handleSitePreferencesModal.bind(this);
        this.toggleSitePrefModal = this.toggleSitePrefModal.bind(this);
        this.toggleSitePrefModalEdit = this.toggleSitePrefModalEdit.bind(this);

        this.handleInfoModalDevelopment = this.handleInfoModalDevelopment.bind(this);
        this.handleInfoModalStaging = this.handleInfoModalStaging.bind(this);
        this.handleInfoModalProduction = this.handleInfoModalProduction.bind(this);
        this.toggleSiteInfoModal = this.toggleSiteInfoModal.bind(this);
        this.toggleSiteInfoModalEdit = this.toggleSiteInfoModalEdit.bind(this);
        this.toggleConfirmModal = this.toggleConfirmModal.bind(this);

    };

    // --------------Site Preferences----------------

    toggleSitePrefModal() {
        this.setState({
            isOpenSitePref: !this.state.isOpenSitePref
        });
    };

    // For edit window
    toggleSitePrefModalEdit() {
        this.setState({
            isOpenSitePrefEdit: !this.state.isOpenSitePrefEdit
        });
    };


    handleSitePreferencesModal(el) {
        this.toggleSitePrefModal();

        this.setState({
            preferenceSite: el.props.note.name,
            preferenceSiteTable: el.props.note
        });
    };

    // ------------------- Info ---------------------

    toggleSiteInfoModal() {
        this.setState({
            isOpenSiteInfo: !this.state.isOpenSiteInfo
        });
    };

    // For edit window
    toggleSiteInfoModalEdit() {
        this.setState({
            isOpenSiteInfoEdit: !this.state.isOpenSiteInfoEdit
        });
    };

    handleInfoModalDevelopment(el) {
        this.toggleSiteInfoModal();

        this.setState({
            preferenceInfo: el.props.note,
            deploymentEnvironment: this.props.currentGroup + ' / ' + el.props.note.name + ' / development',
            preferenceName: el.props.note.name,
            deploymentName: 'development'
        });

    };

    handleInfoModalStaging(el) {
        this.toggleSiteInfoModal();

        this.setState({
            preferenceInfo: el.props.note,
            deploymentEnvironment: this.props.currentGroup + ' / ' + el.props.note.name + ' / staging',
            preferenceName: el.props.note.name,
            deploymentName: 'staging'
        });
    };

    handleInfoModalProduction(el) {
        this.toggleSiteInfoModal();

        this.setState({
            preferenceInfo: el.props.note,
            deploymentEnvironment: this.props.currentGroup + ' / ' + el.props.note.name + ' / production',
            preferenceName: el.props.note.name,
            deploymentName: 'production'
        });
    };

    // ---------------Review Changes-----------------

    toggleReviewModal() {
        this.setState({
            isOpenReviewChanges: !this.state.isOpenReviewChanges
        });
    };

    toggleConfirmModal() {
        this.setState({
            isOpenConfirmModal: !this.state.isOpenConfirmModal
        });
    }



    render() {

        return (
            <div id="main_container">
                <Themes />
                <table id="MAIN_TABLE" className="main_table">
                    <thead>
                        <tr>
                            <th> Title </th>
                            <th> Development </th>
                            <th> Staging </th>
                            <th> Production </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.groupSitePreferences.map(item => {
                                return (
                                    <MainTableBody
                                        note={item}
                                        key={item.name}
                                        SitePreferenceTitle={this.handleSitePreferencesModal}
                                        SitePreferenceDevelopment={this.handleInfoModalDevelopment}
                                        SitePreferenceStaging={this.handleInfoModalStaging}
                                        SitePreferenceProduction={this.handleInfoModalProduction}
                                    />
                                );
                            })
                        }
                    </tbody>
                </table>

                {/*site preference modal*/}
                <ModalWindow
                    isActive={this.state.isOpenSitePref}
                    onClose={this.toggleSitePrefModal}
                    title={<TitleForModalWindow caption={this.state.preferenceSite}/>}
                    body={<BodySitePrefModal content={this.state.preferenceSiteTable}/>}
                    footer={<EditButton onClick={() => {this.toggleSitePrefModalEdit(); this.toggleSitePrefModal();}}/>}
                >
                </ModalWindow>

                {/* site preference modal edit*/}
                <ModalWindow
                    isActive={this.state.isOpenSitePrefEdit}
                    onClose={this.toggleSitePrefModalEdit}
                    title={<TitleForModalWindow caption={this.state.preferenceSite}/>}
                    body={<BodySitePrefModalEdit content={this.state.preferenceSiteTable} onClick={() => {this.toggleConfirmModal(); this.toggleSitePrefModalEdit();}} close={this.toggleSitePrefModalEdit}/>}
                >
                </ModalWindow>

                {/*site preferences info modal*/}
                <ModalWindow
                    isActive={this.state.isOpenSiteInfo}
                    onClose={this.toggleSiteInfoModal}
                    title={<TitleForModalWindowInfo caption={this.state.deploymentEnvironment}/>}
                    body={<ModalTableInfo content={this.state.preferenceInfo} deployement={this.state.deploymentName}/>}
                    footer={<EditButton onClick={() => {this.toggleSiteInfoModalEdit(); this.toggleSiteInfoModal();}}/>}
                >
                </ModalWindow>

                {/* site preferences info modal edit*/}
                <ModalWindow
                    isActive={this.state.isOpenSiteInfoEdit}
                    onClose={this.toggleSiteInfoModalEdit}
                    title={<TitleForModalWindowInfo caption={this.state.deploymentEnvironment}/>}
                    body={<ModalTableEditInfo content={this.state.preferenceInfo} deployement={this.state.deploymentName} onClick={() => {this.toggleConfirmModal();this.toggleSiteInfoModalEdit();}} close={this.toggleSiteInfoModalEdit}/>}
                >
                </ModalWindow>


                <ModalWindow
                    isActive={this.state.isOpenConfirmModal}
                    onClose={this.toggleConfirmModal}
                    body={"Data has been changed."}
                >
                </ModalWindow>

                <div id="main_table_footer">
                    <div id="back_to_groups_container">
                        <button onClick={this.props.toggleGroupContainer}>
                            <i className="fa fa-arrow-left" aria-hidden="true"></i>
                            Back to Groups
                        </button>
                    </div>

                </div>

            </div>
        );
    }
}

export default MainTable;






// <------------------ The Review Changes functionality temporary excluded --------------------->

//this.toggleReviewModal = this.toggleReviewModal.bind(this);

/*Review changes modal*/
/* <ModalWindow
    isActive={this.state.isOpenReviewChanges}
    onClose={this.toggleReviewModal}
    title={<TitleChanges />}
    body={<ChangesTable ref="changesTable"/>}
    footer={<ResetSubmitButtons onClick={() => this.refs.changesTable.resetAllRows()} />}
>
</ModalWindow> */

/* <div id="Review_changes_container">
    <button onClick={this.toggleReviewModal}>
        Review changes
    </button>
</div> */

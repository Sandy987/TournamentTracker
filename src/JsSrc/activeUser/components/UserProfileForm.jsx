import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import {reduxForm} from 'redux-form';
import validateUserProfile from '../validateUserProfile';
import {initiateSaveUserDetails} from '../actions';

const submit = (values, dispatch) =>{
    return new Promise((resolve, reject) => {
        dispatch(initiateSaveUserDetails(values.playerId, values.playerName, values.email, values.userName));
        resolve();
    });
};

const UserProfileForm = React.createClass({
    mixins: [PureRenderMixin],
    render: function(){
        const { fields: {playerId, playerName, email, userName}, handleSubmit, submitting} = this.props;

        // var loadingSpinner;
        // if (submitting){
        //     loadingSpinner = <div>Loading Spinner</div>;
        // } else{
        //     loadingSpinner = null;
        // }

        return <Paper className="tt-user-profile-form">
                <form onSubmit={handleSubmit(submit)}>
                    <input type="hidden" {...playerId}></input>
                    <div>
                        <TextField hintText="Player Name" {...playerName} />
                        {playerName.error && playerName.touched && <div>{playerName.error}</div>} 
                    </div>

                    <div>
                        <TextField hintText="Email Address" {...email} />
                        {email.error && email.touched && <div>{email.error}</div>} 
                    </div>

                    <div>
                        <TextField  hintText="User Name" {...userName} />
                        {userName.error && userName.touched && <div>{userName.error}</div>} 
                    </div>

                    <RaisedButton onClick={handleSubmit(submit)} disabled={submitting}>Save</RaisedButton>
                </form>
            </Paper>;
    }
});

function mapStateToProps(state){
    if (!state.activeUser.user){
        return {};
    }

    return {
        initialValues: { //will pull state into form's initialValues
            playerId: state.activeUser.user.Id,
            playerName: state.activeUser.user.PlayerName,
            email: state.activeUser.user.Email,
            userName: state.activeUser.user.UserName
        }
    }
}

//Wire up the redux form
export default reduxForm({
    form: 'userProfile',
    fields: ['playerId','playerName', 'email', 'userName'],
    validate: validateUserProfile
}, mapStateToProps)(UserProfileForm);
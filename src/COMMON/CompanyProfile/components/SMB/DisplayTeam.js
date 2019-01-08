import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
/* Material Imports*/
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
/* Global Imports */
import genericPostData from '../../../../Global/dataFetch/genericPostData';


const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});


class TeamMemberCard extends React.Component {
    state = { 
        expanded: false ,
        anchorEl: null,
        setAnchorEl: null,
        open: false
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    handleClick = (event) => {
        this.setState({
            setAnchorEl: event.currentTarget,
            anchorEl: event.currentTarget,
            open: true,
        })
    }

    handleClose = () => {
        this.setState({
            setAnchorEl: null,
            anchorEl: null,
            open: false,
        })
    }

    deleteTeam = () => {
        let id = _get(this, 'props.data.id', {})
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj: {id},
            url: '/api/DeleteEmployee',
            constants: {
                init: 'DeleteEmployee_init',
                success: 'DeleteEmployee_success',
                error: 'DeleteEmployee_error'
            },
            successCb:()=> this.deleteSuccess(),
            errorCb:()=> this.deleteSuccess(),
            successText: 'Deleted Successfully',
        })
        this.handleClose()
    }

    deleteSuccess = () => {
        debugger
        this.props.employeeDataFetcher()
        this.handleClose()
    }

    render() {
        const { classes } = this.props;
        let data = _get(this.props, 'data', {})
        return (
            <div className='team-card'>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar
                                aria-label="Recipe"
                                className={classes.avatar}
                                src={data.profilePictureLink}
                                alt={data.firstName}
                            >
                                {!data.profilePictureLink ? data.firstName.toUpperCase().split('')[0] : null}
                            </Avatar>
                        }
                        action={
                            <div>
                                <DeleteIcon 
                                    className='cursor-pointer' 
                                    onClick={this.deleteTeam} 
                                />

                                {/* <IconButton
                                    aria-label="More"
                                    aria-owns={this.state.open ? 'long-menu' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleClick}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                
                                <Menu
                                    id="long-menu"
                                    anchorEl={this.state.anchorEl}
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    PaperProps={{
                                        style: {
                                            width: 100,
                                        },
                                    }}
                                >
                                    <MenuItem onClick={this.deleteTeam}>Delete</MenuItem>
                                </Menu> */}
                            </div>
                        }
                        title={data.firstName.toUpperCase() + ' ' + data.lastName.toUpperCase()}
                        subheader={data.type}
                    />

                    <CardContent>
                        <Typography component="p">
                            Designation: {data.designation}
                        </Typography>
                        <Typography component="p">
                            Phone Number: {data.phoneNumber}
                        </Typography>
                        <Typography component="p">
                            email: {data.email}
                        </Typography>
                        <Typography component="p">
                            Linkedin: {data.url}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

TeamMemberCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeamMemberCard);
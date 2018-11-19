import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import _get from 'lodash/get';
 
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
    state = { expanded: false };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        const { classes } = this.props;
        let data = _get(this.props, 'data', {})

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar 
                        aria-label="Recipe"
                        className={classes.avatar}
                        src ={data.profilePictureLink}
                        alt={data.firstName}
                        >
                        {!data.profilePictureLink?data.firstName.toUpperCase().split('')[0]:null}
                        </Avatar>
                    }
                    action={
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={data.firstName.toUpperCase()+' '+data.lastName.toUpperCase()}
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
        );
    }
}

TeamMemberCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeamMemberCard);
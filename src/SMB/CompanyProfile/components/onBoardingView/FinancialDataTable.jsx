import React, { Component } from 'react';
/* Material Imports*/
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import financialdata from "../../../../Assets/images/financial-data.svg"

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

class FinancialDataTable extends Component {

    constructor(props) {
        super(props);
    }

    populateHeaders = () => {
        let currentYear = (new Date()).getFullYear();
        return (
            <TableRow>
                <TableCell>Financial Types</TableCell>
                <TableCell numeric>{currentYear - 2}</TableCell>
                <TableCell numeric>{currentYear - 1}</TableCell>
                <TableCell numeric>{currentYear}</TableCell>
                <TableCell numeric>{currentYear + 1}</TableCell>
            </TableRow>
        )
    }

    populateRows = (title, key) => {
        let currentYear = (new Date()).getFullYear();
        let financialData = this.props.financialData;
        let first, second, third, fourth
        financialData.map(data => {
            switch (data.year) {
                case currentYear - 2:
                    first = data[key]
                    break
                case currentYear - 1:
                    second = data[key]
                    break
                case currentYear:
                    third = data[key]
                    break
                case currentYear + 1:
                    fourth = data[key]
                    break
            }
        })
        return (
            <TableRow>
                <TableCell>{title}</TableCell>
                <TableCell numeric>{first}</TableCell>
                <TableCell numeric>{second}</TableCell>
                <TableCell numeric>{third}</TableCell>
                <TableCell numeric>{fourth}</TableCell>
            </TableRow>
        )
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="col-sm-12" >

                <div className="onboarding-sub-title" ><img src={financialdata} height="" width="35" /> Financial Data</div>
                <Paper className={classes.root} >
                    <Table className={classes.table}>
                        <TableHead>
                            {this.populateHeaders()}
                        </TableHead>
                        <TableBody>
                            {this.populateRows("Sales", 'sales')}
                            {this.populateRows("EBITDA", 'ebitda')}
                            {this.populateRows("Interest Expense", 'interestExpense')}
                            {this.populateRows("Cash", 'cash')}
                            {this.populateRows("Total Final Debt", 'totalFinalDebt')}
                            {this.populateRows("Total Shareholder Equity", 'totalShareholderEquity')}
                        </TableBody>
                    </Table>
                </Paper>
            </div >
        )
    }

}

export default withStyles(styles)(FinancialDataTable);
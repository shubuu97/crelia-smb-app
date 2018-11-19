import React, { Component } from 'react';
/* Material Imports*/
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

class FinancialDataView extends Component {

    constructor(props) {
        super(props);
    }

    financialDataView = () => {
        let financialData = this.props.financialData.map(data => {
            return (
                <div className="data-list">
                    <span className="sub-head">Year-{data.year}</span>
                    <span className="list-content"><span>Cash-</span> <span>{data.cash}</span></span>
                    <span className="list-content"><span>EBITDA-</span> <span>{data.ebitda}</span></span>
                    <span className="list-content"><span>Interest Expense-</span> <span>{data.interestExpense}</span></span>
                    <span className="list-content"><span>Sales-</span> <span>{data.sales}</span></span>
                    <span className="list-content"><span>Total Financial Debt-</span> <span>{data.totalFinalDebt}</span></span>
                    <span className="list-content"><span>Total Share Holder Equity-</span> <span>{data.totalShareholderEquity}</span></span>
                </div>
            )
        })

        return financialData
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
        let financialData = this.props.financialData
        let rowData = financialData.map(data => {
            return(
                <TableCell numeric>{data[key]}</TableCell>
            )
        })
        return (
            <TableRow>
                <TableCell>{title}</TableCell>
                {rowData}
            </TableRow>
        )
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="col-sm-12" >
                <div className="onboarding-sub-title" >Financial Data</div>
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

export default withStyles(styles)(FinancialDataView);
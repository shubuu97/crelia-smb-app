import React, { Component } from 'react';
/* Material Imports*/
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
/* Assets Import*/
//import financialdata from "../../../../Assets/images/financial-data.svg";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import withLogic from '../recomposeUtility/withLogic';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 500,
    },
});

class FinancialDataTable extends Component {

    populateHeaders = () => {
        let currentYear = (new Date()).getFullYear();
        return (
            <TableRow>
                <TableCell>Financial Types</TableCell>
                <TableCell>{currentYear - 2}</TableCell>
                <TableCell>{currentYear - 1}</TableCell>
                <TableCell>{currentYear}</TableCell>
                <TableCell>{currentYear + 1}</TableCell>
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
                <TableCell>{first}</TableCell>
                <TableCell>{second}</TableCell>
                <TableCell>{third}</TableCell>
                <TableCell>{fourth}</TableCell>
            </TableRow>
        )
    }
    render() {
        const { classes } = this.props;
        return (
            <div className="data-list">
                <div className="inner-wrap" >
                    <span className="onboarding-sub-title pb-15">
                        {/* <img src={financialdata} height="" width="35" /> */}
                        Financial Data
                    </span>
                {/* <div className="col-block left-block">Financial Data</div> */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.props.key}
                                onChange={this.props.handleChange('FINANCIALINFO_FINANCIALDATA')}
                                value={'FINANCIALINFO_FINANCIALDATA'}
                            />
                        }
                        label="Give Access"
                    />

                    {/* <Table className={classes.table}>
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
                    </Table> */}
                </div>
              


                </div >
                )
            }
        
        }
        
export default withStyles(styles)(withLogic(FinancialDataTable));
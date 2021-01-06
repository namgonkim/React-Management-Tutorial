import React from 'react';
import TableRow from '@material-ui/core/TableRow'; // 행
import TableCell from '@material-ui/core/TableCell'; // 열
import CustomerDelete from './CustomerDelete';


class Customer extends React.Component {
    render() { // 렌더로 감싸서 표현할 때에는 return이 있어야 한다.
        return(
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="profile" width="64" height="64"/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                <TableCell><CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id} /></TableCell>
            </TableRow>

        )
    }
}

export default Customer;
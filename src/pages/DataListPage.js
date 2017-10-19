import React, { Component } from 'react';
import 'react-bootstrap';
import {
  Table,
  Button,
  Pagination,
  FormControl,
  FormGroup,
  Checkbox,
  Label,
} from 'react-bootstrap/lib';
import api from '../utils/api';
import constants from '../utils/constants';
import utils from '../utils/utils';

const renderItems = ({ items, sortOrder, filterText, showEligible }) =>
  items
    .sort((prev, next) => {
      if (sortOrder === constants.sortOrder.ASCENDING) {
        return prev.age - next.age;
      } else if (sortOrder === constants.sortOrder.DESCENDING) {
        return next.age - prev.age;
      } else {
        return prev.id - next.id;
      }
    })
    .filter(item => !showEligible || item.eligible)
    .filter(item => {
      const clearedFilterText = filterText.replace(/\s/g, '');

      return clearedFilterText ? new RegExp(clearedFilterText, 'i').test(item.name) : true;
    });

const renderPaginatedItems = (items, activePage) =>
  items
    .filter((_, index) => {
      return utils.isRecordVisible(activePage, index, constants.maxItemCount);
    })
    .map(item => <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.age}</td>
      <td>{item.eligible ? <Label bsStyle="primary">eligible</Label> : ''}</td>
    </tr>);

const getSortIndicator = sortOrder => {
  switch (sortOrder) {
    case constants.sortOrder.UNSORTED:
      return '';
    case constants.sortOrder.ASCENDING:
      return '(asc)';
    case constants.sortOrder.DESCENDING:
      return '(desc)';
    default:
      return '';
  }
};

class DataListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: api.items,
      activePage: 1,
      sortOrder: constants.sortOrder.UNSORTED,
      filterText: '',
      showEligible: false,
    };
  }

  onPaginationClick(page) {
    this.setState({
      activePage: page,
    });
  }

  onSortNumberClick() {
    switch (this.state.sortOrder) {
      case constants.sortOrder.UNSORTED:
        this.setState({ sortOrder: constants.sortOrder.ASCENDING});
        break;
      case constants.sortOrder.ASCENDING:
        this.setState({ sortOrder: constants.sortOrder.DESCENDING});
        break;
      case constants.sortOrder.DESCENDING:
        this.setState({ sortOrder: constants.sortOrder.UNSORTED});
        break;
      default:
        this.setState({ sortOrder: constants.sortOrder.ASCENDING});
    }
  }

  toggleEligible() {
    this.setState({
      showEligible: !this.state.showEligible,
      activePage: 1,
    });
  }

  onFilterChange(e) {
    this.setState({
      filterText: e.target.value,
      activePage: 1,
    });
  }

  render() {
    const items = renderItems(this.state);
    const paginatedItems = renderPaginatedItems(items, this.state.activePage);

    return <div>
      <h2>Data List Page</h2>
      <form>
        <FormGroup
          controlId="formDataListFilter"
        >
          <FormControl
            type="text"
            value={this.state.filterText}
            placeholder="Filter name"
            onChange={value => this.onFilterChange(value)}
          />
          <Checkbox
            checked={this.state.showEligible}
            onChange={() => this.toggleEligible()}
          >
            Show only eligibles
          </Checkbox>
        </FormGroup>
      </form>
      <Table>
        <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>
            <Button bsStyle="link" onClick={() => this.onSortNumberClick()}>
              Age {getSortIndicator(this.state.sortOrder)}
            </Button>
          </th>
          <th>&nbsp;</th>
        </tr>
        </thead>
        <tbody>{paginatedItems}</tbody>
      </Table>
      <Pagination
        bsSize="small"
        first
        last
        prev
        next
        items={Math.ceil(items.length / constants.maxItemCount)}
        activePage={this.state.activePage}
        onSelect={e => this.onPaginationClick(e)}
      />
    </div>;
  }
}

export default DataListPage;

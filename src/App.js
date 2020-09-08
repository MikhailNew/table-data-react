import React, { Component } from 'react';
import ReactPaginate from 'react-paginate'
import Loader from './loader/Loader'
import Table from './Table/Table'
import _ from 'lodash'
import DetailRow from './DetailRow/DetailRow'
import ModeSelector from './ModeSelector/ModeSelector'
import TableSearch from './TableSearch/TableSearch'

class App extends Component {

  state = {
    isModeSelected: false,
    isLoading: false,
    data: [],
    sort: 'asc', //desc
    sortField: 'id',
    row: null,
    currentPage: 0,
    search: ''
  }

  async fetchData (url) {
    const response = await fetch(url)
    const data = await response.json()

    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort)
    })
  }

  onSort = sortField => {
    const clonedData = this.state.data.concat()
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc'
    const data = _.orderBy(clonedData, sortField, sort)
    this.setState({
      data,
      sort,
      sortField
    })
  }

  onRowSelect = row => {
    this.setState({
      row
    })
  }

  modeSelectHandler = url => {
    this.setState({
      isModeSelected: true,
      isLoading: true
    })
    this.fetchData(url)
  }

  pageChangeHandler = ({selected}) => {
    this.setState({
      currentPage: selected
    })
  }   

  searchHandler = search => {
    this.setState({
      search, 
      currentPage: 0
    })
  }

  getFilteredData () {
    const {data, search} = this.state

    if (!search) {
      return data
    }

    return data.filter(item => {
      return item['firstName'].toLowerCase().includes(search.toLowerCase())
      || item['lastName'].toLowerCase().includes(search.toLowerCase())
      || item['email'].toLowerCase().includes(search.toLowerCase())
    })
  }

  render () {
    if (!this.state.isModeSelected) {
      return (
        <div className="container">
          <ModeSelector onSelect={this.modeSelectHandler} />
        </div>
      )
    }
    const filteredData = this.getFilteredData()
    const pageCount = Math.ceil(filteredData.length / 50)
    const displayData = _.chunk(filteredData, 50)[this.state.currentPage]

    return (
      <div className="container text-center mt-5">
        {
          this.state.isLoading
          ? <Loader />
          : <>
              <TableSearch onSearch={this.searchHandler} />
              <Table 
                data={displayData} 
                onSort={this.onSort} 
                sort={this.state.sort} 
                sortField={this.state.sortField} 
                onRowSelect={this.onRowSelect}
              />
            </>
        }

        {
          this.state.data.length > 50 
          ? <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.pageChangeHandler}
              containerClassName={'pagination'}
              activeClassName={'active'}
              pageClassName={'pageChangeHandler'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              nextClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextLinkClassName={'page-link'}
              forcePage={this.state.currentPage}
            />
          : null
        }

        {
          this.state.row 
          ? <DetailRow person={this.state.row} />
          : null
        }
      </div>
    )
  }
}

export default App;

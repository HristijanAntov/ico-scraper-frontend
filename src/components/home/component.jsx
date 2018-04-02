import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { manageIcoCategoryFetch, fetchFullDescription } from '../../modules/icos/actions'
import IcosTable from '../icos-table/component'

import './styles.css'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.manageIcoCategoryFetch('ongoing')
  }

  render() {
    const { icos, stats } = this.props

    return (<div className="App">
      <header className="App-header">
        <h1 className="App-title">ICO Scraper</h1>
      </header>
      <div>
        <IcosTable
          icos={icos}
          manageIcoCategoryFetch={this.props.manageIcoCategoryFetch}
          fetchFullDescription={this.props.fetchFullDescription}
          stats={stats}
        />
      </div>
    </div>);
  }
}




const mapStateToProps = ({ IcosReducer: { icos, pingToken, stats } }) => ({
  icos,
  pingToken,
  stats,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  manageIcoCategoryFetch,
  fetchFullDescription,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);


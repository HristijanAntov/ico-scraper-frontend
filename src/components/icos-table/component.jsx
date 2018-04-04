import React from 'react'
import { Categories } from '../../modules/icos/actions'
import Tabs from '../tabs/component'
import Row from './components/row'
import Spinner from '../spinner/component'

import './styles.css'

const ctorFullDescription = ico => ({
  id: ico.id,
  fullDescription: ico.fullDescription,
  isFullDescription: true,
})


const appendFullDescriptionRecordToIcos = icos => icos
  .map(ico => [ico, ctorFullDescription(ico)])
  .reduce((flatten, entities) => [...flatten, ...entities], [])


class IcosTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentCategory: Categories.Ongoing,
      openedFullDescriptions: [],
      isSpinning: true,
    }
  }

  componentWillReceiveProps({ icos }) {
    this.setState({ isSpinning: false })
  }

  selectCategory(category) {
    this.setState({
      isSpinning: true,
      currentCategory: category,
      openedFullDescriptions: [],
    })

    this.props.manageIcoCategoryFetch(category)
  }

  toggleFullDescription(id) {

    const { openedFullDescriptions } = this.state

    console.log(openedFullDescriptions)

    if (openedFullDescriptions.find(icoId => icoId === id)) {
      this.setState({
        openedFullDescriptions: openedFullDescriptions.filter(icoId => icoId !== id)
      })
      return;
    }


    this.props.fetchFullDescription(id)
    this.setState({
      openedFullDescriptions: [...openedFullDescriptions, id]
    })
  }

  bindFullDescriptionRow(record, index) {
    const { openedFullDescriptions } = this.state
    const rendered = (
      openedFullDescriptions.find(id => id === record.id) &&
      record.fullDescription !== undefined
    )
      ? <Row
        rowType="DescriptionRow"
        key={index}
        fullDescription={record.fullDescription}
      />
      : null

    return rendered
  }

  render() {
    const { currentCategory, openedFullDescriptions, isSpinning } = this.state
    const { icos, stats } = this.props
    return (
      <div>
        <Tabs
          selectCategory={category => this.selectCategory(category)}
          currentCategory={currentCategory}
          stats={stats}
        />
        <div className='icos-table-container'>
          {isSpinning
            ? <Spinner />
            :
            <table className='icos-table'>
              <tbody>
                <Row rowType="HeaderRow" />
                {appendFullDescriptionRecordToIcos(icos)
                  .filter(record => record.category === currentCategory || record.isFullDescription)
                  .map((record, i) => record.isFullDescription
                    ? this.bindFullDescriptionRow(record, i)
                    :
                    <Row
                      key={record.id}
                      rowType="IcoRow"
                      isCollapsed={openedFullDescriptions.find(id => id === record.id)}
                      ico={record}
                      toggleFullDescription={() => this.toggleFullDescription(record.id)}
                    />
                  )
                }
              </tbody>
            </table>
          }
        </div>
      </div>
    )
  }
}

export default IcosTable

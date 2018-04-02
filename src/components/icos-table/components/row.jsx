import React from 'react'
import { baseUrl } from '../../../services/api'
import InfoIcon from '../../../icons/info.svg'

const HeaderRow = () =>
  <tr className="table-row row-header" colSpan="7">
    <th>Icon</th>
    <th>Name</th>
    <th>Short Description</th>
    <th>Start Date</th>
    <th>End Date</th>
    <th>Token</th>
    <th>Original Website</th>
    <th>Full Description</th>
  </tr>

const IcoRow = props =>
  <tr className="table-row" >
    <td>
      <img alt="icon" className="ico-icon" src={`${baseUrl}${props.ico.iconUrl}`} />
    </td>
    <td>{props.ico.name}</td>
    <td>{props.ico.shortDescription}</td>
    <td>{props.ico.startDate}</td>
    <td>{props.ico.endDate}</td>
    <td>{props.ico.tokenSymbol}</td>
    <td><a href={props.ico.website} target="blank" className="original-website-link">Website</a></td>
    <td>
      <button className={`full-description-btn ${props.isCollapsed ? 'is-active' : ''}`} onClick={props.toggleFullDescription}>
        <img alt="info" src={InfoIcon} />
      </button>
    </td>
  </tr>

const DescriptionRow = props =>
  <tr className="full-description-row" >
    <td colSpan="8">
      {(props.fullDescription || []).map((paragraph, i) => <p key={i}>{paragraph}</p>)}
    </td>
  </tr>

const RowTypes = {
  HeaderRow,
  IcoRow,
  DescriptionRow,
}

const Row = props => RowTypes[props.rowType](props)
export default Row 
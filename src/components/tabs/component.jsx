import React from 'react'
import { Categories } from '../../modules/icos/actions'

import './styles.css'

const bindClassname = (category, activeCategory) => category === activeCategory
  ? 'is-active'
  : ''

const Tabs = props =>
  <div className="tabs">
    <ul>
      {Object.keys(Categories).map(name =>
        <li
          className={bindClassname(Categories[name], props.currentCategory)}
          key={name}
          onClick={() => props.selectCategory(Categories[name])}
        >
          {name} ({props.stats[Categories[name]] || 0})
        </li>
      )}
    </ul>
  </div>

export default Tabs
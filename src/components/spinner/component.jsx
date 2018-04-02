import React from 'react'

import './styles.css'
import SpinnerIcon from '../../icons/spinner.png'

const Spinner = () =>
  <div
    className="spinner"
    style={{
      backgroundImage: `url(${SpinnerIcon})`
    }}
  ></div>

export default Spinner

import React, { PureComponent } from 'react'
import copyw from '../../assets/images/copyw.png'
import './index.css'

export default class Toggle extends PureComponent {
  render() {
    return (
      <div className="tooltip">
        <span className="tooltiptext" id="myTooltip">
          Копировать
        </span>
        <img
          src={copyw}
          alt="copy"
          height={25}
          onClick={() => {
            let copyText = document.getElementById('input')
            copyText.select()
            document.execCommand('copy')
            let tooltip = document.getElementById('myTooltip')
            tooltip.innerHTML = 'Скопировано'
          }}
          onMouseOut={() => {
            let tooltip = document.getElementById('myTooltip')
            tooltip.innerHTML = 'Копировать'
          }}
        />
      </div>
    )
  }
}

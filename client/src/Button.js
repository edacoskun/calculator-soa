import React from 'react'

const Button = (props) => {
  return (
    <td> <input onClick={(event) => props.clickNumberButtons(event)}  type="button" value={props.value} id={props.id} /> </td>
  )
}

export default Button
import React, { useState } from 'react'
import StarRatings from 'react-star-ratings'
import taskService from '../services/task'
import Notification from './Notification'

const Rating = ({ task }) => {
  const [rating, setRating] = useState()
  const [errorMessage, setErrorMessage] = useState(null)
  const [confirmMessage, setConfirmMessage] = useState(null)


  const changeRating = (newRating) => {
    try {
      taskService.addRating(task.id, {
        rating: newRating
      })
      setConfirmMessage('arvostelu lähetetty')
      setTimeout(() => {
        setConfirmMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  return (
    <div className="rating">
      <Notification message={errorMessage} type="error" />
      <Notification message={confirmMessage} type="success" />
      <StarRatings
        rating={rating}
        changeRating={changeRating}
        starDimension="30px"
        starSpacing="10px"

      />
      <div className="ratingStars">
        <StarRatings
          rating={task.ratingsAVG}
          starRatedColor="yellow"
          starDimension="20px"
          starSpacing="10px"
        />
      </div>
      <div >arvoteluja yhteensä: {50000}</div>
    </div>
  )
}



export default Rating

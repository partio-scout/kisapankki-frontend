import React, { useState, useEffect } from 'react'
import StarRatings from 'react-star-ratings'
import taskService from '../services/task'
import Notification from './Notification'

const Rating = ({ task }) => {
  const [rating, setRating] = useState()
  const [errorMessage, setErrorMessage] = useState(null)
  const [confirmMessage, setConfirmMessage] = useState(null)
  const [ratingsAVG, setRatingsAVG] = useState(task.ratingsAVG)
  const [ratingsAmount, setRatingsAmount] = useState(task.ratingsAmount)
  const [disabled, setDisabled] =useState(false)



  const changeRating = async (newRating) => {
    try {
      const updatedValues = await taskService.addRating(task.id, {
        rating: newRating
      })

      setRatingsAVG(updatedValues.ratingsAVG)
      setRatingsAmount(updatedValues.ratingsAmount)
      setDisabled(true)
      setConfirmMessage('Arvostelu lähetetty')
      setTimeout(() => {
        setConfirmMessage(null)
      }, 2000)

    }
    catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h4>Arvostele:</h4>
      <StarRatings
        rating={rating}
        changeRating={changeRating}
        starDimension="30px"
        starSpacing="10px"

      />
      <Notification message={errorMessage} type="error" />
      <Notification message={confirmMessage} type="success" />
      <div className="rating">
        <div>
          <h4>Keskiarvo:</h4>
          <StarRatings
            rating={ratingsAVG}
            starRatedColor="yellow"
            starDimension="20px"
            starSpacing="10px"
          />
        </div>
        <div className="rating-avg">
          ({ratingsAmount})
        </div>


      </div>

    </div>
  )
}



export default Rating

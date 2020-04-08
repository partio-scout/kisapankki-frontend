import React, { useState, useEffect } from 'react'
import StarRatings from 'react-star-ratings'
import taskService from '../services/task'
import Notification from './Notification'

const Rating = ({ task, handleUpdateTask }) => {
  const [rating, setRating] = useState()
  const [errorMessage, setErrorMessage] = useState(null)
  const [confirmMessage, setConfirmMessage] = useState(null)
  const [ratedMessage, setRatedMessage] = useState(null)
  const [ratingsAVG, setRatingsAVG] = useState(task.ratingsAVG)
  const [ratingsAmount, setRatingsAmount] = useState(task.ratingsAmount)
  const [disabled, setDisabled] = useState(false)


  useEffect(() => {
    const votesJSON = window.localStorage.getItem('votes')
    if (votesJSON) {
      const votes = JSON.parse(votesJSON)
      const foundVote = votes.find(t => t === task.id)
      if (foundVote) {
        setDisabled(true)
        setRatedMessage('Kiitos! Olet jo arvioinut tämän rastin.')
      }
    }
  }, [])

  const changeRating = async (newRating) => {
    try {
      const updatedValues = await taskService.addRating(task.id, {
        rating: newRating
      })
      const votesJSON = window.localStorage.getItem('votes')
      if (votesJSON) {
        const votes = JSON.parse(votesJSON)
        const newVotes = votes.concat(task.id)
        window.localStorage.setItem('votes', JSON.stringify(newVotes))
      }
      setRatingsAVG(updatedValues.ratingsAVG)
      setRatingsAmount(updatedValues.ratingsAmount)
      handleUpdateTask({ ...task, ratings: task.ratings[newRating - 1] + 1, ratingsAVG: updatedValues.ratingsAVG, ratingsAmount: updatedValues.ratingsAmount })
      setDisabled(true)
      setConfirmMessage('Arvostelu lähetetty')
    }
    catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className="task-rating">
      <Notification message={errorMessage} type="error" />
      <Notification message={confirmMessage} type="success" />
      <div className="rating">
        <div>
          <h4>Keskiarvo:</h4>
          <StarRatings
            rating={Number(ratingsAVG)}
            starRatedColor="yellow"
            starDimension="20px"
            starSpacing="10px"
          />
        </div>
        <div className="rating-amount">
          ({ratingsAmount})
        </div>
      </div>
      <Notification message={ratedMessage} type="rated" />
      {!disabled &&
        <div>
          <h4>Arvostele:</h4>
          <StarRatings
            rating={rating}
            changeRating={changeRating}
            starDimension="30px"
            starSpacing="10px"
          />
        </div>
      }

    </div>
  )
}

export default Rating

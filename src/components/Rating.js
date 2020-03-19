import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import StarRatings from 'react-star-ratings'

const Rating = ({ task }) => {
  const [rating, setRating] = useState(0)
  const [allStars, setAllStars] = useState(0)
  const [ka, setKa] = useState(0)
  const [oneStar, setOneStar] = useState(0)
  const [twoStars, setTwoStars] = useState(0)
  const [threeStars, setThreeStars] = useState(0)
  const [fiveStars, setFiveStars] = useState(0)
  const [fourStars, setFourStars] = useState(0)

  const changeRating = (newRating) => {
    setAllStars(allStars + 1)
    if (newRating === 1) {
      setOneStar(oneStar + 1)
    }
    if (newRating === 2) {
      setTwoStars(twoStars + 1)
    }
    if (newRating === 3) {
      setThreeStars(threeStars + 1)
    }
    if (newRating === 4) {
      setFourStars(fourStars + 1)
    }
    if (newRating === 5) {
      setFiveStars(fiveStars + 1)
    }
    if (allStars !== 0) {
      setKa(((oneStar * 1) + (twoStars * 2) + (threeStars * 3) + (fourStars *4) + (fiveStars *5 )) / allStars)
    }
  }

  return (
    <div className="rating">
      <StarRatings
        rating={rating}
        changeRating={changeRating}
        starDimension="30px"
        starSpacing="10px"

      />
      <div className="ratingStars">
        <StarRatings
          rating={ka}
          starRatedColor="yellow"
          starDimension="20px"
          starSpacing="10px"
        />
      </div>
      <div >arvoteluja yhteensä: {allStars}</div>
    </div>
  )
}



export default Rating

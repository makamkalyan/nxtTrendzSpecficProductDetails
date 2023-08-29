// Write your code here
const SimilarProductItem = props => {
  const {details} = props
  const {title, imageUrl, brand, price, rating} = details
  return (
    <li>
      <img src={imageUrl} alt={`similar product ${title}`} />
      <h1>{title}</h1>
      <p>by {brand}</p>
      <div>
        <p>{price}</p>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />
          <p>{rating}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarProductItem

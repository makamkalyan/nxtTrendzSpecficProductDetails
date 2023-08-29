// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

class ProductItemDetails extends Component {
  state = {quantity: 1, status: '', productList: {}}

  componentDidMount() {
    this.fetchDetails()
  }

  fetchDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({status: 'Loading'})

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      `http://localhost:3000/products/${id}`,
      options,
    )
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        title: each.title,
        brand: each.brand,
        price: each.price,
        description: each.description,
        totalReviews: each.total_reviews,
        rating: each.rating,
        availability: each.availability,
        similarProducts: each.similar_products,
      }))

      const similarProducts = updatedData.similarProducts.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        title: each.title,
        brand: each.brand,
        totalReviews: each.total_reviews,
        rating: each.rating,
        availability: each.availability,
        style: each.style,
        price: each.price,
        description: each.description,
      }))
      const newProductDetails = {updatedData, similarProducts}
      this.setState({status: 'Success', productList: newProductDetails})
    } else if (response.status === 404) {
      this.setState({status: 'Failure'})
    }
  }

  increaseQuantity = () => {
    this.setState(prev => ({quantity: prev.quantity + 1}))
  }

  decreaseQuantity = () => {
    this.setState(prev => ({quantity: prev.quantity - 1}))
  }

  productListView = () => {
    const {productList, quantity} = this.state
    const {updatedData, similarProducts} = productList
    const {
      imageUrl,
      title,
      rating,
      brand,
      availability,
      totalReviews,
      price,
      description,
    } = updatedData
    return (
      <div className="productListView_container">
        <div className="">
          <img className="img" src={imageUrl} alt="product" />
          <div className="">
            <h1 className="">{title}</h1>
            <p className="">{price}</p>
            <div className="">
              <p className="">{rating}</p>
              <p className="">{totalReviews}</p>
            </div>
            <p className="">{description}</p>
            <p className="">Available: {availability}</p>
            <p className="">Brand: {brand}</p>
            <div className="">
              <button
                className=""
                type="button"
                onClick={this.increaseQuantity}
                data-testid="minus"
              >
                <BsDashSquare className="quantity-controller-icon" />
              </button>
              <p className="">{quantity}</p>
              <button
                className=""
                type="button"
                onClick={this.decreaseQuantity}
                data-testid="plus"
              >
                <BsPlusSquare className="quantity-controller-icon" />
              </button>
            </div>
            <button className="" type="button">
              ADD TO CART
            </button>
          </div>
        </div>
        <ul className="">
          {similarProducts.map(each => (
            <SimilarProductItem details={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  productFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="error view"
      />
      <Link to="/products">
        <button type="button">Continue Shopping</button>
      </Link>
    </div>
  )

  LoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  switchCondition = () => {
    const {status} = this.state
    switch (status) {
      case 'Success':
        return this.productListView()
      case 'Failure':
        return this.productFailureView()
      case 'Loading':
        return this.LoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="productItemDetails_container">
        <Header />
        {this.switchCondition()}
      </div>
    )
  }
}

export default ProductItemDetails

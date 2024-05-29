import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom'
import "./index.css"

const App = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <Router>
      <div className='container mx-auto p-6 bg-gray-100 min-h-screen'>
        <Routes>
          <Route path="/" element={<ProductList products={products} />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

const ProductList = ({ products }) => {
  return (
    <div className='max-w-7xl mx-auto'>
      <h1 className='text-4xl font-bold mb-8 text-center text-blue-600'>Product List</h1>
      <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {products.map((product) => (
          <li key={product.id} className='bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 mx-auto max-w-xs'>
            <Link to={`/product/${product.id}`}>
              <img src={product.images[0]} alt={product.title} className='w-full h-56 object-cover' />
              <div className='p-6'>
                <h4 className='text-2xl font-semibold mb-3 text-gray-800'>{product.title}</h4>
                <p className='text-gray-600 mb-4'>{product.description}</p>
                <p className='text-xl font-bold text-blue-500'>Price: ${product.price}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        console.error("Error fetching product:", error)
      }
    }

    fetchProduct()
  }, [id])

  if (!product) {
    return <p>Loading...</p>
  }

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto'>
      <h2 className='text-3xl font-bold mb-4'>{product.title}</h2>
      <img src={product.images[0]} alt={product.title} className='w-full h-64 object-cover mb-4' />
      <p className='text-gray-700 mb-4'>{product.description}</p>
      <p className='text-2xl font-bold text-blue-500 mb-4'>Price: ${product.price}</p>
      <p className='text-lg text-gray-600 mb-2'><strong>Category:</strong> {product.category.name}</p>
      <p className='text-lg text-gray-600 mb-2'><strong>Creation Date:</strong> {new Date(product.creationAt).toLocaleDateString()}</p>
      <p className='text-lg text-gray-600 mb-4'><strong>Updated Date:</strong> {new Date(product.updatedAt).toLocaleDateString()}</p>
      <Link to="/" className='text-blue-500 hover:underline'>Back to Product List</Link>
    </div>
  )
}

export default App

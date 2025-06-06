import { useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiChevronLeft } from 'react-icons/fi';

const AdminPanel = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useContext(ProductContext);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: null,
    imagePreview: '',
    category: 'new',
    rating: '',
    stock: '',
    colors: [],
    sizes: [],
    description: '',
    discount: '',
    material: '',
    weight: '',
    dimensions: '',
    sku: '',
    reviewsCount: '',
    currentColorInput: '',
    currentSizeInput: '',
    featured: false,
    tags: [],
    currentTagInput: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imagePreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorAdd = () => {
    if (formData.currentColorInput && !formData.colors.includes(formData.currentColorInput)) {
      setFormData({
        ...formData,
        colors: [...formData.colors, formData.currentColorInput],
        currentColorInput: ''
      });
    }
  };

  const handleColorRemove = (colorToRemove) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter(color => color !== colorToRemove)
    });
  };

  const handleSizeAdd = () => {
    if (formData.currentSizeInput && !formData.sizes.includes(formData.currentSizeInput)) {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, formData.currentSizeInput],
        currentSizeInput: ''
      });
    }
  };

  const handleSizeRemove = (sizeToRemove) => {
    setFormData({
      ...formData,
      sizes: formData.sizes.filter(size => size !== sizeToRemove)
    });
  };

  const handleTagAdd = () => {
    if (formData.currentTagInput && !formData.tags.includes(formData.currentTagInput)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.currentTagInput],
        currentTagInput: ''
      });
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      rating: parseFloat(formData.rating),
      image: formData.imagePreview,
      id: editingId || Date.now(),
      stock: parseInt(formData.stock) || 0,
      colors: formData.colors,
      sizes: formData.sizes,
      description: formData.description,
      discount: parseFloat(formData.discount) || 0,
      material: formData.material,
      weight: formData.weight,
      dimensions: formData.dimensions,
      sku: formData.sku,
      reviewsCount: parseInt(formData.reviewsCount) || 0,
      featured: formData.featured,
      tags: formData.tags
    };

    if (editingId) {
      updateProduct(editingId, productData);
    } else {
      addProduct(productData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      image: null,
      imagePreview: '',
      category: 'new',
      rating: '',
      stock: '',
      colors: [],
      sizes: [],
      description: '',
      discount: '',
      material: '',
      weight: '',
      dimensions: '',
      sku: '',
      reviewsCount: '',
      currentColorInput: '',
      currentSizeInput: '',
      featured: false,
      tags: [],
      currentTagInput: ''
    });
    setEditingId(null);
    setIsAdding(false);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: null,
      imagePreview: product.image,
      category: product.category,
      rating: product.rating.toString(),
      stock: product.stock.toString(),
      colors: product.colors || [],
      sizes: product.sizes || [],
      description: product.description || '',
      discount: product.discount?.toString() || '',
      material: product.material || '',
      weight: product.weight || '',
      dimensions: product.dimensions || '',
      sku: product.sku || '',
      reviewsCount: product.reviewsCount?.toString() || '0',
      currentColorInput: '',
      currentSizeInput: '',
      featured: product.featured || false,
      tags: product.tags || [],
      currentTagInput: ''
    });
    setEditingId(product.id);
    setIsAdding(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800 flex items-center">
            <FiChevronLeft className="mr-2 text-gray-500" />
            <span className="text-blue-600">Admin</span> Dashboard
          </h1>
          <Link 
            to="/" 
            className="text-sm bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white flex items-center"
          >
            Back to Store
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
            <p className="text-gray-600">Manage your product inventory and details</p>
          </div>
          <button
            onClick={() => {
              setIsAdding(true);
              setEditingId(null);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <FiPlus className="mr-2" />
            Add New Product
          </button>
        </div>

        {isAdding && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)*</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Image*</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 border-gray-300">
                          <div className="flex flex-col items-center justify-center pt-7">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <p className="pt-1 text-sm tracking-wider text-gray-400">
                              {formData.imagePreview ? 'Change image' : 'Upload a file'}
                            </p>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="opacity-0"
                          />
                        </label>
                      </div>
                    </div>
                    {formData.imagePreview && (
                      <div className="w-32 h-32 border rounded-md overflow-hidden">
                        <img 
                          src={formData.imagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">PNG, JPG, JPEG up to 5MB</p>
                </div>

                {/* Category and Featured */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="new">New Arrivals</option>
                    <option value="top">Top Rating</option>
                    <option value="best">Best Seller</option>
                    <option value="featured">Featured</option>
                    <option value="sale">On Sale</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Featured Product</label>
                </div>

                {/* Rating and Reviews */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-5)*</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    min="0"
                    max="5"
                    step="0.1"
                    placeholder="4.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reviews Count</label>
                  <input
                    type="number"
                    name="reviewsCount"
                    value={formData.reviewsCount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    placeholder="0"
                  />
                </div>

                {/* Stock and Discount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity*</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    required
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    max="100"
                    placeholder="0"
                  />
                </div>

                {/* Colors */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Colors</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={formData.currentColorInput}
                      onChange={(e) => setFormData({...formData, currentColorInput: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Red, Blue"
                    />
                    <button
                      type="button"
                      onClick={handleColorAdd}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  {formData.colors.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.colors.map((color) => (
                        <span 
                          key={color} 
                          className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-xs"
                        >
                          {color}
                          <button
                            type="button"
                            onClick={() => handleColorRemove(color)}
                            className="ml-1 text-gray-500 hover:text-red-500"
                          >
                            <FiX size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Sizes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sizes</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={formData.currentSizeInput}
                      onChange={(e) => setFormData({...formData, currentSizeInput: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., S, M, L"
                    />
                    <button
                      type="button"
                      onClick={handleSizeAdd}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  {formData.sizes.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.sizes.map((size) => (
                        <span 
                          key={size} 
                          className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-xs"
                        >
                          {size}
                          <button
                            type="button"
                            onClick={() => handleSizeRemove(size)}
                            className="ml-1 text-gray-500 hover:text-red-500"
                          >
                            <FiX size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={formData.currentTagInput}
                      onChange={(e) => setFormData({...formData, currentTagInput: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., summer, winter, new"
                    />
                    <button
                      type="button"
                      onClick={handleTagAdd}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleTagRemove(tag)}
                            className="ml-1 text-blue-500 hover:text-blue-700"
                          >
                            <FiX size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    placeholder="Enter detailed product description..."
                  />
                </div>
                
                {/* Additional Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                  <input
                    type="text"
                    name="material"
                    value={formData.material}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Cotton, Leather"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 0.5kg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
                  <input
                    type="text"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 30x40x10cm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., PROD-12345"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                >
                  {editingId ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Product Inventory</h3>
            <div className="text-sm text-gray-500">
              {products.length} {products.length === 1 ? 'product' : 'products'} total
            </div>
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by adding a new product.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setIsAdding(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                  New Product
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt={product.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">SKU: {product.sku || 'N/A'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 capitalize">{product.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${product.price.toFixed(2)}
                          {product.discount > 0 && (
                            <span className="ml-1 text-xs text-red-500">(-{product.discount}%)</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.stock}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock === 0 
                            ? 'bg-red-100 text-red-800' 
                            : product.stock < 10 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {product.stock === 0 ? 'Out of Stock' : product.stock < 10 ? 'Low Stock' : 'In Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <FiEdit2 className="inline" />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiTrash2 className="inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
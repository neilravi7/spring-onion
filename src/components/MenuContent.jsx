import React, { useState, Fragment } from 'react'
import { motion } from 'framer-motion'
import { Star, Edit, Trash2, Plus, Upload } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { Dialog, Transition, Listbox } from '@headlessui/react'

const foodItems = [
  {
    id: 1,
    name: 'Gigantic Beef Sticks',
    price: 14.45,
    rating: 4.3,
    image: '/placeholder.svg?height=200&width=300',
    category: 'Meat',
    description: 'Juicy and flavorful beef sticks, perfect for snacking.',
  },
  {
    id: 2,
    name: 'Ramen Noodles',
    price: 14.45,
    rating: 4.3,
    image: '/placeholder.svg?height=200&width=300',
    category: 'Noodles',
    description: 'Authentic Japanese ramen noodles in a rich broth.',
  },
  {
    id: 3,
    name: 'Delicious Cheese Pie',
    price: 14.45,
    rating: 4.3,
    image: '/placeholder.svg?height=200&width=300',
    category: 'Dessert',
    description: 'Creamy cheese pie with a golden, flaky crust.',
  },
  {
    id: 4,
    name: 'Chicken Deluxe Frie',
    price: 14.45,
    rating: 4.3,
    image: '/placeholder.svg?height=200&width=300',
    category: 'Chicken',
    description: 'Crispy fried chicken with a special blend of spices.',
  },
  {
    id: 5,
    name: 'Spicy Beef Burger',
    price: 14.45,
    rating: 4.3,
    image: '/placeholder.svg?height=200&width=300',
    category: 'Burger',
    description: 'Juicy beef patty with a spicy kick, topped with fresh veggies.',
  },
  {
    id: 6,
    name: 'Vegetable Mix',
    price: 14.45,
    rating: 4.3,
    image: '/placeholder.svg?height=200&width=300',
    category: 'Vegetarian',
    description: 'A colorful mix of fresh, seasonal vegetables.',
  },
]

const categories = ['Meat', 'Noodles', 'Dessert', 'Chicken', 'Burger', 'Vegetarian']

export default function VendorMenu() {
  const [items, setItems] = useState(foodItems)
  const [editItem, setEditItem] = useState(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, itemId: null, itemName: '' })

  const handleEdit = (item) => {
    setEditItem(item)
  }

  const handleDeleteConfirmation = (id, name) => {
    setDeleteConfirmation({ isOpen: true, itemId: id, itemName: name })
  }

  const handleDelete = () => {
    if (deleteConfirmation.itemId) {
      setItems(items.filter(item => item.id !== deleteConfirmation.itemId))
      setDeleteConfirmation({ isOpen: false, itemId: null, itemName: '' })
    }
  }

  const handleUpdate = (updatedItem) => {
    setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item))
    setEditItem(null)
  }

  const handleAdd = (newItem) => {
    setItems([...items, { ...newItem, id: items.length + 1, rating: 0 }])
    setIsAddDialogOpen(false)
  }

  return (
    <div className="p-6 relative min-h-screen bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Popular Food</h2>
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 flex items-center gap-1 shadow-md">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
                <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 shadow-md">
                  <span className="text-sm font-medium">{item.category}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <span className="text-red-500 font-medium">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex justify-between">
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="w-4 h-4 mr-2 inline" />
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                    onClick={() => handleDeleteConfirmation(item.id, item.name)}
                  >
                    <Trash2 className="w-4 h-4 mr-2 inline" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {editItem && (
        <ProductForm
          item={editItem}
          onSubmit={handleUpdate}
          onCancel={() => setEditItem(null)}
          title="Edit Product"
        />
      )}

      {isAddDialogOpen && (
        <ProductForm
          onSubmit={handleAdd}
          onCancel={() => setIsAddDialogOpen(false)}
          title="Add New Product"
        />
      )}

      <Transition appear show={deleteConfirmation.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setDeleteConfirmation({ isOpen: false, itemId: null, itemName: '' })}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Confirm Deletion
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete "{deleteConfirmation.itemName}"? This action cannot be undone.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={() => setDeleteConfirmation({ isOpen: false, itemId: null, itemName: '' })}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <motion.button
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-red-600 bg-opacity-50 text-white flex items-center justify-center shadow-lg hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsAddDialogOpen(true)}
      >
        <Plus className="w-8 h-8" />
      </motion.button>
    </div>
  )
}

function ProductForm({ item, onSubmit, onCancel, title }) {
  const { register, handleSubmit, control, formState: { errors }, watch, setValue } = useForm({
    defaultValues: item || {
      name: '',
      price: '',
      description: '',
      category: '',
      image: null,
    },
  })

  const [imagePreview, setImagePreview] = useState(item?.image || null)

  const onFormSubmit = (data) => {
    onSubmit({ ...data, image: imagePreview || data.image })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setValue("image", reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onCancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  {title}
                </Dialog.Title>
                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id="name"
                      {...register("name", { required: "Name is required" })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="text"
                      id="price"
                      {...register("price", {
                        required: "Price is required",
                        pattern: { 
                          value: /^\d+(\.\d{1,2})?$/, 
                          message: "Invalid price format. Use format: 10.99" 
                        }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                    />
                    {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      id="description"
                      {...register("description", { required: "Description is required" })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <Controller
                      name="category"
                      control={control}
                      rules={{ required: "Category is required" }}
                      render={({ field }) => (
                        <Listbox value={field.value} onChange={field.onChange}>
                          <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                              <span className="block truncate">{field.value || 'Select a category'}</span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                                  <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {categories.map((category, categoryIdx) => (
                                  <Listbox.Option
                                    key={categoryIdx}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                      }`
                                    }
                                    value={category}
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`block truncate ${
                                            selected ? 'font-medium' : 'font-normal'
                                          }`}
                                        >
                                          {category}
                                        </span>
                                        {selected ? (
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                              <path fillRule="evenodd" clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                            </svg>
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                      )}
                    />
                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                    <div className="mt-1 flex items-center">
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                      <label
                        htmlFor="image"
                        className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Choose file
                      </label>
                      <span className="ml-3 text-sm text-gray-500">
                        {imagePreview ? "Image selected" : "No file chosen"}
                      </span>
                    </div>
                    {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>}
                  </div>

                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mt-2 rounded-md max-h-40 object-cover"
                      />
                    </div>
                  )}

                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={onCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    >
                      {title === "Add New Product" ? "Add Product" : "Save Changes"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
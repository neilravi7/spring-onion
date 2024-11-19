import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dialog } from '@headlessui/react'
import { Clock, MapPin, Mail, User, X, Plus } from 'lucide-react'

const initialRestaurantData = {
  name: "Gourmet Delight",
  image: "/placeholder.svg?height=300&width=400",
  ownerName: "Jane Doe",
  email: "jane@gourmetdelight.com",
  address: "123 Culinary Street, Foodville, FC 12345",
  openTime: "11:00",
  closeTime: "22:00",
  isAcceptingDeliveries: true,
  additionalFields: [
    { key: "Phone", value: "(555) 123-4567" },
    { key: "Cuisine Type", value: "International" }
  ]
}

export default function Component() {
  const [restaurantData, setRestaurantData] = useState(initialRestaurantData)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: restaurantData
  })

  const onSubmit = (data) => {
    setRestaurantData(data)
    console.log('Updated data:', data)
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setRestaurantData(prev => ({ ...prev, image: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const addNewField = () => {
    setRestaurantData(prev => ({
      ...prev,
      additionalFields: [...prev.additionalFields, { key: "", value: "" }]
    }))
  }

  const removeField = (index) => {
    setRestaurantData(prev => ({
      ...prev,
      additionalFields: prev.additionalFields.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Restaurant Profile</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={restaurantData.image}
              alt={restaurantData.name}
              className="w-full h-auto rounded-lg shadow-md cursor-pointer mb-4"
              onClick={() => setIsImageModalOpen(true)}
            />
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Restaurant Name</label>
              <input
                {...register("name", { required: "Restaurant name is required" })}
                id="name"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
                <User className="w-4 h-4 inline-block mr-1" />
                Owner Name
              </label>
              <input
                {...register("ownerName", { required: "Owner name is required" })}
                id="ownerName"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              {errors.ownerName && <p className="mt-1 text-sm text-red-600">{errors.ownerName.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                <Mail className="w-4 h-4 inline-block mr-1" />
                Email Address
              </label>
              <input
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                id="email"
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            <MapPin className="w-4 h-4 inline-block mr-1" />
            Address
          </label>
          <textarea
            {...register("address", { required: "Address is required" })}
            id="address"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="openTime" className="block text-sm font-medium text-gray-700">
              <Clock className="w-4 h-4 inline-block mr-1" />
              Open Time
            </label>
            <input
              {...register("openTime", { required: "Open time is required" })}
              id="openTime"
              type="time"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {errors.openTime && <p className="mt-1 text-sm text-red-600">{errors.openTime.message}</p>}
          </div>
          <div className="flex-1">
            <label htmlFor="closeTime" className="block text-sm font-medium text-gray-700">
              <Clock className="w-4 h-4 inline-block mr-1" />
              Close Time
            </label>
            <input
              {...register("closeTime", { required: "Close time is required" })}
              id="closeTime"
              type="time"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {errors.closeTime && <p className="mt-1 text-sm text-red-600">{errors.closeTime.message}</p>}
          </div>
        </div>

        <div>
          <label className="flex items-center">
            <input
              {...register("isAcceptingDeliveries")}
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-700">Accepting Deliveries</span>
          </label>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Additional Information</h2>
          {restaurantData.additionalFields.map((field, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                {...register(`additionalFields.${index}.key`)}
                type="text"
                placeholder="Field Name"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <input
                {...register(`additionalFields.${index}.value`)}
                type="text"
                placeholder="Field Value"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <button
                type="button"
                onClick={() => removeField(index)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addNewField}
            className="mt-2 flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Field
          </button>
        </div>

        <div className='flex items-end justify-end'>
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Save Changes
          </button>
        </div>
      </form>

      <Dialog
        open={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded-lg max-w-md w-full mx-auto p-6">
            <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-2">
              Restaurant Image
            </Dialog.Title>
            <div className="mt-2">
              <img src={restaurantData.image} alt={restaurantData.name} className="w-full h-auto rounded-md" />
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={() => setIsImageModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
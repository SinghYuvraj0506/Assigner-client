import { NavbarMain } from '@/components/Navbar'
import React, { useState } from 'react'

const Pricing = () => {
  const assignmentsData = [
    {
      _id: "662297543031f1ea8ee06a1a",
      for: "Assignment",
      amountWithoutReasearch: 25,
      amountWithReasearch: 40,
      pageRange: {
        from: 0,
        to: 5
      }
    },
    {
      _id: "6622977906b8b7cf1869933b",
      for: "Assignment",
      amountWithoutReasearch: 40,
      amountWithReasearch: 60,
      pageRange: {
        from: 6,
        to: 9
      }
    },
    {
      _id: "6622977cdfcad4a099d5d6ba",
      for: "Assignment",
      amountWithoutReasearch: 50,
      amountWithReasearch: 75,
      pageRange: {
        from: 10,
        to: 12
      }
    },
    {
      _id: "6622980cbced04a48e410c45",
      for: "Assignment",
      amountWithoutReasearch: 65,
      amountWithReasearch: 95,
      pageRange: {
        from: 13,
        to: 15
      }
    },
    {
      _id: "66229860bced04a48e410c46",
      for: "Assignment",
      amountWithoutReasearch: 75,
      amountWithReasearch: 110,
      pageRange: {
        from: 16,
        to: 17
      }
    },
    {
      _id: "66229888bced04a48e410c47",
      for: "Assignment",
      amountWithoutReasearch: 90,
      amountWithReasearch: 135,
      pageRange: {
        from: 18,
        to: 20
      }
    }
  ];

  const [activeTab, setActiveTab] = useState('withoutResearch')

  return (
    <div>
      <NavbarMain/>

      <div className="bg-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Pricing
          </h2>
          <p className="mt-2 sm:mt-4 text-base sm:text-lg text-gray-500">
            Whether you're a student looking to delegate assignments or an academic seeking professional assistance, our flexible pricing options cater to all requirements. Explore our range of services and find the perfect plan to suit your budget and workload
          </p>
        </div>
        <div className="mt-8 sm:mt-10">
          <div className="bg-primary-green bg-opacity-25 rounded-lg shadow-lg p-4 sm:p-8">
            <h3 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-6 sm:mb-4">Assignments</h3>
            <div className="flex justify-center mb-4">
              <button
                className={`${
                  activeTab === 'withoutResearch'
                    ? 'bg-primary-green text-white'
                    : 'text-gray-900'
                } mr-2 sm:mr-4 px-3 sm:px-4 py-1 sm:py-2 rounded-md font-medium focus:outline-none transition duration-300 ease-in-out hover:bg-green-800 hover:text-white`}
                onClick={() => setActiveTab('withoutResearch')}
              >
                Without Research
              </button>
              <button
                className={`${
                  activeTab === 'withResearch'
                    ? 'bg-primary-green text-white'
                    : 'text-gray-900'
                } px-3 sm:px-4 py-1 sm:py-2 rounded-md font-medium focus:outline-none transition duration-300 ease-in-out hover:bg-primary-green hover:text-white`}
                onClick={() => setActiveTab('withResearch')}
              >
                With Research
              </button>
            </div>
            <div className="grid grid-cols-1 gap-y-4 sm:gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-3">
              {assignmentsData.map((pricing) => (
                <div
                  key={pricing._id}
                  className="bg-green-500 bg-opacity-25 rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out flex items-center justify-between "
                >
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900">
                    {`${pricing.pageRange.from}-${pricing.pageRange.to} Pages`}
                  </h4>
                  <p className="mt-1 sm:mt-2 text-base sm:text-lg text-gray-700">
                    {activeTab === 'withoutResearch'
                      ? `Rs. ${pricing.amountWithoutReasearch}`
                      : `Rs. ${pricing.amountWithReasearch}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 sm:mt-10 bg-green-500 bg-opacity-25 rounded-lg shadow-lg p-4 sm:p-8">
            <h3 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-4">Practicals</h3>
            <p className="text-base sm:text-lg text-gray-700">To be updated soon</p>
          </div>
        </div>
      </div>
    </div>

    </div>
  )
}

export default Pricing
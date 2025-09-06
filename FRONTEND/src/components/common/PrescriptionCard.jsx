import React from 'react'
import { Download, FileText, User } from 'lucide-react'

const PrescriptionCard = ({ prescription }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-100 p-2 rounded-full">
            <FileText className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <User className="h-4 w-4 text-gray-500" />
              <p className="font-medium text-gray-900">{prescription.doctor}</p>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {new Date(prescription.date).toLocaleDateString()}
            </p>
            <div className="space-y-1">
              {prescription.medications.map((medication, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs mr-1 mb-1"
                >
                  {medication}
                </span>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={() => window.open(prescription.downloadUrl, '_blank')}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
        >
          <Download className="h-4 w-4" />
          <span>Download</span>
        </button>
      </div>
    </div>
  )
}

export default PrescriptionCard

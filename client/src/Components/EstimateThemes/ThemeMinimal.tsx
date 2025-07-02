import React from "react"

interface Service {
  serviceName: string
  description?: string
  total: number
  included?: boolean
  rate?: number
}

interface EstimateProps {
  estimate?: {
    _id: string
    clientName: string
    functionName: string
    location: string
    startDate: Date
    services: Service[]
    subtotal: number
    discount: number
    tax?: {
      percentage: number
      amount: number
    }
    netTotal: number
    notes?: string
    phoneNumber?: string
    terms?: string[]
  }
  studio?: {
    name: string
    logo?: string
  }
}

const ThemeMinimal: React.FC<EstimateProps> = ({ estimate, studio }) => {
  // Default values for common fields if they are missing
  const defaultEstimate = {
    _id: "ES-22108",
    clientName: "Priva Sharma",
    functionName: "Wedding Shoot",
    location: "456 Client Lane Suite 200, Chennai, TN 600028",
    phoneNumber: "+91 98765 43210",
    startDate: new Date("2024-05-10"),
    services: [
      {
        serviceName: "Wedding Photography Package",
        description: "8 hours of coverage",
        total: 60000,
      },
      {
        serviceName: "Engagement Session",
        total: 10000,
      },
    ],
    subtotal: 70000,
    discount: 5000,
    tax: {
      percentage: 18,
      amount: 11700,
    },
    netTotal: 76700,
    notes: "Please review the estimate and contact us if you have any questions or need further adjustments.",
    terms: [
      "50% advance payment required to confirm the booking",
      "Balance payment due 1 week before the event",
      "Rescheduling must be communicated at least 2 weeks in advance",
      "All raw files and copyrights remain with the studio",
      "Delivery timeline: 4-6 weeks after the event"
    ]
  }

  // Merge provided data with defaults
  const estimateData = { ...defaultEstimate, ...estimate }
  const studioData = { name: "QuoteStudio", ...studio }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-12 font-sans text-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div className="text-3xl font-bold text-black">{studioData.name}</div>
        <div className="text-4xl font-bold text-[#8B5CF6] tracking-wider">ESTIMATE</div>
      </div>

      {/* Bill To & Project Info */}
      <div className="grid grid-cols-2 gap-16 mb-12">
        <div>
          <div className="text-gray-600 text-lg mb-3">Bill To</div>
          <div className="text-xl font-semibold mb-2">{estimateData.clientName}</div>
          <div className="text-gray-700 leading-relaxed">
            {estimateData.location.split(",").map((part, index) => (
              <div key={index}>{part.trim()}</div>
            ))}
            {estimateData.phoneNumber && (
              <div className="mt-2 text-gray-600">{estimateData.phoneNumber}</div>
            )}
          </div>
        </div>

        <div className="text-right">
          <div className="mb-8">
            <div className="text-2xl font-bold mb-4">{estimateData.functionName}</div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Issue date</span>
                <span className="font-medium">{formatDate(estimateData.startDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimate</span>
                <span className="font-medium">{estimateData._id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="mb-12">
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Description</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-700">Quantity</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-700">Price</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {estimateData.services.map((service, index) => (
                <tr key={index} className="border-b border-gray-100 last:border-b-0">
                  <td className="py-6 px-6">
                    <div className="font-semibold text-lg">{service.serviceName}</div>
                    {service.description && <div className="text-gray-600 mt-1">{service.description}</div>}
                  </td>
                  <td className="py-6 px-6 text-center font-medium">1</td>
                  <td className="py-6 px-6 text-right font-medium">{formatCurrency(service.total)}</td>
                  <td className="py-6 px-6 text-right font-semibold">{formatCurrency(service.total)}</td>
                </tr>
              ))}

              {/* Totals Row */}
              <tr className="border-t-2 border-gray-300">
                <td className="py-4 px-6 font-bold text-lg">Total</td>
                <td className="py-4 px-6"></td>
                <td className="py-4 px-6"></td>
                <td className="py-4 px-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold">{formatCurrency(estimateData.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Discount</span>
                      <span>−{formatCurrency(estimateData.discount)}</span>
                    </div>
                    
                    <div className="flex justify-between pt-2 border-t border-gray-300 font-bold text-xl">
                      <span>Total</span>
                      <span>{formatCurrency(estimateData.netTotal)}</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes */}
      {estimateData.notes && (
        <div className="mb-8">
          <div className="font-bold text-xl mb-3">Notes</div>
          <div className="text-gray-700 leading-relaxed">{estimateData.notes}</div>
        </div>
      )}

      {/* Terms and Conditions */}
      {estimateData.terms && estimateData.terms.length > 0 && (
        <div className="mb-8 bg-gray-50 rounded-lg p-6">
          <div className="font-bold text-xl mb-4">Terms & Conditions</div>
          <ul className="list-disc list-inside space-y-2">
            {estimateData.terms.map((term, index) => (
              <li key={index} className="text-gray-700 leading-relaxed">{term}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-[#8B5CF6] font-semibold text-lg">Thank you for the opportunity!</div>
    </div>
  )
}

export default ThemeMinimal
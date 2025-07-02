import React from "react"
import { Camera, ImageIcon, BookOpen } from "lucide-react"

// Add Montserrat font import
import '@fontsource/montserrat'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'

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
  }
  studio?: {
    name: string
    logo?: string
  }
}

const ThemeVintage: React.FC<EstimateProps> = ({ estimate, studio }) => {
  // Default values for common fields if they are missing
  const defaultEstimate = {
    _id: "EST-2024-001",
    clientName: "Riley Williams",
    functionName: "Wedding Photography",
    location: "Mumbai, Maharashtra",
    startDate: new Date("2024-07-15"),
    services: [
      {
        serviceName: "Full-Day Coverage",
        description: "Up to 12 hours of coverage capturing all the moments",
        total: 50000,
      },
      {
        serviceName: "Engagement Session",
        description: "2-hour engagement photo session at a location",
        total: 15000,
      },
      {
        serviceName: "Luxury Album",
        description: "20-page personalized photo album of high-quality prints",
        total: 20000,
      },
    ],
    subtotal: 85000,
    discount: 0,
    tax: {
      percentage: 18,
      amount: 0,
    },
    netTotal: 85000,
    notes: "To confirm by July 15, 2024, for booking via othe QR code.",
  }

  // Merge provided data with defaults
  const estimateData = { ...defaultEstimate, ...estimate }
  const studioData = { name: "CREATIVE STUDIO J", ...studio }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getServiceIcon = (serviceName: string) => {
    if (serviceName.toLowerCase().includes("coverage") || serviceName.toLowerCase().includes("photography")) {
      return <Camera className="w-8 h-8" />
    }
    if (serviceName.toLowerCase().includes("engagement") || serviceName.toLowerCase().includes("session")) {
      return <ImageIcon className="w-8 h-8" />
    }
    if (serviceName.toLowerCase().includes("album")) {
      return <BookOpen className="w-8 h-8" />
    }
    return <Camera className="w-8 h-8" />
  }

  return (
    <div className="max-w-2xl mx-auto bg-[#F5F1E8] p-12 font-['Montserrat'] text-gray-800 min-h-screen">
      {/* Decorative top border */}
      <div className="border-t-2 border-b border-[#8B7355] mb-8"></div>

      {/* Logo and Studio Name */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 border-2 border-[#8B7355] rounded-full flex items-center justify-center">
          <span className="text-3xl font-bold text-[#8B7355]">G</span>
        </div>
        <h1 className="text-2xl font-bold tracking-[0.3em] text-gray-800 mb-6">{studioData.name}</h1>
        <div className="border-t border-[#8B7355] w-full mb-6"></div>
      </div>

      {/* Estimate Title */}
      <div className="text-center mb-8">
        <h2 className="text-6xl font-script text-gray-800 mb-4" style={{ fontFamily: "Brush Script MT, cursive" }}>
          Estimate
        </h2>
        <div className="text-lg mb-2">Estimate For</div>
        <div className="text-2xl font-bold mb-2">{estimateData.clientName}</div>
        <div className="text-lg text-gray-600">{estimateData.functionName}</div>
      </div>

      {/* Services Table */}
      <div className="mb-8">
        <table className="w-full border-2 border-[#8B7355]">
          <thead>
            <tr className="border-b-2 border-[#8B7355]">
              <th className="text-left py-4 px-6 font-bold text-lg bg-[#F0EBE0]">PACKAGE</th>
              <th className="text-right py-4 px-6 font-bold text-lg bg-[#F0EBE0]">PRICE</th>
            </tr>
          </thead>
          <tbody>
            {estimateData.services.map((service, index) => (
              <tr key={index} className="border-b border-[#8B7355]">
                <td className="py-6 px-6">
                  <div className="flex items-start gap-4">
                    <div className="text-[#8B7355] mt-1">{getServiceIcon(service.serviceName)}</div>
                    <div>
                      <div className="font-bold text-lg mb-1">{service.serviceName}</div>
                      {service.description && (
                        <div className="text-gray-600 text-sm leading-relaxed">{service.description}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-6 px-6 text-right font-bold text-lg">{formatCurrency(service.total)}</td>
              </tr>
            ))}

            {/* Total Row */}
            <tr className="bg-[#F0EBE0] border-t-2 border-[#8B7355]">
              <td className="py-4 px-6 font-bold text-xl">Total (Including GST)</td>
              <td className="py-4 px-6 text-right font-bold text-xl">{formatCurrency(estimateData.netTotal)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Notes and QR Code */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex-1">
          <div className="font-bold text-lg mb-3">Notes</div>
          <ul className="text-gray-700 space-y-1">
            <li>• {estimateData.notes}</li>
          </ul>
        </div>

        {/* QR Code Placeholder */}
        <div className="ml-8">
          <div className="w-24 h-24 border-2 border-gray-400 bg-white flex items-center justify-center">
            <div className="text-xs text-center text-gray-500">
              <div className="grid grid-cols-8 gap-px">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className={`w-1 h-1 ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border and footer */}
      <div className="border-t-2 border-[#8B7355] pt-6">
        <div className="text-center text-xl font-bold tracking-[0.2em] text-gray-800">{studioData.name}</div>
      </div>

      {/* Decorative bottom border */}
      <div className="border-t border-b-2 border-[#8B7355] mt-6"></div>
    </div>
  )
}

export default ThemeVintage

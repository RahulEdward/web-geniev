import React from 'react'

interface DogHeadSpinnerProps {
  className?: string
  size?: number
}

/**
 * Simple Blue Spinner for BrowserGenie
 */
export function DogHeadSpinner({ className = '', size = 24 }: DogHeadSpinnerProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 50 50"
        className="animate-spin"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="80, 200"
          strokeDashoffset="0"
        />
      </svg>
    </div>
  )
} 
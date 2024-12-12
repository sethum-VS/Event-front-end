import React from 'react';
import { SimulationParams } from '../types/simulation';

interface InputPanelProps {
  params: SimulationParams;
  onParamsChange: (params: SimulationParams) => void;
  onStart: () => void;
  isValid: boolean;
}

export function InputPanel({ params, onParamsChange, onStart, isValid }: InputPanelProps) {
  const handleInputChange = (field: keyof SimulationParams) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value, 10);
    onParamsChange({ ...params, [field]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Simulation Parameters</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Ticket Capacity
          </label>
          <input
            type="number"
            value={params.maxTicketCapacity || ''}
            onChange={handleInputChange('maxTicketCapacity')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total Number of Tickets
          </label>
          <input
            type="number"
            value={params.totalTickets || ''}
            onChange={handleInputChange('totalTickets')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ticket Release Rate (ms)
          </label>
          <input
            type="number"
            value={params.ticketReleaseRate || ''}
            onChange={handleInputChange('ticketReleaseRate')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Retrieval Rate (ms)
          </label>
          <input
            type="number"
            value={params.customerRetrievalRate || ''}
            onChange={handleInputChange('customerRetrievalRate')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
          />
        </div>

        <button
          onClick={onStart}
          disabled={!isValid}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors
            ${
              isValid
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
        >
          Start Simulation
        </button>
      </div>
    </div>
  );
}
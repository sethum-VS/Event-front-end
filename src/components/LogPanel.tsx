import React, { useRef, useEffect } from 'react';
import { CustomerActivity, VendorActivity } from '../types/simulation';

interface LogPanelProps {
  customerActivities: CustomerActivity[];
  vendorActivities: VendorActivity[];
  autoScroll: boolean;
  onToggleAutoScroll: () => void;
}

export function LogPanel({
  customerActivities,
  vendorActivities,
  autoScroll,
  onToggleAutoScroll,
}: LogPanelProps) {
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [customerActivities, vendorActivities, autoScroll]);

  const allActivities = [...customerActivities, ...vendorActivities]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 1000);

  return (
    <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Activity Log</h2>
        <button
          onClick={onToggleAutoScroll}
          className={`px-3 py-1 rounded-md text-sm ${
            autoScroll
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Auto-scroll: {autoScroll ? 'On' : 'Off'}
        </button>
      </div>

      <div
        ref={logContainerRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-2"
      >
        {allActivities.map((activity, index) => (
          <div
            key={index}
            className="p-2 border-l-4 border-blue-500 bg-gray-50"
          >
            <div className="text-gray-500">
              [{new Date(activity.timestamp).toISOString()}]
            </div>
            <div className="text-gray-900">
              {'customerId' in activity
                ? `Customer ${activity.customerId} - Ticket ${activity.ticketId}: ${activity.action}`
                : `Vendor ${activity.vendorId} - Ticket ${activity.ticketId}: ${activity.action}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
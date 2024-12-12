import React, { useState, useEffect } from 'react';
import { InputPanel } from './components/InputPanel';
import { LogPanel } from './components/LogPanel';
import { SimulationParams, CustomerActivity, VendorActivity } from './types/simulation';
import { startSimulation, fetchCustomerActivities, fetchVendorActivities } from './api/simulation';

const POLLING_INTERVAL = 1000;

function App() {
  const [params, setParams] = useState<SimulationParams>({
    maxTicketCapacity: 0,
    totalTickets: 0,
    ticketReleaseRate: 0,
    customerRetrievalRate: 0,
  });

  const [customerActivities, setCustomerActivities] = useState<CustomerActivity[]>([]);
  const [vendorActivities, setVendorActivities] = useState<VendorActivity[]>([]);
  const [autoScroll, setAutoScroll] = useState(true);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isSimulationRunning) {
      interval = setInterval(async () => {
        try {
          const [customers, vendors] = await Promise.all([
            fetchCustomerActivities(),
            fetchVendorActivities(),
          ]);
          setCustomerActivities(customers);
          setVendorActivities(vendors);
        } catch (error) {
          console.error('Error fetching activities:', error);
        }
      }, POLLING_INTERVAL);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isSimulationRunning]);

  const validateParams = (params: SimulationParams): boolean => {
    return (
      params.maxTicketCapacity > 0 &&
      params.totalTickets > 0 &&
      params.ticketReleaseRate > 0 &&
      params.customerRetrievalRate > 0
    );
  };

  const handleStart = async () => {
    try {
      await startSimulation(params);
      setIsSimulationRunning(true);
    } catch (error) {
      console.error('Error starting simulation:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Ticket Simulation System
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <InputPanel
              params={params}
              onParamsChange={setParams}
              onStart={handleStart}
              isValid={validateParams(params)}
            />
          </div>
          
          <div className="lg:col-span-2 h-[calc(100vh-12rem)]">
            <LogPanel
              customerActivities={customerActivities}
              vendorActivities={vendorActivities}
              autoScroll={autoScroll}
              onToggleAutoScroll={() => setAutoScroll(!autoScroll)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
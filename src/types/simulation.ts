export interface SimulationParams {
  maxTicketCapacity: number;
  totalTickets: number;
  ticketReleaseRate: number;
  customerRetrievalRate: number;
}

export interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARNING' | 'ERROR' | 'DEBUG';
  source: string;
  message: string;
}

export interface CustomerActivity {
  ticketId: string;
  customerId: string;
  timestamp: string;
  action: string;
}

export interface VendorActivity {
  ticketId: string;
  vendorId: string;
  timestamp: string;
  action: string;
}
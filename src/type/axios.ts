export interface ErrorResponse {
  response: {
    data: {
      code: string;
      message: string[];
      status: string;
      timestamp: string;
      trackingId: string;
    };
  };
}

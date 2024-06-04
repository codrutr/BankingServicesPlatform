using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class CreditSimulationService
    {
        public CreditSimulation Simulate(CreditSimulation request)
        {
            if (request.CreditScore < 300)
            {
                request.IsApproved = false;
                request.InterestRate = 0;
            }
            else
            {
                request.IsApproved = true;
                request.InterestRate = 5 + (700 - request.CreditScore) / 100.0;
            }

            return request;
        }
    }
}

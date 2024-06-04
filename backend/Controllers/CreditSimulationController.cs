using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CreditSimulationController : ControllerBase
    {
        [HttpPost("simulate")]
        public IActionResult Simulate([FromBody] CreditSimulationModel model)
        {
            var result = new CreditSimulationResult
            {
                Approved = model.CreditScore > 300 && model.Income > 1000,
                InterestRate = model.CreditScore > 700 ? 5 : model.CreditScore > 500 ? 7 : 10
            };

            return Ok(result);
        }
    }

    public class CreditSimulationModel
    {
        public string Name { get; set; }
        public int Income { get; set; }
        public int CreditScore { get; set; }
        public string EmploymentStatus { get; set; }
        public int LoanAmount { get; set; }
        public int LoanTerm { get; set; }
    }

    public class CreditSimulationResult
    {
        public bool Approved { get; set; }
        public int InterestRate { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class CreditSimulation
    {
        [Key]
        public int Id { get; set; }
        public int Income { get; set; }
        public int CreditScore { get; set; }
        public string EmploymentStatus { get; set; }
        public int LoanAmount { get; set; }
        public int LoanTerm { get; set; }
        public bool IsApproved { get; set; }
        public double InterestRate { get; set; }
    }
}

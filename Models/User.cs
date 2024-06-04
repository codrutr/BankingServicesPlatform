using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public int Income { get; set; }
        public int CreditScore { get; set; }
        public string EmploymentStatus { get; set; }
        public int LoanAmount { get; set; }
        public int LoanTerm { get; set; }
        public string Name { get; set; }
    }
}

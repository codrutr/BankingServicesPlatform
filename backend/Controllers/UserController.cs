using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUsers), new { id = user.Id }, user);
        }

        [HttpPost("{id}/simulate")]
        public IActionResult SimulateCredit(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            bool approved = false;
            double interestRate = 15;

            if (user.CreditScore >= 600)
            {
                approved = true;
                interestRate = 7;
            }

            if (user.EmploymentStatus == "Employed")
            {
                interestRate -= 1;
                approved = true;
            }

            if (user.Income > 3000)
            {
                interestRate -= 1;
            }

            if (user.LoanAmount <= user.Income * 5)
            {
                approved = true;
                interestRate -= 2;
            }

            if (!approved)
            {
                interestRate = 15;
            }

            var result = new
            {
                Approved = approved,
                InterestRate = interestRate
            };

            return Ok(result);
        }
    }
}

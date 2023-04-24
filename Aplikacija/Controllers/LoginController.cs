using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[ApiController]
[Route("/login")]
public class LoginController : ControllerBase
{
    private readonly ILogger<LoginController> _logger;
    private readonly AuthService authService;
    private readonly IzaberryMeDbContext dbContext;

    public LoginController(ILogger<LoginController> logger, AuthService helper, IzaberryMeDbContext dbContext)
    {
        _logger = logger;
        authService = helper;
        this.dbContext = dbContext;
    }

    [HttpPost]
    public async Task<ActionResult<string>> LoginUser([FromBody]LoginModel loginInfo){
        if(!ModelState.IsValid){
            return BadRequest(ModelState);
        }
        var student = await dbContext.Studenti.Where((student) => 
            student.Email == loginInfo.Email
        ).FirstOrDefaultAsync();
        if(student == null) {
            return BadRequest("Student ne postoji");
        }

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(loginInfo.Password, student.Salt);
        Console.WriteLine($"salt:{student.Salt}\npassword:{loginInfo.Password}\nhash:{passwordHash}\npassword from db:{student.Password}");
        if(passwordHash != student.Password){
            return BadRequest("Invalid credentials");
        }

        string token = authService.GenerateJWT(loginInfo);
        return Ok(token);
    }
}

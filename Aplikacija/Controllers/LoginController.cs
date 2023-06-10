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

    [HttpPost("student")]
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
        if(passwordHash != student.Password){
            return BadRequest("Invalid credentials");
        }

        string token = authService.GenerateJWT(student);
        return Ok(token);
    }

    [HttpPost("mentor")]
    public async Task<ActionResult> LoginMentor([FromBody]LoginModel loginInfo) {
        if(!ModelState.IsValid){
            return BadRequest(ModelState);
        }
        var mentor = await dbContext.Mentori.Where((mentor) => 
            mentor.Email == loginInfo.Email
        ).FirstOrDefaultAsync();
        if(mentor == null) {
            return BadRequest("Mentor ne postoji");
        }

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(loginInfo.Password, mentor.Salt);
        if(passwordHash != mentor.Password){
            return BadRequest("Invalid credentials");
        }

        string token = authService.GenerateJWT(mentor);
        return Ok(token);
    }

    [AllowAnonymous]
    [HttpPost("admin")]
    public async Task<ActionResult> Login([FromBody]LoginModel loginInfo) {
        if(!ModelState.IsValid) {
            return BadRequest(ModelState);
        }
        
        var admin = dbContext.Administratori.FirstOrDefault(a => a.Email == loginInfo.Email);
        if(admin == null) {
            return BadRequest("Admin ne postoji!");
        }

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(loginInfo.Password, admin.Salt);
        if(passwordHash != admin.Password){
            return BadRequest("Invalid credentials");
        }

        string token = authService.GenerateJWT(admin);
        return Ok(token);
    }
}

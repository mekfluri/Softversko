using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[ApiController]
[Route("/registracija")]
public class RegisterController : ControllerBase
{
    private readonly ILogger<RegisterController> _logger;
    private readonly AuthService _authService;
    private readonly IzaberryMeDbContext _dbContext;

    public RegisterController(ILogger<RegisterController> logger, AuthService authService, IzaberryMeDbContext dbContext)
    {
        _logger = logger;
        _authService = authService;
        _dbContext = dbContext;
    }

    [HttpPost]
    public async Task<ActionResult<string>> RegisterUser([FromBody]RegisterModel registerInfo){
        if(!ModelState.IsValid){
            return BadRequest(ModelState);
        }

        var existingStudent = await _dbContext
            .Studenti
            .Where((student) => student.Email == registerInfo.Email).FirstOrDefaultAsync();
        if(existingStudent != null) {
            return BadRequest("Student sa zadatom email adresom je vec registrovan!");
        }

        var salt = BCrypt.Net.BCrypt.GenerateSalt();
        var encryptedPassword = BCrypt.Net.BCrypt.HashPassword(registerInfo.Password, salt);
        Student student = new Student(
            registerInfo.Username,
            registerInfo.Email,
            encryptedPassword,
            salt,
            registerInfo.Modul,
            registerInfo.Semestar
        );

        _dbContext.Studenti.Add(student);
        await _dbContext.SaveChangesAsync();

        string token = _authService.GenerateJWT(student);
        return Ok(token);
    }
}

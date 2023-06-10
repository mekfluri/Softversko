using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[Authorize]
[ApiController]
[Route("/admin")]

public class AdminController : ControllerBase{

    public IzaberryMeDbContext dbContext { get; set; }
    private AuthService authService { get; set; }

    public AdminController(IzaberryMeDbContext context, AuthService authService)
    {
        dbContext = context;
        this.authService = authService;
    }

    [HttpGet]
    public async Task<ActionResult> GetAllAdmins() {
        return Ok(await dbContext.Administratori.ToListAsync());
    }
    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody]RegisterModel registerInfo) {
        if(!ModelState.IsValid) {
            return BadRequest();
        }

        var existingAdmin = await dbContext.Administratori.Where(a => a.Email == registerInfo.Email).FirstOrDefaultAsync();
        if(existingAdmin != null) {
            return BadRequest("Admin sa zadatim emailom vec postoji!");
        }

        var salt = BCrypt.Net.BCrypt.GenerateSalt();
        var encryptedPassword = BCrypt.Net.BCrypt.HashPassword(registerInfo.Password, salt);

        var admin = new Admin(
            registerInfo.Username,
            registerInfo.Email,
            encryptedPassword,
            salt,
            registerInfo.Modul,
            registerInfo.Semestar
        );

        dbContext.Administratori.Add(admin);
        await dbContext.SaveChangesAsync();

        return Created($"{admin.Id}", admin);
    }

    [AllowAnonymous]
    [HttpPost("login")]
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
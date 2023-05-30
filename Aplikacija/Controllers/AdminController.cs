using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[Authorize]
[ApiController]
[Route("/admin")]

public class AdminController : ControllerBase{

    public IzaberryMeDbContext Context { get; set; }
    private AuthService authService { get; set; }

    public AdminController(IzaberryMeDbContext context, AuthService authService)
    {
        Context = context;
        this.authService = authService;
    }

}
using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[ApiController]
[Route("/moduli")]
public class ModulController : ControllerBase
{
    private readonly ILogger<ModulController> _logger;
    private readonly IzaberryMeDbContext dbContext;

    public ModulController(ILogger<ModulController> logger, AuthService helper, IzaberryMeDbContext dbContext)
    {
        _logger = logger;
        this.dbContext = dbContext;
    }

    [HttpGet("{naziv}")]
    public async Task<ActionResult> dodajModul(string naziv){
        try {
            var modul = new Modul(naziv);
            dbContext.Moduli.Add(modul);
            await dbContext.SaveChangesAsync();
            return Ok(modul);
        }
        catch(Exception ex){
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpGet]
    public async Task<ActionResult> vratiModule(){
        try {
            return Ok(await dbContext.Moduli.ToListAsync());
        }
        catch(Exception ex){
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

}

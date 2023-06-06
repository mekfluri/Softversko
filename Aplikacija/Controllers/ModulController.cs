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

    [HttpPost("{naziv}")]
    public async Task<ActionResult> dodajModul(string naziv){
        try {

            bool postojiModul = await dbContext.Moduli.AnyAsync(m => m.Naziv == naziv);
            if(postojiModul)
            {
                 return BadRequest("Modul s istim imenom već postoji.");
            }
            var modul = new Modul(naziv);
            dbContext.Moduli.Add(modul);
            await dbContext.SaveChangesAsync();
            return Ok(modul);
        }
        catch(Exception ex){
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

//TODO: brisanje ne radi
    [HttpDelete("{id}")]
    public async Task<ActionResult> deleteModule(int id) {
        try {
            var modul = await dbContext.Moduli.Where(m => m.Id == id).FirstOrDefaultAsync();
            if(modul == null) {
                return BadRequest($"Modul sa zadatim id ({id}) ne postoji!");
            }
            dbContext.Moduli.Remove(modul);
            await dbContext.SaveChangesAsync();
            return Ok("Uspesno obrisan modul!");
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

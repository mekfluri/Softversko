using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[ApiController]
[Authorize]
[Route("/tag")]
public class TagController : ControllerBase
{
    private readonly ILogger<TagController> _logger;
    private readonly AuthService authService;
    private readonly IzaberryMeDbContext dbContext;

    public TagController(ILogger<TagController> logger, AuthService helper, IzaberryMeDbContext dbContext)
    {
        _logger = logger;
        authService = helper;
        this.dbContext = dbContext;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Tag>>> SviTagovi(){
        var tagovi = await dbContext.Tagovi.ToListAsync();
        return Ok(tagovi);
    }
    [HttpPost("dodajTag")]
    public async Task<ActionResult<Tag>> DodajTag([FromBody]Tag tag){
        if(!ModelState.IsValid){
            return BadRequest("Neispravan model");
        }
        try {
            dbContext.Tagovi.Add(tag);
            await dbContext.SaveChangesAsync();
        }
        catch(Exception ex){
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
        return Created($"/tag/{tag.Id}", tag);
    }
    [HttpPut("{id}")]
    public async Task<ActionResult<Tag>> IzmeniTag(int id, [FromBody]Tag tag){
        try {
            var dbTag = await dbContext.Tagovi.FindAsync(id);
            if(dbTag == null) {
                return BadRequest("Nepostojeci tag");
            }
            dbTag.Naziv = tag.Naziv;
            dbContext.Update(dbTag);
            await dbContext.SaveChangesAsync();
        }
        catch(Exception ex){
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
        return Ok();
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<Tag>> ObrisiTag(int id){
        try {
            var tag = await dbContext.Tagovi.FindAsync(id);
            if(tag == null) {
                return BadRequest("Ne postoji tag sa zadatim identifikatorom");
            }
            dbContext.Tagovi.Remove(tag);
            await dbContext.SaveChangesAsync();
            return Ok();
        }
        catch(Exception ex){
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

}

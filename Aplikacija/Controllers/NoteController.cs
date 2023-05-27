using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[ApiController]

[Route("/note")]
public class NotaController : ControllerBase
{
    public IzaberryMeDbContext Context { get; set; }

    public NotaController(IzaberryMeDbContext context)
    {
        Context = context;
    }


    [HttpPost("dodajNotes")]
    public async Task<ActionResult> dodajNotes([FromBody] Note note)
    {
        try
        {
            Context.Notes.Add(note);
            await Context.SaveChangesAsync();
            return Ok("Dodali smo note sa id-jem" + note.Id);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("obrisiNotes/{idnote}")]
    public async Task<ActionResult> obrisiNotes(int idnote)
    {
        var k = await Context.Notes.FindAsync(idnote);

        if (k != null)
        {
            Context.Notes.Remove(k);
            await Context.SaveChangesAsync();
            return Ok("Obrisali smo note sa rednim brojem" + idnote);
        }
        else
        {
            return BadRequest("Ne postoji takav notes");
        }
    }

    [HttpGet("vartiNotes/{idstudenta}")]
    public async Task<ActionResult> vratiNotes(int idstudenta)
    {
        var kal = await Context.Notes.Include(p => p.Student)
                                 .Where(p => p.Student.Id == idstudenta)
                                 .Include(p => p.Text)
                                 .Select(p => new
                                 {
                                     p.Id,
                                     p.Text
                                 }).ToListAsync();

        return Ok(kal);

    }


}
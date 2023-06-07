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


    [HttpPost("dodajNotes/{tekst}/{studentId}")]
    public async Task<ActionResult> dodajNotes(string tekst, int studentId)
    {
        Note note = new Note();
        note.Text = tekst;
        Student s = Context.Studenti.Where(s => s.Id == studentId)
           .FirstOrDefault();
        if (s == null)
            return BadRequest("Ne postoji student sa ovima id-em.");
        note.Student = s;
        note.doneVisible=true;
        try
        {
            Context.Notes.Add(note);
            await Context.SaveChangesAsync();
            return Ok(note.Id);
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
                                 .Select(p => new
                                 {
                                     p.Id,
                                     p.Text
                                 }).ToListAsync();

        return Ok(kal);

    }
    [HttpGet("vartiSveNotes")]
    public async Task<ActionResult> vratiSveNotes()
    {
        var notes = await Context.Notes.Include(s => s.Student).ToListAsync();

        return Ok(notes);
    }



}
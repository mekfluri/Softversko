using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[Authorize]
[ApiController]
[Route("/chat")]

public class ChatController : ControllerBase
{

    private readonly IzaberryMeDbContext Context;

    public ChatController(IzaberryMeDbContext Context)
    {
        this.Context = Context;
    }

    [AllowAnonymous]
    [HttpPost("dodajChat/{prima}/{salje}")]
    public async Task<ActionResult> AddChat(int prima, int salje)
    {
        Student sp = await Context.Studenti.Where(p => p.Id == prima).FirstOrDefaultAsync();
        Student ss = await Context.Studenti.Where(p => p.Id == salje).FirstOrDefaultAsync();

        Chat chat = new Chat();
        chat.StudentPrimaoc = sp;
        chat.StudentPosiljaoc = ss;

        Context.Chats.Add(chat);
        await Context.SaveChangesAsync();

        return Ok("nparavili smo chat");
    }
    
    [AllowAnonymous]
    [HttpDelete("ObirisChat/{id}")]
    public async Task<ActionResult> DeleteChat(int id)
    {
        var chat = await Context.Chats.FindAsync(id);
        if (chat == null)
        {
            return NotFound();
        }

        Context.Chats.Remove(chat);
        await Context.SaveChangesAsync();

        return NoContent();
    }
    
    [AllowAnonymous]
    [HttpPut("DodajPorukuUChat/{porukaID}/{chatID}")]
    public async Task<ActionResult> AddPorukaToChat(int porukaID, int chatID)
    {
        var poruka = await Context.Poruke.Where(p => p.Id == porukaID).FirstOrDefaultAsync();
        var chat = await Context.Chats.Where(c => c.Id == chatID).FirstOrDefaultAsync();
        chat?.Poruke.Add(poruka);

        Context.Chats.Update(chat);
        await Context.SaveChangesAsync();

        return Ok();
    }

    [AllowAnonymous]
    [HttpGet("VratiChatStudenta/{studentid}")]
    public async Task<ActionResult> VratiChatStudenta(int studentid)
    {
        Student student11 = await Context.Studenti!.FindAsync(studentid);
         
        if (student11 == null)
        {
            return NotFound();
        }

   List<Chat> chats = await Context.Chats
    .Include(c => c.StudentPosiljaoc)
    .Include(c => c.StudentPrimaoc)
    .Include(c => c.Poruke)
    .Where(c => (c.StudentPosiljaocId == studentid || c.StudentPrimaocId == studentid))
    .ToListAsync();


        return Ok(chats);
    }
  
   
    [AllowAnonymous]
    [HttpPut("PromeniStatus/{idporuke}")]
    public async Task<ActionResult> PromeniStatus(int idporuke)
    {
        Poruka poruka = await Context.Poruke!.FindAsync(idporuke);
      
        if (poruka == null)
        {
            return NotFound();
        }

         poruka.procitana = true;
         Context.Poruke.Update(poruka);
         await Context.SaveChangesAsync();


        return Ok(poruka.procitana);
    }
  

}


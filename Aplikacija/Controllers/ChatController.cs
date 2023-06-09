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

        return Ok();
    }

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
    [HttpGet("VratiChatStudenta/{studentID}")]
    public async Task<ActionResult> VratiChatStudenta(int studentID)
    {
        Student student = await Context.Studenti.FindAsync(studentID);
        if (student == null)
        {
            return NotFound();
        }

        List<Chat> chats = await Context.Chats
            .Include(c => c.StudentPosiljaoc)
            .Include(c => c.StudentPrimaoc)
            .Include(c => c.Poruke)
            .Where(c => c.StudentPosiljaoc == student)
            .ToListAsync();

        return Ok(chats);
    }


}


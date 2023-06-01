namespace Helpers;

public class AuthService {
    private readonly IConfiguration _config;
    private readonly int _expirationHours = 12;
    public AuthService(IConfiguration config){
        _config = config;
    }

    public int GetUserId(string token) {
        var handler = new JwtSecurityTokenHandler();
        var jsonToken = handler.ReadJwtToken(token);
        Console.WriteLine(jsonToken.Claims);
        var id = jsonToken.Claims.First((claim) => claim.Type == "sub");
        return int.Parse(id.Value);
    }
    public  string GenerateJWT(Student userInfo){
        var tokenHandler = new JwtSecurityTokenHandler();
        var expiration = DateTime.UtcNow.AddHours(_expirationHours);
        var key = _config["Jwt:Key"]!;
        var token = CreateToken(
            CreateClaims(userInfo),
            new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                SecurityAlgorithms.HmacSha256
            ),
            expiration
        );
        return tokenHandler.WriteToken(token);
    }

    private List<Claim> CreateClaims(Student userInfo) {
        var claims = new List<Claim>{
            new Claim(JwtRegisteredClaimNames.Email, userInfo.Email),
            new Claim(JwtRegisteredClaimNames.Sub, userInfo.Id.ToString()),
            new Claim("perm", ((long)userInfo.Privilegije).ToString(), ClaimValueTypes.Integer64),
            new Claim(JwtRegisteredClaimNames.Aud, _config["Jwt:Audience"]!),
            new Claim(JwtRegisteredClaimNames.Iss, _config["Jwt:Issuer"]!),
            new Claim(JwtRegisteredClaimNames.Iat, EpochTime.GetIntDate(DateTime.UtcNow).ToString(), ClaimValueTypes.Integer64)
        };
        return claims;
    }

    private JwtSecurityToken CreateToken(List<Claim> claims, SigningCredentials creds, DateTime expiration){
        return new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims,
            expires: expiration,
            signingCredentials: creds
        );
    }
}
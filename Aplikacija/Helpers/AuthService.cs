namespace Helpers;

public class AuthService {
    private readonly IConfiguration _config;
    private readonly int _expirationHours = 12;
    public AuthService(IConfiguration config){
        _config = config;
    }
    public  string GenerateJWT(LoginModel userInfo){
        var tokenHandler = new JwtSecurityTokenHandler();
        var expiration = DateTime.UtcNow.AddHours(_expirationHours);
        var key = _config["Jwt:Key"]!;
        var token = CreateToken(
            CreateClaims(userInfo),
            new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)), SecurityAlgorithms.HmacSha256),
            expiration
        );
        return tokenHandler.WriteToken(token);
    }

    private List<Claim> CreateClaims(LoginModel userInfo) {
        var claims = new List<Claim>{
            new Claim(ClaimTypes.Email, userInfo.Email),
        };
        return claims;
    }

    private JwtSecurityToken CreateToken(List<Claim> claims, SigningCredentials creds, DateTime expiration){
        return new JwtSecurityToken(
            null,
            null,
            claims,
            expires: expiration,
            signingCredentials: creds
        );
    }
}
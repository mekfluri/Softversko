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
            new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                SecurityAlgorithms.HmacSha256
            ),
            expiration
        );
        return tokenHandler.WriteToken(token);
    }

    private List<Claim> CreateClaims(LoginModel userInfo) {
        var claims = new List<Claim>{
            new Claim(JwtRegisteredClaimNames.Email, userInfo.Email),
            new Claim(JwtRegisteredClaimNames.Aud, _config["Jwt:Audience"]!),
            new Claim(JwtRegisteredClaimNames.Iss, _config["Jwt:Issuer"]!)
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
namespace Helpers;

using Firebase.Auth;
using Firebase.Auth.Providers;
using Firebase.Auth.Repository;
using Firebase.Storage;

public class FirebaseService
{
    private IConfiguration configuration { get; set; }
    string apiKey;
    string authEmail;
    string authPassword;
    string bucket;
    string authDomain;
    FirebaseAuthClient? client;
    UserCredential? user;
    FirebaseStorage? storage;

    private void Configure()
    {
        apiKey = configuration["Firebase:apiKey"]!;
        authEmail = configuration["Firebase:email"]!;
        authPassword = configuration["Firebase:pass"]!;
        bucket = configuration["Firebase:bucket"]!;
        authDomain = configuration["Firebase:authDomain"]!;
    }
    public FirebaseService(IConfiguration config)
    {
        user = null;
        client = null;
        this.configuration = config;
        Configure();
        Setup();
    }

    public async Task<string> UploadLiteratura(int predmetId, int userId, byte[]? bytes, string fileName)
    {
        if (client == null)
        {
            return "";
        }
        if (user == null)
        {
            user = await client.SignInWithEmailAndPasswordAsync(authEmail, authPassword);
        }

        MemoryStream stream = new MemoryStream(bytes!);

        var task = new FirebaseStorage(bucket, new FirebaseStorageOptions
        {
            AuthTokenAsyncFactory = () => user.User.GetIdTokenAsync(),
            ThrowOnCancel = true
        }).Child("literatura").Child($"{predmetId}").Child($"{userId}").Child(fileName).PutAsync(stream);
        var downloadUrl = await task;
        return downloadUrl;
    }

    private MemoryStream ReadFile(IFormFile file)
    {
        long numBytes = file.Length;
        byte[] fileBytes = new byte[numBytes];
        file.OpenReadStream().Read(fileBytes, 0, (int)numBytes);
        return new MemoryStream(fileBytes);
    }

    public async Task RemoveMentorRequestPhotos(int predmetId, int userId)
    {
        if (client == null)
        {
            return;
        }
        if (user == null)
        {
            user = await client.SignInWithEmailAndPasswordAsync(authEmail, authPassword);
        }

        try
        {
            await storage.Child("mentor-zahtevi").Child($"{predmetId}").Child($"{userId}").Child("file1").DeleteAsync();
            await storage.Child("mentor-zahtevi").Child($"{predmetId}").Child($"{userId}").Child("file2").DeleteAsync();
        }
        catch (Exception ex)
        {
            throw (ex);
        }

    }
    public async Task<string[]> UploadMentorRequestPhotos(int predmetId, int userId, IFormFile file1, IFormFile file2)
    {
        if (client == null)
        {
            return null;
        }
        if (user == null)
        {
            user = await client.SignInWithEmailAndPasswordAsync(authEmail, authPassword);
        }
        string[] downloadUrls = new string[2];
        var firstFile = ReadFile(file1);
        var secondFile = ReadFile(file2);
        var task1 = storage!.Child("mentor-zahtevi").Child($"{predmetId}").Child($"{userId}").Child(file1.Name).PutAsync(firstFile);
        var task2 = storage.Child("mentor-zahtevi").Child($"{predmetId}").Child($"{userId}").Child(file2.Name).PutAsync(secondFile);
        try
        {
            downloadUrls[0] = await task1;
            downloadUrls[1] = await task2;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
        return downloadUrls;
    }

    public void Setup()
    {
        var authConfig = new FirebaseAuthConfig
        {
            ApiKey = apiKey,
            AuthDomain = authDomain,
            Providers = new Firebase.Auth.Providers.FirebaseAuthProvider[]{
                new EmailProvider()
            },
            UserRepository = new FileUserRepository("fb")
        };
        client = new FirebaseAuthClient(authConfig);
        storage = new FirebaseStorage(bucket, new FirebaseStorageOptions
        {
            AuthTokenAsyncFactory = () => user.User.GetIdTokenAsync(),
            ThrowOnCancel = true
        });
    }
}
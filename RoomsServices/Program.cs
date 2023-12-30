using Microsoft.EntityFrameworkCore;
using rooms.Data;
using rooms.Modules;
using Steeltoe.Discovery.Client;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(policy =>
{
    policy.AddDefaultPolicy(options =>
    {
        options.WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddDiscoveryClient(builder.Configuration);



var app = builder.Build();

app.UseCors();


app.UseDiscoveryClient();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.AddRoomModule();

app.Run();


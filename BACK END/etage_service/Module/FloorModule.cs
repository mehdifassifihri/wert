using etage_service.Data;
using etage_service.Models;
using Microsoft.AspNetCore.Mvc;

namespace etage_service.Module
{
    public static class FloorModule
    {
        public static IEndpointRouteBuilder AddFloorModule(this IEndpointRouteBuilder builder)
        {
            builder.MapGet("/api/floors", (ApplicationDbContext dbContext) =>
            {

                return Results.Ok(dbContext.Floors);

            });


            builder.MapPost("/api/floors/create", ([FromBody] Floor floor, ApplicationDbContext dbContext) =>
            {

                dbContext.Floors.Add(floor);
                dbContext.SaveChanges();
                return Results.Ok(floor);


            });


            builder.MapGet("/api/floor/{id}", (Guid id, ApplicationDbContext dbContext) =>
            {
                Floor? floor = dbContext.Floors.Find(id);

                if (floor is null)
                    return Results.NotFound("floor not found");

                return Results.Ok(floor);
            });

            builder.MapPut("/api/floor/update", (Floor floor, ApplicationDbContext dbContext) =>
            {
                Floor? floorToUpdate = dbContext.Floors.Find(floor.Id);
                if (floorToUpdate is null)
                    return Results.NotFound("floor not found");
                floorToUpdate.FloorNumber = floor.FloorNumber;
                return Results.Ok(floorToUpdate);
            });


            builder.MapDelete("/api/floor/{id}", (Guid id, ApplicationDbContext dbContext) =>
            {
                Floor? floor = dbContext.Floors.Find(id);
                if (floor is null)
                    return Results.NotFound("floor not found");

                dbContext.Floors.Remove(floor);
                dbContext.SaveChanges();
                return Results.Ok("Deleted");
            });


            return builder;
        }
    }
}
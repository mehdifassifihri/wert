using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using rooms.Data;
using rooms.Entity;

namespace rooms.Modules
{
    public static class RoomsModule
    {
        public static IEndpointRouteBuilder AddRoomModule(this IEndpointRouteBuilder routeBuilder)
        {

            routeBuilder.MapGet("/api/rooms", (ApplicationDbContext dbContext) => Results.Ok(dbContext.Rooms.AsNoTracking()));

            routeBuilder.MapPost("/api/rooms/create", (ApplicationDbContext dbContext, [FromBody] Room room) =>
            {

                dbContext.Rooms.Add(room);
                dbContext.SaveChanges();
                return Results.Created(room.Id.ToString(), room);

            });


            routeBuilder.MapPut("/api/rooms/update", (Room room, ApplicationDbContext dbContext) =>
            {

                Room? roomToUpdate = dbContext.Rooms.Find(room.Id);
                if (room is null)
                    return Results.NotFound("Cannot find this room");


                roomToUpdate!.MaxNumber = room.MaxNumber;
                roomToUpdate.Name = room.Name;
                dbContext.Rooms.Update(room);
                dbContext.SaveChanges();

                return Results.Ok(roomToUpdate);
            });



            routeBuilder.MapGet("/api/rooms/{id:Guid}", (Guid id, ApplicationDbContext dbContext) =>
            {

                Room? room = dbContext.Rooms.Find(id);
                if (room is null)
                    return Results.NotFound("Cannot find this room");

                return Results.Ok(room);

            });


            routeBuilder.MapDelete("/api/rooms/delete/{id:Guid}", (Guid id, ApplicationDbContext dbContext) =>
            {
                Room? room = dbContext.Rooms.Find(id);
                if (room is null)
                    return Results.NotFound("Cannot find this room");

                dbContext.Rooms.Remove(room);
                dbContext.SaveChanges();

                return Results.Ok();

            });


            return routeBuilder;
        }
    }
}
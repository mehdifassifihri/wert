using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using rooms.Data;
using rooms.Entity;
using RoomsServices.Dto;
using RoomsServices.Entity;

namespace rooms.Modules
{
    public static class RoomsModule
    {
        public static IEndpointRouteBuilder AddRoomModule(this IEndpointRouteBuilder routeBuilder)
        {

            routeBuilder.MapGet("/api/rooms", async (ApplicationDbContext dbContext) =>
            {

                List<Room> rooms = dbContext.Rooms.ToList();
                List<RoomDto> roomDtos = new();

                var httpClient = new HttpClient();


                foreach (var room in rooms)
                {
                    var res = await httpClient.GetAsync("http://localhost:5033/api/floor/" + room.FloorId is null ? "21790a76-01fe-4dfe-8d57-62fef6dad0a8" : room.FloorId.ToString());

                    if (res.IsSuccessStatusCode)
                    {
                        string content = await res.Content.ReadAsStringAsync();
                        Floor floor = JsonSerializer.Deserialize<Floor>(content)!;
                        Console.WriteLine(floor.FloorNumber);
                        roomDtos.Add(new RoomDto()
                        {
                            Id = room.Id,
                            Name = room.Name,
                            MaxNumber = room.MaxNumber,
                            Floor = new()
                            {
                                Id = floor.Id,
                                FloorNumber = floor.FloorNumber
                            }
                        });
                    }
                    else
                    {
                        roomDtos.Add(new RoomDto()
                        {
                            Id = room.Id,
                            Name = room.Name,
                            MaxNumber = room.MaxNumber,
                            Floor = null
                        });
                    }



                }


                return Results.Ok(roomDtos);
            });

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



            routeBuilder.MapGet("/api/rooms/{id:Guid}", async (Guid id, ApplicationDbContext dbContext) =>
            {

                Room? room = dbContext.Rooms.Find(id);
                HttpClient httpClient = new();



                if (room is null)
                    return Results.NotFound("Cannot find this room");

                var res = await httpClient.GetAsync("http://localhost:5033/api/floor/" + room.FloorId is null ? "21790a76-01fe-4dfe-8d57-62fef6dad0a8" : room.FloorId.ToString());

                if (res.IsSuccessStatusCode)
                {
                    var content = await res.Content.ReadAsStringAsync();
                    Floor? floor = JsonSerializer.Deserialize<Floor>(content);

                    if (floor is not null)
                        return Results.Ok(new RoomDto()
                        {
                            Id = room.Id,
                            Name = room.Name,
                            MaxNumber = room.MaxNumber,
                            Floor = new()
                            {
                                Id = floor.Id,
                                FloorNumber = floor.FloorNumber
                            }
                        });
                }


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
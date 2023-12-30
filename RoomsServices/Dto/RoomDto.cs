

using RoomsServices.Entity;

namespace RoomsServices.Dto
{
    public class RoomDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int MaxNumber { get; set; }

        public Floor? Floor { get; set; }
    }
}
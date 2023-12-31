using System.ComponentModel.DataAnnotations;

namespace rooms.Entity
{
    public class Room
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int MaxNumber { get; set; }
        public Guid FloorId { get; set; }
    }
}
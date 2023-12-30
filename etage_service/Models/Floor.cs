using System.ComponentModel.DataAnnotations;

namespace etage_service.Models
{
    public class Floor
    {
        [Key]
        public Guid Id { get; set; }
        public int FloorNumber { get; set; }
    }
}


using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace RoomsServices.Entity
{
    public class Floor
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; }
        [JsonPropertyName("floorNumber")]
        public int FloorNumber { get; set; }
    }
}
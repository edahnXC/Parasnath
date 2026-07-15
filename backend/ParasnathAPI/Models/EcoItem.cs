namespace ParasnathAPI.Models
{
    public class EcoItem
    {
        public int Id { get; set; }
        // "flora" or "fauna"
        public required string Type { get; set; } 
        public required string Name { get; set; }
        public string? ScientificName { get; set; }
        public required string Description { get; set; }
        public required string ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

using System;
using System.Collections.Generic;

namespace ParasnathAPI.Models
{
    public class Temple
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ShortDescription { get; set; } = string.Empty;
        public string MainImage { get; set; } = string.Empty;
        public string History { get; set; } = string.Empty;
        public string Significance { get; set; } = string.Empty;
        public string Architecture { get; set; } = string.Empty;
        public string BestTimeToVisit { get; set; } = string.Empty;
        public string Facilities { get; set; } = string.Empty;
        public List<string> Images { get; set; } = new();
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

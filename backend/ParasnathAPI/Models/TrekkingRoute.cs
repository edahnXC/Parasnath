using System;
using System.Collections.Generic;

namespace ParasnathAPI.Models
{
    public class TrekkingRoute
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Difficulty { get; set; } = string.Empty; // Easy, Moderate, Difficult
        public double Distance { get; set; } // in km
        public string Duration { get; set; } = string.Empty;
        public string StartingPoint { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string MainImage { get; set; } = string.Empty;
        public List<Waypoint> Waypoints { get; set; } = new();
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

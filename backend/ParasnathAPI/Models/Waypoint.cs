using System;
using System.Collections.Generic;

namespace ParasnathAPI.Models
{
    public class Waypoint
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public List<string> Images { get; set; } = new();
        public int TrekkingRouteId { get; set; }
    }
}

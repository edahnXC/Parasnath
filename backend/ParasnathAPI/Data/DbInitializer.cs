using Microsoft.EntityFrameworkCore;
using ParasnathAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ParasnathAPI.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context)
        {
            // Auto-run migrations or ensure DB is created
            context.Database.EnsureCreated();

            // Look for any temples.
            if (context.Temples.Any())
            {
                return;   // DB has been seeded
            }

            var temples = new List<Temple>
            {
                new Temple
                {
                    Name = "Shikharji Temple",
                    Location = "Parasnath Hill Peak, Giridih, Jharkhand",
                    Description = "Shikharji is one of the most sacred pilgrimage sites for Jains, believed to be the place where 20 of the 24 Jain Tirthankaras attained moksha. The main temple complex features beautiful marble carvings and offers panoramic views of the surrounding landscape.",
                    ShortDescription = "The most sacred Jain pilgrimage site with 20 Tirthankaras attaining moksha here",
                    MainImage = "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200",
                    History = "The historical roots of Shikharji as a sacred place of liberation trace back to ancient times, detailed in various Jain scriptures. Over the centuries, devotees have constructed beautiful shrines at the spots where each Tirthankara attained moksha.",
                    Significance = "It is considered the most sacred hill in Jainism. Visiting the summit is considered a key spiritual milestone for devotees.",
                    Architecture = "Features traditional Jain temple design with white marble domes, pillars decorated with intricate carvings, and serene sanctums.",
                    BestTimeToVisit = "October to March (when temperatures are cool and pleasant for the climb)",
                    Facilities = "Devotee rest halls (dharamshalas), clean drinking water booths, emergency medical help, and local transport carriers (doli) for those unable to walk.",
                    Images = new List<string>
                    {
                        "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200",
                        "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200"
                    }
                },
                new Temple
                {
                    Name = "Bhomia Baba Temple",
                    Location = "Near Shikharji peak, Parasnath Hill",
                    Description = "This ancient temple is dedicated to Bhomia Baba, a revered guardian deity of the Parasnath hills. The temple is known for its peaceful atmosphere and unique stone carvings that depict various Jain legends.",
                    ShortDescription = "Ancient temple dedicated to Bhomia Baba with unique stone carvings",
                    MainImage = "https://images.unsplash.com/photo-1602616191538-40d02b26af29?q=80&w=1200",
                    History = "Bhomia Baba is believed to protect the hill and all travelers climbing it. The local tribes and pilgrims have worshipped at this shrine for centuries before beginning the final ascent.",
                    Significance = "Pilgrims pray here for safe passage and strength during their trekking pilgrimage.",
                    Architecture = "A simple stone and concrete structure adorned with traditional motifs, matching the rustic mountain environment.",
                    BestTimeToVisit = "Year-round, especially during Jain festivals like Mahavir Jayanti",
                    Facilities = "Basic seating areas, nearby local snack stalls, and resting shelters.",
                    Images = new List<string>
                    {
                        "https://images.unsplash.com/photo-1602616191538-40d02b26af29?q=80&w=1200"
                    }
                },
                new Temple
                {
                    Name = "Gandharva Nala Temple",
                    Location = "Western slope of Parasnath Hill",
                    Description = "This picturesque temple is situated near a natural spring and is surrounded by lush greenery. It features beautiful frescoes depicting scenes from Jain scriptures and offers a serene atmosphere for meditation.",
                    ShortDescription = "Picturesque temple near a natural spring with beautiful frescoes",
                    MainImage = "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1200",
                    History = "Built at the confluence of a natural mountain stream (nala), Gandharva Nala Temple has traditionally served as a mid-way resting point for pilgrims trekking up from the Madhuban side.",
                    Significance = "The natural stream waters are considered holy and are used by pilgrims to cleanse themselves before prayers.",
                    Architecture = "Classical temple design utilizing locally sourced granite and bricks, featuring colorful murals showing the life stories of Tirthankaras.",
                    BestTimeToVisit = "Monsoon and winter seasons (when the stream is full and green forests are lush)",
                    Facilities = "Shaded pavilions, freshwater spring tap, and washroom facilities.",
                    Images = new List<string>
                    {
                        "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1200"
                    }
                }
            };

            context.Temples.AddRange(temples);
            context.SaveChanges();

            var routes = new List<TrekkingRoute>
            {
                new TrekkingRoute
                {
                    Name = "Madhuban to Shikharji Peak Trail",
                    Difficulty = "Moderate",
                    Distance = 9.0,
                    Duration = "3-4 Hours",
                    StartingPoint = "Madhuban Trailhead",
                    Description = "The primary and most popular trail taken by pilgrims and trekkers to reach the sacred summit of Parasnath Hill. The trail is fully paved, surrounded by dense deciduous forests, stream crossings, and offers resting shelters every kilometer.",
                    MainImage = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200",
                    Waypoints = new List<Waypoint>
                    {
                        new Waypoint
                        {
                            Name = "Madhuban Base",
                            Description = "The base camp and trailhead. Here you will find local guides, walking sticks, local eateries, and dharamshalas.",
                            Latitude = 24.0150,
                            Longitude = 86.1300,
                            Images = new List<string> { "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600" }
                        },
                        new Waypoint
                        {
                            Name = "Gandharva Nala Stop",
                            Description = "A major resting area located near a natural fresh water stream. Excellent spot to rest, hydrate, and enjoy the local forests.",
                            Latitude = 23.9850,
                            Longitude = 86.1340,
                            Images = new List<string> { "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600" }
                        },
                        new Waypoint
                        {
                            Name = "Bhomia Baba Junction",
                            Description = "A spiritual junction near the Bhomia Baba temple. The path gets slightly steeper from this point onwards.",
                            Latitude = 23.9680,
                            Longitude = 86.1360,
                            Images = new List<string> { "https://images.unsplash.com/photo-1602616191538-40d02b26af29?q=80&w=600" }
                        },
                        new Waypoint
                        {
                            Name = "Shikharji Peak Summit",
                            Description = "The highest peak (1350m) and the main temple complex. Offers panoramic views of Giridih and surrounding hills.",
                            Latitude = 23.9611,
                            Longitude = 86.1371,
                            Images = new List<string> { "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600" }
                        }
                    }
                }
            };

            context.TrekkingRoutes.AddRange(routes);
            context.SaveChanges();
        }
    }
}

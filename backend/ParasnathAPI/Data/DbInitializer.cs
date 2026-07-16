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

            // DB Seeders will individually check if data exists

            var temples = new List<Temple>
            {
                new Temple
                {
                    Name = "Shikharji Temple",
                    Location = "Parasnath Hill Peak, Giridih, Jharkhand",
                    Description = "Shikharji is one of the most sacred pilgrimage sites for Jains, believed to be the place where 20 of the 24 Jain Tirthankaras attained moksha. The main temple complex features beautiful marble carvings and offers panoramic views of the surrounding landscape.",
                    ShortDescription = "The most sacred Jain pilgrimage site with 20 Tirthankaras attaining moksha here",
                    MainImage = "",
                    History = "The historical roots of Shikharji as a sacred place of liberation trace back to ancient times, detailed in various Jain scriptures. Over the centuries, devotees have constructed beautiful shrines at the spots where each Tirthankara attained moksha.",
                    Significance = "It is considered the most sacred hill in Jainism. Visiting the summit is considered a key spiritual milestone for devotees.",
                    Architecture = "Features traditional Jain temple design with white marble domes, pillars decorated with intricate carvings, and serene sanctums.",
                    BestTimeToVisit = "October to March (when temperatures are cool and pleasant for the climb)",
                    Facilities = "Devotee rest halls (dharamshalas), clean drinking water booths, emergency medical help, and local transport carriers (doli) for those unable to walk.",
                    Images = new List<string>
                    {
                        "",
                        ""
                    }
                },
                new Temple
                {
                    Name = "Bhomia Baba Temple",
                    Location = "Near Shikharji peak, Parasnath Hill",
                    Description = "This ancient temple is dedicated to Bhomia Baba, a revered guardian deity of the Parasnath hills. The temple is known for its peaceful atmosphere and unique stone carvings that depict various Jain legends.",
                    ShortDescription = "Ancient temple dedicated to Bhomia Baba with unique stone carvings",
                    MainImage = "",
                    History = "Bhomia Baba is believed to protect the hill and all travelers climbing it. The local tribes and pilgrims have worshipped at this shrine for centuries before beginning the final ascent.",
                    Significance = "Pilgrims pray here for safe passage and strength during their trekking pilgrimage.",
                    Architecture = "A simple stone and concrete structure adorned with traditional motifs, matching the rustic mountain environment.",
                    BestTimeToVisit = "Year-round, especially during Jain festivals like Mahavir Jayanti",
                    Facilities = "Basic seating areas, nearby local snack stalls, and resting shelters.",
                    Images = new List<string>
                    {
                        ""
                    }
                },
                new Temple
                {
                    Name = "Gandharva Nala Temple",
                    Location = "Western slope of Parasnath Hill",
                    Description = "This picturesque temple is situated near a natural spring and is surrounded by lush greenery. It features beautiful frescoes depicting scenes from Jain scriptures and offers a serene atmosphere for meditation.",
                    ShortDescription = "Picturesque temple near a natural spring with beautiful frescoes",
                    MainImage = "",
                    History = "Built at the confluence of a natural mountain stream (nala), Gandharva Nala Temple has traditionally served as a mid-way resting point for pilgrims trekking up from the Madhuban side.",
                    Significance = "The natural stream waters are considered holy and are used by pilgrims to cleanse themselves before prayers.",
                    Architecture = "Classical temple design utilizing locally sourced granite and bricks, featuring colorful murals showing the life stories of Tirthankaras.",
                    BestTimeToVisit = "Monsoon and winter seasons (when the stream is full and green forests are lush)",
                    Facilities = "Shaded pavilions, freshwater spring tap, and washroom facilities.",
                    Images = new List<string>
                    {
                        ""
                    }
                }
            };

            if (!context.Temples.Any())
            {
                context.Temples.AddRange(temples);
                context.SaveChanges();
            }

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
                    MainImage = "",
                    Waypoints = new List<Waypoint>
                    {
                        new Waypoint
                        {
                            Name = "Madhuban Base",
                            Description = "The base camp and trailhead. Here you will find local guides, walking sticks, local eateries, and dharamshalas.",
                            Latitude = 24.0150,
                            Longitude = 86.1300,
                            Images = new List<string> { "" }
                        },
                        new Waypoint
                        {
                            Name = "Gandharva Nala Stop",
                            Description = "A major resting area located near a natural fresh water stream. Excellent spot to rest, hydrate, and enjoy the local forests.",
                            Latitude = 23.9850,
                            Longitude = 86.1340,
                            Images = new List<string> { "" }
                        },
                        new Waypoint
                        {
                            Name = "Bhomia Baba Junction",
                            Description = "A spiritual junction near the Bhomia Baba temple. The path gets slightly steeper from this point onwards.",
                            Latitude = 23.9680,
                            Longitude = 86.1360,
                            Images = new List<string> { "" }
                        },
                        new Waypoint
                        {
                            Name = "Shikharji Peak Summit",
                            Description = "The highest peak (1350m) and the main temple complex. Offers panoramic views of Giridih and surrounding hills.",
                            Latitude = 23.9611,
                            Longitude = 86.1371,
                            Images = new List<string> { "" }
                        }
                    }
                }
            };

            if (!context.TrekkingRoutes.Any())
            {
                context.TrekkingRoutes.AddRange(routes);
                context.SaveChanges();
            }

            // Seed Gallery Images
            if (!context.GalleryImages.Any())
            {
                var photos = new List<GalleryImage>
                {
                    new GalleryImage { Url = "/images/parasnath-hill.jpg", Title = "Parasnath Peak", Description = "A breathtaking view of the Parasnath Hills." },
                    new GalleryImage { Url = "/images/gallery2.jpg", Title = "Temple Architecture", Description = "Intricate marble carvings." },
                    new GalleryImage { Url = "/images/gallery3.jpg", Title = "Mountain View", Description = "Scenic view from the hills." },
                    new GalleryImage { Url = "/images/gallery4.jpg", Title = "Peaceful Pathway", Description = "Trekking route view." },
                    new GalleryImage { Url = "/images/gallery5.jpg", Title = "Sacred Shrine", Description = "One of the beautiful shrines." }
                };
                context.GalleryImages.AddRange(photos);
                context.SaveChanges();
            }

            if (!context.EcoItems.Any())
            {
                var ecoItems = new List<EcoItem>
                {
                    // Fauna
                    new EcoItem { Name = "Sloth Bear", Type = "fauna", Description = "A myrmecophagous bear species native to the Indian subcontinent, commonly found in the mixed deciduous forests of Parasnath Wildlife Sanctuary.", ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Sloth_Bear_in_Yala_National_Park.jpg/800px-Sloth_Bear_in_Yala_National_Park.jpg" },
                    new EcoItem { Name = "Barking Deer", Type = "fauna", Description = "Also known as the Indian Muntjac, this small deer is known for its distinctive bark-like call and is frequently spotted in the dense undergrowth of the hills.", ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Indian_Muntjac_in_Nagarhole.jpg/800px-Indian_Muntjac_in_Nagarhole.jpg" },
                    new EcoItem { Name = "Wild Boar", Type = "fauna", Description = "A robust and adaptable species that plays a key ecological role in the forests of Parasnath by turning over soil while foraging.", ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Wild_Boar_H%C3%BClser_Berg_02.jpg/800px-Wild_Boar_H%C3%BClser_Berg_02.jpg" },
                    new EcoItem { Name = "Langur", Type = "fauna", Description = "Gray langurs are highly social primates that inhabit the forested slopes of Parasnath, often seen swinging through the canopy or resting near temples.", ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Gray_langur_%28Semnopithecus_entellus%29.jpg/800px-Gray_langur_%28Semnopithecus_entellus%29.jpg" },
                    new EcoItem { Name = "Macaque", Type = "fauna", Description = "Rhesus macaques are common around the pilgrimage trails, intelligent and curious monkeys that are familiar with human presence.", ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Rhesus_macaque_%28Macaca_mulatta%29_2.jpg/800px-Rhesus_macaque_%28Macaca_mulatta%29_2.jpg" },
                    
                    // Flora
                    new EcoItem { Name = "Sal (Shorea robusta)", Type = "flora", Description = "A dominant tree species in the Parasnath Wildlife Sanctuary, providing dense canopy cover and crucial habitat for numerous wildlife species.", ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Shorea_robusta_tree.jpg/800px-Shorea_robusta_tree.jpg" },
                    new EcoItem { Name = "Bamboo", Type = "flora", Description = "Extensive bamboo groves are found throughout the sanctuary, serving as an important food source and shelter for animals.", ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bamboo_forest_Arashiyama.jpg/800px-Bamboo_forest_Arashiyama.jpg" },
                    new EcoItem { Name = "Teak (Tectona grandis)", Type = "flora", Description = "A valuable deciduous timber tree that thrives in the mixed forests of the region, known for its large leaves and durable wood.", ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Tectona_grandis_-_Khao_Yai.jpg/800px-Tectona_grandis_-_Khao_Yai.jpg" },
                    new EcoItem { Name = "Kalmegh (Andrographis paniculata)", Type = "flora", Description = "An important ethnomedicinal herb found in the local forests, traditionally used by local tribes for its medicinal properties.", ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Andrographis_paniculata.jpg/800px-Andrographis_paniculata.jpg" }
                };
                context.EcoItems.AddRange(ecoItems);
                context.SaveChanges();
            }

            // Seed Site Settings
            if (!context.SiteSettings.Any())
            {
                var settings = new List<SiteSetting>
                {
                    new SiteSetting { Key = "HomeHeroImage", Value = "/images/parasnath-hill.jpg" },
                    new SiteSetting { Key = "HomeIntroImage", Value = "/images/parasnath-hill.jpg" }
                };
                context.SiteSettings.AddRange(settings);
                context.SaveChanges();
            }
        }
    }
}

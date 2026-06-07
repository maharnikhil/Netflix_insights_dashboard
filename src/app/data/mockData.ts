// Mock data for Netflix insights dashboard

export const topMovies = [
  { id: 1, title: "Stranger Things", views: 89500000, rating: 8.7, genre: "Sci-Fi", revenue: 125000000 },
  { id: 2, title: "The Crown", views: 72300000, rating: 8.6, genre: "Drama", revenue: 98000000 },
  { id: 3, title: "Squid Game", views: 111200000, rating: 8.0, genre: "Thriller", revenue: 156000000 },
  { id: 4, title: "Bridgerton", views: 82100000, rating: 7.3, genre: "Romance", revenue: 110000000 },
  { id: 5, title: "The Witcher", views: 76800000, rating: 8.2, genre: "Fantasy", revenue: 102000000 },
  { id: 6, title: "Wednesday", views: 68900000, rating: 8.1, genre: "Comedy", revenue: 88000000 },
  { id: 7, title: "Ozark", views: 54200000, rating: 8.5, genre: "Crime", revenue: 76000000 },
  { id: 8, title: "Money Heist", views: 65700000, rating: 8.2, genre: "Action", revenue: 85000000 },
];

export const genreData = [
  { genre: "Drama", views: 245000000, hours: 1850000000, avgRating: 7.8 },
  { genre: "Action", views: 198000000, hours: 1450000000, avgRating: 7.5 },
  { genre: "Comedy", views: 175000000, hours: 1280000000, avgRating: 7.2 },
  { genre: "Thriller", views: 167000000, hours: 1320000000, avgRating: 7.9 },
  { genre: "Sci-Fi", views: 134000000, hours: 1120000000, avgRating: 8.1 },
  { genre: "Romance", views: 128000000, hours: 980000000, avgRating: 7.4 },
  { genre: "Horror", views: 98000000, hours: 780000000, avgRating: 7.3 },
  { genre: "Fantasy", views: 112000000, hours: 920000000, avgRating: 7.8 },
  { genre: "Documentary", views: 87000000, hours: 650000000, avgRating: 8.3 },
  { genre: "Crime", views: 145000000, hours: 1150000000, avgRating: 8.0 },
];

export const genderData = [
  { gender: "Male", percentage: 52, count: 156000000 },
  { gender: "Female", percentage: 46, count: 138000000 },
  { gender: "Other", percentage: 2, count: 6000000 },
];

export const ageData = [
  { ageGroup: "13-17", count: 45000000, percentage: 15 },
  { ageGroup: "18-24", count: 75000000, percentage: 25 },
  { ageGroup: "25-34", count: 90000000, percentage: 30 },
  { ageGroup: "35-44", count: 54000000, percentage: 18 },
  { ageGroup: "45-54", count: 24000000, percentage: 8 },
  { ageGroup: "55+", count: 12000000, percentage: 4 },
];

export const countryData = [
  { country: "United States", viewers: 67000000, growth: 5.2, flag: "🇺🇸" },
  { country: "Brazil", viewers: 42000000, growth: 8.7, flag: "🇧🇷" },
  { country: "United Kingdom", viewers: 38000000, growth: 4.1, flag: "🇬🇧" },
  { country: "India", viewers: 52000000, growth: 12.3, flag: "🇮🇳" },
  { country: "Germany", viewers: 28000000, growth: 3.8, flag: "🇩🇪" },
  { country: "France", viewers: 25000000, growth: 4.5, flag: "🇫🇷" },
  { country: "Mexico", viewers: 31000000, growth: 7.9, flag: "🇲🇽" },
  { country: "Japan", viewers: 22000000, growth: 6.2, flag: "🇯🇵" },
  { country: "South Korea", viewers: 18000000, growth: 9.1, flag: "🇰🇷" },
  { country: "Spain", viewers: 19000000, growth: 5.3, flag: "🇪🇸" },
];

export const monthlyViewsData = [
  { month: "Jan", views: 245000000, hours: 1850000000 },
  { month: "Feb", views: 238000000, hours: 1780000000 },
  { month: "Mar", views: 267000000, hours: 2010000000 },
  { month: "Apr", views: 289000000, hours: 2150000000 },
  { month: "May", views: 312000000, hours: 2340000000 },
  { month: "Jun", views: 298000000, hours: 2230000000 },
];

export const peakHoursData = [
  { hour: "00:00", viewers: 12000000 },
  { hour: "03:00", viewers: 8000000 },
  { hour: "06:00", viewers: 15000000 },
  { hour: "09:00", viewers: 28000000 },
  { hour: "12:00", viewers: 35000000 },
  { hour: "15:00", viewers: 42000000 },
  { hour: "18:00", viewers: 58000000 },
  { hour: "21:00", viewers: 75000000 },
  { hour: "24:00", viewers: 18000000 },
];

export const deviceData = [
  { device: "Smart TV", percentage: 42, users: 126000000 },
  { device: "Mobile", percentage: 31, users: 93000000 },
  { device: "Desktop", percentage: 18, users: 54000000 },
  { device: "Tablet", percentage: 9, users: 27000000 },
];

export const contentRatingData = [
  { rating: "G", count: 1200, avgViews: 15000000 },
  { rating: "PG", count: 2800, avgViews: 28000000 },
  { rating: "PG-13", count: 3500, avgViews: 45000000 },
  { rating: "R", count: 2200, avgViews: 38000000 },
  { rating: "TV-MA", count: 1800, avgViews: 52000000 },
];

namespace TestApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string FullName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public required string Email { get; set; }
        public required string ContactNumber { get; set; }
        public List<Food> foodModels { get; set; } = new List<Food>();
    }
}

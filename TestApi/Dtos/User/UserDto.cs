using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestApi.Dtos.User
{
    public class UserDto
    {
        public int Id { get; set; }
        public required string FullName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public required string Email { get; set; }
        public required string ContactNumber { get; set; }
        public List<string>? FavoriteFoods { get; set; } 
        public List<string>? Preferences { get; set; }

    }
}
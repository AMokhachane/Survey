using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestApi.Dtos.User
{
    public class CreateUserRequestDto
    {
        public required string FullName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public required string Email { get; set; }
        public required string ContactNumber { get; set; }  
    }
}
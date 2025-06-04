using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestApi.Dtos.User;
using TestApi.Models;

namespace TestApi.Mappers
{
    public static class UserMappers
    {
        public static UserDto ToUserDto(this User userModel)
        {
            return new UserDto
            {
                Id = userModel.Id,
                FullName = userModel.FullName,
                DateOfBirth = userModel.DateOfBirth,
                Email = userModel.Email,
                ContactNumber = userModel.ContactNumber
            };
        }

        public static User ToUserFromCreateDTO(this CreateUserRequestDto userDto)
        {
            return new User
            {
                FullName = userDto.FullName,
                DateOfBirth = userDto.DateOfBirth,
                Email = userDto.Email,
                ContactNumber = userDto.ContactNumber
            };
        }
    }
}
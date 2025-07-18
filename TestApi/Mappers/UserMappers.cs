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
                ContactNumber = userModel.ContactNumber,
                FavoriteFoods = string.IsNullOrEmpty(userModel.FavoriteFoods)
                ? new List<string>()
                : userModel.FavoriteFoods.Split(',').ToList(),
                Preferences = string.IsNullOrEmpty(userModel.Preferences)
                ? new List<string>()
                : userModel.Preferences.Split(',').ToList()
            };
        }

        public static User ToUserFromCreateDTO(this CreateUserRequestDto userDto)
        {
            return new User
            {
                FullName = userDto.FullName,
                DateOfBirth = userDto.DateOfBirth,
                Email = userDto.Email,
                ContactNumber = userDto.ContactNumber,
                FavoriteFoods = userDto.FavoriteFoods != null
                ? string.Join(',', userDto.FavoriteFoods)
                : null,
                Preferences = userDto.Preferences != null
                ? string.Join(',', userDto.Preferences)
                : null
            };
        }
    }
}
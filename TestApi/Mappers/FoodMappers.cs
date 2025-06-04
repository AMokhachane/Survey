using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestApi.Dtos.Food;
using TestApi.Models;

namespace TestApi.Mappers
{
    public static class FoodMappers
    {
        public static FoodDto ToFoodDto(this Food foodModel)
        {
            return new FoodDto
            {
                Id = foodModel.Id,
                LikesPizza = foodModel.LikesPizza,
                LikesPasta = foodModel.LikesPasta,
                LikesPapAndWors = foodModel.LikesPapAndWors,
                LikesOther = foodModel.LikesOther,
                OtherFoodDescription = foodModel.OtherFoodDescription
            };
        }

        public static Food ToFoodFromCreateDTO(this CreateFoodRequestDto foodDto)
        {
            return new Food
            {
                LikesPizza = foodDto.LikesPizza,
                LikesPasta = foodDto.LikesPasta,
                LikesPapAndWors = foodDto.LikesPapAndWors,
                LikesOther = foodDto.LikesOther,
                OtherFoodDescription = foodDto.OtherFoodDescription

            };
        }
    }
}
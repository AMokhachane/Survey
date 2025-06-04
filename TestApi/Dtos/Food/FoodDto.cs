using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestApi.Dtos.Food
{
    public class FoodDto
    {
        public int Id { get; set; }
    public bool LikesPizza { get; set; }
    public bool LikesPasta { get; set; }
    public bool LikesPapAndWors { get; set; }
    public bool LikesOther { get; set; }
    public string? OtherFoodDescription { get; set; }
    }
}
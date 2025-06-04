using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestApi.Data;
using TestApi.Dtos.Food;
using TestApi.Mappers;

namespace TestApi.Controllers
{
    [Route("api/food")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public FoodController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var foods = _context.Foods.ToList()
            .Select(s => s.ToFoodDto());

            return Ok(foods);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var food = _context.Foods.Find(id);

            if (food == null)
            {
                return NotFound();
            }

            return Ok(food.ToFoodDto());
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateFoodRequestDto foodDto)
        {
            var foodModel = foodDto.ToFoodFromCreateDTO();
            _context.Foods.Add(foodModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = foodModel.Id }, foodModel.ToFoodDto());
        }
    }
}
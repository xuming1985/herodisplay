using System;

namespace GameDisplay.Dto
{
    public class BUserDto
    {
        public int Id { get; set; }

        public string Account { get; set; }

        public string Password { get; set; }

        public string RealName { get; set; }

        public string Email { get; set; }

        public string Telephone { get; set; }

        public int Role { get; set; }

        public string RoleName { get; set; }

        public string CreateUser { get; set; }

        public DateTime CreateTime { get; set; }
    }
}

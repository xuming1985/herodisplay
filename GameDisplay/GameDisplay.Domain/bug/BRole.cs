﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameDisplay.Domain
{
    [Table("BRole")]
    public class BRole
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        //创建人
        public int CreateUser { get; set; }

        //创建时间
        public DateTime CreateTime { get; set; }
    }
}

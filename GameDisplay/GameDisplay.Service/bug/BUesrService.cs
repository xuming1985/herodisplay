using GameDisplay.Common;
using GameDisplay.Domain;
using GameDisplay.Dto;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GameDisplay.Service
{
    public class BUesrService
    {
        public List<BUserDto> GetAll()
        {
            List<BUserDto> resultData = new List<BUserDto>();
            using (var db = new GameDataContext())
            {
                var users = db.BUsers.ToList();
                resultData = users.Select(user => new BUserDto()
                {
                    Id = user.Id,
                    Account = user.Account,
                    RealName = user.RealName,
                    Email = user.Email,
                    Telephone = user.Telephone,
                    Role = Enum.GetName(typeof(BRole), user.Role)
                }).ToList();

                return resultData;
            }
        }


        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public BUserDto CheckLogin(LoginInput input)
        {
            BUserDto result = null;
            using (var db = new GameDataContext())
            {
                string encryptPassword = Cryptogram.MD5Encrypt64(input.Password);
                var user = db.BUsers.FirstOrDefault(o => o.Account == input.Account && o.Password == encryptPassword);
                if (user != null)
                {
                    result = new BUserDto()
                    {
                        Id = user.Id,
                        RealName = user.RealName,
                        Role = Enum.GetName(typeof(BRole), user.Role)
                    };
                }

                return result;
            }
        }


    }
}

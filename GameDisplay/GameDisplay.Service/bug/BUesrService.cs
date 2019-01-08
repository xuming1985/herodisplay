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

        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public BUserDto CheckUser(LoginInput input)
        {
            BUserDto result = null;
            try
            {
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
                            Role = db.BRoles.FirstOrDefault(o=>o.Id == user.Role).Name
                        };
                    }

                    return result;
                }
            }
            catch (Exception ex)
            {
                return result;
            }
        }

        /// <summary>
        /// 用户查询
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public List<BUserDto> Query(BUserQueryInput input)
        {
            List<BUserDto> resultData = new List<BUserDto>();
            using (var db = new GameDataContext())
            {
                try
                {
                    var query = db.BUsers.OrderBy(o => o.Id);
                    input.Total = query.Count();

                    var users = query.Skip(input.Skip).Take(input.PageSize).ToList();
                    resultData = users.Select(user => new BUserDto()
                    {
                        Id = user.Id,
                        Account = user.Account,
                        RealName = user.RealName,
                        Email = user.Email,
                        Telephone = user.Telephone,
                        Role = db.BRoles.FirstOrDefault(o => o.Id == user.Role).Name
                    }).ToList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                
                return resultData;
            }
        }

        /// <summary>
        /// 删除用户基本信息， 状态设置未False
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public bool Delete(int id)
        {
            try
            {
                using (var db = new GameDataContext())
                {
                    BUser entity = db.BUsers.FirstOrDefault(o => o.Id == id);
                    if (entity != null)
                    {
                        entity.IsActive = false;
                        return db.SaveChanges() > 0;
                    }
                    return true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

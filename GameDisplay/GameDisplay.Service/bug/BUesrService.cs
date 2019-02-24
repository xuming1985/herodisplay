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
                    var user = db.BUsers.FirstOrDefault(o => o.Account == input.Account && o.Password == encryptPassword && o.IsActive == true);
                    if (user != null)
                    {
                        result = new BUserDto()
                        {
                            Id = user.Id,
                            RealName = user.RealName
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
        /// 加载登录账号的初始信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public BUserDto Query(int id)
        {
            BUserDto result = null;
            try
            {
                using (var db = new GameDataContext())
                {
                    var user = db.BUsers.FirstOrDefault(o => o.Id == id && o.IsActive == true);
                    if (user != null)
                    {
                        result = new BUserDto()
                        {
                            Id = user.Id,
                            RealName = user.RealName,
                            RoleName = db.BRoles.FirstOrDefault(o => o.Id == user.Role).Name,
                            Email = user.Email,
                            Telephone = user.Telephone
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
                        Role = user.Role,
                        RoleName = db.BRoles.FirstOrDefault(o => o.Id == user.Role).Name
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
        /// 以角色分组 获取所有用户
        /// </summary>
        /// <returns></returns>
        public List<TreeItem> GetRoleTree()
        {
            List<TreeItem> resultData = new List<TreeItem>();
            using (var db = new GameDataContext())
            {
                try
                {
                    var roles = db.BRoles.OrderBy(o => o.Id).ToList();
                    var users = db.BUsers.OrderBy(o => o.Id).GroupBy(o=>o.Role);
                    foreach (var group in users)
                    {
                        var role = roles.FirstOrDefault(o=>o.Id == group.Key);
                        if (role != null)
                        {
                            var treeItem = new TreeItem();
                            treeItem.Id = role.Id;
                            treeItem.Name = role.Name;
                            treeItem.Children = group.ToList().Select(user => new TreeItem()
                            {
                                Id = user.Id,
                                Name = user.RealName,
                            }).ToList();
                            resultData.Add(treeItem);
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }

                return resultData;
            }
        }

        /// <summary>
        /// 修改用户信息用户
        /// </summary>
        /// <returns></returns>
        public bool Update(BUserForEditDto dto)
        {
            using (var db = new GameDataContext())
            {
                try
                {
                    var entity = db.BUsers.FirstOrDefault(o => o.Id == dto.Id);
                    if (entity != null)
                    {
                        entity.RealName = dto.RealName;
                        entity.Email = dto.Email;
                        entity.Telephone = dto.Telephone;
                        entity.Role = dto.Role;
                        return db.SaveChanges() > 0;
                    }
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        /// <summary>
        /// 修改用户密码
        /// </summary>
        /// <returns></returns>
        public OperateResult UpdatePassword(PasswordResetDto dto)
        {
            using (var db = new GameDataContext())
            {
                try
                {
                    //两次密码不一致
                    if (dto.New != dto.NewConfirm)
                    {
                        return new OperateResult(false) { Message = "两次密码不一致" };
                    }

                    string encryptPassword = Cryptogram.MD5Encrypt64(dto.Old);
                    var entity = db.BUsers.FirstOrDefault(o => o.Id == dto.UserId && o.Password == encryptPassword);
                    if (entity != null)
                    {
                        entity.Password = Cryptogram.MD5Encrypt64(dto.New);

                        var result = new OperateResult();
                        result.Success = db.SaveChanges() > 0;
                        if (result.Success == false)
                        {
                            result.Message = "不允许保存";
                        }

                        return result;
                    }
                    else
                    {
                        //旧密码不正确
                        return new OperateResult(false) { Message = "旧密码不正确" };
                    }
                }
                catch (Exception ex)
                {
                    return new OperateResult(false) { Message = "服务异常" };
                }
            }
        }

        /// <summary>
        /// 重设用户密码
        /// </summary>
        /// <returns></returns>
        public OperateResult ResetPassword(PasswordResetDto dto)
        {
            using (var db = new GameDataContext())
            {
                try
                {
                    //两次密码不一致
                    if (dto.New != dto.NewConfirm)
                    {
                        return new OperateResult(false) { Message = "两次密码不一致" };
                    }

                    var entity = db.BUsers.FirstOrDefault(o => o.Id == dto.UserId);
                    if (entity != null)
                    {
                        entity.Password = entity.Password = Cryptogram.MD5Encrypt64(dto.New);

                        var result = new OperateResult();
                        result.Success = db.SaveChanges() > 0;
                        if (result.Success == false)
                        {
                            result.Message = "不允许保存";
                        }

                        return result;
                    }
                    else
                    {
                        //旧密码不正确
                        return new OperateResult(false) { Message = "当前用户不存在" };
                    }
                }
                catch (Exception ex)
                {
                    return new OperateResult(false) { Message = "服务异常" };
                }
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

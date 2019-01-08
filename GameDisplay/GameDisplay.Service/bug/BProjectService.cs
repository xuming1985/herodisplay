using GameDisplay.Domain;
using GameDisplay.Dto;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GameDisplay.Service
{
    public class BProjectService
    {
        /// <summary>
        /// 查询项目列表
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public List<BProjectDto> Query(BProjectQueryInput input)
        {
            List<BProjectDto> resultData = new List<BProjectDto>();
            using (var db = new GameDataContext())
            {
                try
                {
                    var query = db.BProjects.OrderBy(o => o.Id);
                    if (!string.IsNullOrWhiteSpace(input.Name))
                    {
                        query = query.Where(o=>o.Name.Contains(input.Name)).OrderBy(o => o.Id);
                    }

                    input.Total = query.Count();

                    var projects = query.Skip(input.Skip).Take(input.PageSize).ToList();
                    foreach (var item in projects)
                    {
                        var itemDto = new BProjectDto()
                        {
                            Id = item.Id,
                            Name = item.Name,
                            Desc = item.Desc,
                            IsActive = item.IsActive,
                            CreateUser = item.CreateUser,
                            CreateTime = item.CreateTime,
                        };
                        itemDto.Modules = db.BProjectModules.Where(o => o.ProjectId == itemDto.Id).Select(p => new BItem() { Id = p.Id, Name = p.Name, CreateUser = p.CreateUser, CreateTime = p.CreateTime}).ToList();

                        itemDto.Members = db.BUsers.Join(db.BUserProjects.Where(o => o.Id == itemDto.Id), a => a.Id, b => b.UserId, (a, b) => new BItem() {Id=a.Id, Name= a.RealName, CreateUser = b.CreateUser, CreateTime=b.CreateTime }).ToList();

                        resultData.Add(itemDto);
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
        /// 添加项目
        /// </summary>
        /// <param name="dto"></param>
        public bool Create(BProjectDto dto)
        {
            try
            {
                using (var db = new GameDataContext())
                {
                    BProject entity = new BProject();
                    entity.Name = dto.Name;
                    entity.Desc = dto.Desc;
                    entity.IsActive = true;
                    entity.CreateUser = dto.CreateUser;
                    entity.CreateTime = DateTime.Now;
                    db.BProjects.Add(entity);

                    if (dto.Members != null)
                    {
                        dto.Members.ForEach(item =>
                        {
                            db.BUserProjects.Add(new BUserProject() { ProjectId = entity.Id, UserId = entity.CreateUser});
                        });
                    }

                   return  db.SaveChanges() >0;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        /// <summary>
        /// 修改项目基本信息
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public bool Update(BProjectDto dto)
        {
            try
            {
                using (var db = new GameDataContext())
                {
                    BProject entity = db.BProjects.FirstOrDefault(o => o.Id == dto.Id);
                    if (entity != null)
                    {
                        entity.Name = dto.Name;
                        entity.Desc = dto.Desc;
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

        /// <summary>
        /// 修改项目成员
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public bool UpdateMembers(BProjectDto dto)
        {
            try
            {
                using (var db = new GameDataContext())
                {
                    var entities = db.BUserProjects.Where(o => o.ProjectId == dto.Id).ToList();

                    //删除
                    foreach (var item in entities)
                    {
                        if (dto.Members.All(o => o.Id != item.UserId))
                        {
                            db.BUserProjects.Remove(item);
                        }
                    }

                    //添加
                    foreach (var item in dto.Members)
                    {
                        if (entities.Count(o => o.UserId == item.Id) == 0)
                        {
                            db.BUserProjects.Add(new BUserProject() { ProjectId = dto.Id, UserId = item.Id});
                        }
                    }

                    return db.SaveChanges() > 0;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 修改项目模块
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public bool AddModule(BProjectModuleDto dto)
        {
            try
            {
                using (var db = new GameDataContext())
                {
                    var entity = new BProjectModule() {
                        ProjectId = dto.ProjectId,
                        Name = dto.Name,
                        Desc = dto.Desc,
                        CreateUser = dto.CreateUser,
                        CreateTime = DateTime.Now
                    };
                    db.BProjectModules.Add(entity);

                    return db.SaveChanges() > 0;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 删除项目模块
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public bool RemoveModule(int id)
        {
            try
            {
                using (var db = new GameDataContext())
                {
                    var entity = db.BProjectModules.FirstOrDefault(o => o.Id == id);
                    if (entity != null)
                    {
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

        /// <summary>
        /// 删除项目基本信息， 状态设置未False
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public bool Delete(int id)
        {
            try
            {
                using (var db = new GameDataContext())
                {
                    BProject entity = db.BProjects.FirstOrDefault(o => o.Id == id);
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

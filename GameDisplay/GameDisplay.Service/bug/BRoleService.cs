using GameDisplay.Domain;
using GameDisplay.Dto;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GameDisplay.Service
{
    public class BRoleService
    {

        /// <summary>
        /// 查询项目列表
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public List<BItem> GetAll()
        {
            List<BItem> resultData = new List<BItem>();
            using (var db = new GameDataContext())
            {
                try
                {
                    var query = db.BRoles.OrderBy(o => o.Id);

                    foreach (var item in query)
                    {
                        var itemDto = new BItem()
                        {
                            Id = item.Id,
                            Name = item.Name
                        };
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
        /// 删除角色， 状态设置未False
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public bool Delete(int id)
        {
            try
            {
                using (var db = new GameDataContext())
                {
                    BRole entity = db.BRoles.FirstOrDefault(o => o.Id == id);
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
    }
}

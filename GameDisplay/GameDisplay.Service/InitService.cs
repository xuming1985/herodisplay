using GameDisplay.Domain;
using GameDisplay.Common;
using System.Collections.Generic;
using System.Linq;
using NPOI;
using System;
using System.IO;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

namespace GameDisplay.Service
{
    public class InitService
    {
        public void InitData()
        {
            using (var db = new GameDataContext())
            {
                string path = @"C:\ProjectMy\GameDisplay\GameDisplay\GameDisplay.App\App_Data\";
                var files = Directory.GetFiles(path);
                foreach (var file in files)
                {
                    if (Path.GetExtension(file) == ".xlsx")
                    {
                        LoadData(file, db);
                    }
                }
            }
        }

        /// <summary>
        /// 初始化数据
        /// </summary>
        /// <param name="context"></param>
        private void LoadData(string path, GameDataContext context)
        {
            var fileName = Path.GetFileNameWithoutExtension(path);

            using (var fs = new FileStream(path, FileMode.Open, FileAccess.Read))
            {
                IWorkbook workbook = new XSSFWorkbook(fs);
                ISheet sheet = workbook.GetSheetAt(0);
                IRow row;
                for (var index = 1; index < sheet.LastRowNum; index++)
                {
                    row = sheet.GetRow(index);
                    SaveRow(fileName, row, context);
                }

                context.SaveChanges();
            }
        }

        private void SaveRow(string fileName, IRow row, GameDataContext context)
        {
            if (fileName == "BUser")
            {
                SaveBUser(row, context);
            }
            else if (fileName == "StockMonitor")
            {
                SaveStockMonitor(row, context);
            }
            else if (fileName == "SummonerSkill")
            {
                SaveSummonerSkill(row, context);
            }
            else if (fileName == "Equipment")
            {
                SaveEquipment(row, context);
            }
        }

        /// <summary>
        /// Bug 用户
        /// </summary>
        /// <param name="row"></param>
        /// <param name="context"></param>
        private void SaveBUser(IRow row, GameDataContext context)
        {
            BUser user = new BUser();
            user.Id = Convert.ToInt32(row.GetCell(0).NumericCellValue);
            user.Account = row.GetCell(1).StringCellValue;
            user.Password = row.GetCell(2).StringCellValue;
            user.RealName = row.GetCell(3).StringCellValue;
            user.Email = row.GetCell(4).StringCellValue;
            user.Telephone = row.GetCell(5).NumericCellValue.ToString();
            user.IsActive = row.GetCell(6).BooleanCellValue;
            user.Role = Convert.ToInt32(row.GetCell(7).NumericCellValue);
            user.CreateUser = Convert.ToInt32(row.GetCell(8).NumericCellValue);
            user.CreateTime = row.GetCell(9).DateCellValue;

            context.BUsers.Add(user);
        }

        /// <summary>
        /// 股票， 自选
        /// </summary>
        /// <param name="row"></param>
        /// <param name="context"></param>
        private void SaveStockMonitor(IRow row, GameDataContext context)
        {
            StockMonitor item = new StockMonitor();
            item.Id = Convert.ToInt32(row.GetCell(0).NumericCellValue);
            item.Name = row.GetCell(1).StringCellValue;
            ICell cell = row.GetCell(2);
            if (cell.CellType == CellType.Numeric)
            {
                item.Code = row.GetCell(2).NumericCellValue.ToString();
            }
            else
            {
                item.Code = row.GetCell(2).StringCellValue;
            }
           
            item.Category = row.GetCell(3).StringCellValue;
            item.Index = Convert.ToInt32(row.GetCell(4).NumericCellValue);
            context.StockMonitors.Add(item);
        }

        /// <summary>
        /// 王者荣耀， 召唤师技能
        /// </summary>
        /// <param name="row"></param>
        /// <param name="context"></param>
        private void SaveSummonerSkill(IRow row, GameDataContext context)
        {
            SummonerSkill item = new SummonerSkill();
            item.Id = Convert.ToInt32(row.GetCell(0).NumericCellValue);
            item.SkillName = row.GetCell(1).StringCellValue;
            item.Thumbnail = row.GetCell(2).StringCellValue;
            item.DisplayImage = row.GetCell(3).StringCellValue;
            item.Condition = row.GetCell(4).StringCellValue;
            item.Description = row.GetCell(5).StringCellValue;
            item.Index = Convert.ToInt32(row.GetCell(6).NumericCellValue);

            context.SummonerSkills.Add(item);
        }

        /// <summary>
        /// 王者荣耀， 装备
        /// </summary>
        /// <param name="row"></param>
        /// <param name="context"></param>
        private void SaveEquipment(IRow row, GameDataContext context)
        {
            Equipment item = new Equipment();
            item.Id = Convert.ToInt32(row.GetCell(0).NumericCellValue);
            item.Category = (InscriptionCategory)row.GetCell(1).NumericCellValue;
            item.Name = row.GetCell(2).StringCellValue;
            item.Thumbnail = row.GetCell(3).StringCellValue;
            item.BuyPrice = Convert.ToInt32(row.GetCell(4).NumericCellValue);
            item.SellPrice = Convert.ToInt32(row.GetCell(5).NumericCellValue);
            if (row.GetCell(6) != null)
            {
                item.Desc1 = row.GetCell(6).StringCellValue;
            }
            if (row.GetCell(7) != null)
            {
                item.Desc2 = row.GetCell(7).StringCellValue;
            }
            
            item.Index = Convert.ToInt32(row.GetCell(8).NumericCellValue);
            context.Equipments.Add(item);
        }
    }
}

using GameDisplay.Domain;
using GameDisplay.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;

namespace GameDisplay.Service
{
    public class StockMonitorService
    {
        public List<StockMonitorDto> GetAll()
        {
            List<StockMonitorDto> resultData = new List<StockMonitorDto>();
            using (var db = new GameDataContext())
            {
                var monitors = db.StockMonitors.ToList();

                using (var httpClient = new HttpClient())
                {
                    var codeList = string.Join(",", monitors.Select(o => o.Category.ToLower() + o.Code));
                    var url = string.Format("http://qt.gtimg.cn/q={0}", codeList);
                    HttpResponseMessage response = httpClient.GetAsync(url).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        string result = response.Content.ReadAsStringAsync().Result;
                        string[] items = result.Split(';');
                        for (var i=0;i< items.Count();i++)
                        {
                            if (string.IsNullOrWhiteSpace(items[i])) continue;

                            var infos = items[i].Split('~');
                            var dto = new StockMonitorDto();
                            dto.Name = infos[1];
                            dto.Code = infos[2];
                            dto.CurrentPrice = decimal.Parse(infos[3]);
                            dto.FloatingPrice = decimal.Parse(infos[31]);
                            dto.FloatingRate = decimal.Parse(infos[32]);
                            dto.Category = monitors[i].Category;
                            dto.Index = i + 1;

                            resultData.Add(dto);
                        }
                    }
                }

                return resultData;
            }
        }

        public StockMonitorDto GetDetail(string code)
        {
            var dto = new StockMonitorDto();
            using (var httpClient = new HttpClient())
            {
                var url = string.Format("http://qt.gtimg.cn/q={0}", code.ToLower());
                HttpResponseMessage response = httpClient.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    string resultContent = response.Content.ReadAsStringAsync().Result;

                    if (!string.IsNullOrWhiteSpace(resultContent))
                    {
                        var infos = resultContent.Split('~');

                        dto.Name = infos[1];
                        dto.Code = infos[2];
                        dto.CurrentPrice = decimal.Parse(infos[3]);
                        dto.YestodayClosePrice = decimal.Parse(infos[4]);
                        dto.OpenPrice = decimal.Parse(infos[5]);
                        dto.FloatingPrice = decimal.Parse(infos[31]);
                        dto.FloatingRate = decimal.Parse(infos[32]);
                    }
                }

                return dto;
            }
        }

        /// <summary>
        /// 分时图
        /// </summary>
        public TimeDiagramDto GetTimeDiagram(string code)
        {
            var dto = new TimeDiagramDto();
            using (var httpClient = new HttpClient())
            {
                var url = string.Format("http://data.gtimg.cn/flashdata/hushen/minute/{0}.js", code.ToLower());
                HttpResponseMessage response = httpClient.GetAsync(url).Result;
                if (response.IsSuccessStatusCode)
                {
                    string resultContent = response.Content.ReadAsStringAsync().Result;

                    if (!string.IsNullOrWhiteSpace(resultContent))
                    {
                        //1323 10.37 32265
                        resultContent = resultContent.Replace(@"\n\", "");
                        string[] rows = Regex.Split(resultContent, "\n", RegexOptions.IgnoreCase);
                        string today = DateTime.Today.ToString("yyyy-MM-dd");
                        foreach (string row in rows)
                        {
                            string[] rowCells = row.Split(' ');
                            if (rowCells.Length == 3)
                            {
                                dto.Values.Add(decimal.Parse(rowCells[1]));
                            }
                        }
                        dto.MaxValue = dto.Values.Max();
                        dto.MinValue = dto.Values.Min();
                    }
                }
            }

            return dto;
        }
    }
}

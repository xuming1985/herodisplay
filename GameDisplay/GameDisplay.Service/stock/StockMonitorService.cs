using GameDisplay.Domain;
using GameDisplay.Dto;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;

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
                var url = string.Format("http://qt.gtimg.cn/q={0}", code);
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
                        dto.FloatingPrice = decimal.Parse(infos[31]);
                        dto.FloatingRate = decimal.Parse(infos[32]);
                    }
                }

                return dto;
            }
        }
    }
}

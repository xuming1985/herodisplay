using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameDisplay.Domain
{
    [Table("BugItem")]
    public class BugItem
    {
        [Key]
        public int Id { get; set; }

        //项目
        public int PId { get; set; }

        //模块
        public int MId { get; set; }

        //Title
        public string Title { get; set; }

        //描述
        public string Desc { get; set; }

        //类型
        public string Category { get; set; }

        //严重程度
        public string Level{ get; set; }

        //优先级
        public int Priority { get; set; }

        //状态
        public string Status { get; set; }

        //创建人
        public int CreateUser { get; set; }

        //指派人
        public int AssignUser { get; set; }

        //问题解决人
        public int SolveUser { get; set; }

        //问题跟踪人
        public int MotitorUser { get; set; }

        //问题更新时间
        public DateTime UpdateTime { get; set; }

        //问题创建时间
        public DateTime CreateTime { get; set; }
    }
}

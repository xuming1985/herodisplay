namespace GameDisplay.Dto
{
    public class PagedInput
    {
        //当前页
        public int Page { get; set; }

        //每页数量
        public int PageSize { get; set; }

        public int Total { get; set; }

        public int Skip
        {
            get
            {
                return (Page - 1) * PageSize;
            }
        }
    }
}
